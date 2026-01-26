from flask import Flask, request,jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_migrate import Migrate
from extension import db, bcrypt
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity, JWTManager, get_jwt
)
from datetime import datetime, timedelta, date




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
            expires_delta=timedelta(hours=1))

        return jsonify({
            "message": "Login Successful",
            "access_token": access_token,
            "user": {
                "id": user.id,
                "email": user.email
            }
        }), 200


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
            return jsonify({"error": "Daily reading not found"}, 404)
        
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

    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5555, debug=True)