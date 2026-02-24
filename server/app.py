from flask import Flask, request,jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from config import Config
from flask_migrate import Migrate
from extension import db, bcrypt
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import (
    create_access_token, create_refresh_token, jwt_required, get_jwt_identity, JWTManager, get_jwt
)
from datetime import datetime, timedelta, date,timezone
from emotion_verses import get_verse_for_emotion, detect_emotion




migrate = Migrate()
jwt = JWTManager()
blacklist = set()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    bcrypt.init_app(app)
    db.init_app(app)
    jwt.init_app(app)
    migrate.init_app(app, db) 
    CORS(app)


    @jwt.token_in_blocklist_loader
    def check_if_token_revoked(jwt_header, jwt_payload):
        # return True if token has been revoked (jti is in blacklist)
        return jwt_payload.get("jti") in blacklist


    # Import models here so Flask-Migrate sees them
    from models import User, Daily_reading, Emotion_logs, Reading_logs, Bible_books, Bible_chapters, Bible_verses

    @app.route('/login', methods=['POST'])
    def app_login ():
        data = request.get_json()
        # handles the error that may result from blank spaces from the users request
        if not data or"email" not in data or "password" not in data:
            return jsonify({'error': 'Email and password are required!'}), 400
        
        # get password and email from the clients request
        email = data["email"].strip().lower()
        password = data["password"]

        # Validate user
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "Unknown User!"}), 401
        
        # valid passowrd
        if not bcrypt.check_password_hash(user.password_hash, password):
            return jsonify({"error": "Invalid Password!"}), 401
        
        # Generate the tokens
        access_token = create_access_token(
            identity={"user_id": user.id, "email": user.email},
            expires_delta=timedelta(days=7))
        refresh_token = create_refresh_token(identity={"user_id": user.id, "email": user.email})

        return jsonify({
            "message": "Login Successful",
            "access_token": access_token,
            "refresh_token": refresh_token,
            "user": {
                "id": user.id,
                "email": user.email
            }
        }), 200

    @app.route('/token/refresh', methods=['POST'])
    @jwt_required(refresh=True)
    def refresh_token():
        identity = get_jwt_identity()
        new_access = create_access_token(identity=identity, expires_delta=timedelta(hours=24))
        return jsonify({"access_token": new_access}), 200


    @app.route('/register', methods=['POST'])
    def user_registration():
        data = request.get_json()

        email = data.get("email").strip().lower()
        if not email:
            return{"error":"Email is required"}, 400
        
        raw_password = data.get("password")
        if not raw_password:
            return {"error": "Password is required"}, 400
        
        # check if the user exists in the database:
        existing_user= User.query.filter_by(email=email).first()
        if existing_user:
            return {"error": "Email is in use!"}, 409
        else:
            new_user = User(
                email= email,
                password= raw_password
            )
            db.session.add(new_user)
            db.session.commit()
            user_dict =new_user.to_dict(only=('id', 'email'))
            return make_response(user_dict, 201)

        
    @app.route('/logout', methods=['DELETE'])
    @jwt_required()
    def logout():
        jti = get_jwt()["jti"] #gets the token id
        blacklist.add(jti) #adds token to blocklist
        return jsonify({"message": "Successfully logged out"}), 200
        

    @app.route('/daily_reading', methods=['GET'])
    def daily_reading ():

        #picking the first day
        starting_day = date(2026,1, 1)
        today = date.today()
        difference = today - starting_day
        day_count = difference.days #this will b e like day_count =24

        #edge case if today is before the start date
        if day_count < 0:
            day_count = 0

        #verse allocation
        verse_allocation = day_count % 30626
        
        #Multiple querying and table joining and ordering
        verse= Bible_verses.query \
                            .join(Bible_chapters, Bible_verses.chapters_id == Bible_chapters.id)\
                            .join(Bible_books, Bible_chapters.books_id == Bible_books.id)\
                            .order_by(Bible_books.book_order, Bible_chapters.chapter_number, Bible_verses.verse_number)\
                            .offset(verse_allocation)\
                            .first()
        if not verse:
            return jsonify({"error": "Daily reading not found"}), 404
        
        #getting related information
        chapter = Bible_chapters.query.filter_by(id=verse.chapters_id).first()
        book = Bible_books.query.filter_by(id=chapter.books_id).first()


        response = {
            "date": str(today),
            "book" : book.name,
            "chapter" : chapter.chapter_number,
            "verse" : verse.verse_number,
            "reference" : f"{book.name} {chapter.chapter_number}: {verse.verse_number}",
            "text": verse.text
        }
        return jsonify (response) ,200

#Emotionchatbot endpoint
    @app.route('/chatbot/emotion', methods=['POST'])
    @jwt_required()
    def emotion_chat():
        #request from client
        data =request.get_json()

        if not data:
            return jsonify({"error": "Emotion input required!"}), 400
        
        emotion_text = data.get('emotion_text')
        if not emotion_text:
            return jsonify({"error": "No emotion detected, try again!"}), 400
        
        if len(emotion_text) >250:
            return jsonify({"error": "Emotion text exceeds 250 characters!"}), 400
        
        #getting the user id (extract numeric id from JWT identity)
        identity = get_jwt_identity()
        user_id = identity.get('user_id') if isinstance(identity, dict) else identity
        if not user_id:
            return jsonify({"error": "Authentication required"}), 401

        #detectemotion
        detected_emotion= detect_emotion(emotion_text)

        #get the verse ID for identified emotion
        verse_id = get_verse_for_emotion(detected_emotion)

        #querying the database for the verse, chater and book
        verse = Bible_verses.query.filter_by(id=verse_id).first()
        if not verse:
            return jsonify({"error": "Verse not found in the Database!"}), 404
        
        chapter = Bible_chapters.query.filter_by(id=verse.chapters_id).first()

        book= Bible_books.query.filter_by(id=chapter.books_id).first()

        #create scripture response
        scripture_reference = f"{book.name}, {chapter.chapter_number}:{verse.verse_number}"

#creating emotion log
        emotion_log =Emotion_logs(
            user_id= user_id,
            emotion_text = emotion_text,
            scripture = scripture_reference,
            time = datetime.now(timezone.utc).isoformat()
        )
        db.session.add(emotion_log)
        db.session.commit()

# Create custom messages based on emotion
        ENCOURAGEMENT_MESSAGES = {
            "anxious": "God cares about your worries. Cast your anxieties on Him.",
            "sad": "God is close to the brokenhearted. He understands your pain.",
            "angry": "God gives us wisdom to handle our anger with grace.",
            "grateful": "Gratitude is a beautiful response to God's blessings.",
            "lonely": "You are never alone. God is always with you.",
            "fearful": "God has not given you a spirit of fear, but of power and love.",
            "joyful": "Rejoice in the Lord! Your joy comes from Him.",
            "hopeless": "There is always hope in God. He has plans for your good.",
            "confused": "God will give you wisdom and guide your path.",
            "tired": "Come to God and find rest for your soul.",
            "guilty": "God's forgiveness is complete. Accept His grace."
        }

        # Get message or use default
        message = ENCOURAGEMENT_MESSAGES.get(
            detected_emotion,
            "God is with you in every season of life."
        )

        response = {
    "emotion_detected": detected_emotion if detected_emotion else "general",
    "verse": {
        "id": verse.id,
        "reference": scripture_reference,
        "book": book.name,
        "chapter": chapter.chapter_number,
        "verse_number": verse.verse_number,
        "text": verse.text
    },
    "message": message,
    "log_id": emotion_log.id
}

        return jsonify(response), 200




    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5555, debug=True)