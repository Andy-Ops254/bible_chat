from flask import Flask, request,jsonify, make_response
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_migrate import Migrate
from extension import db, bcrypt
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity, JWTManager, get_jwt
)
from datetime import datetime, timedelta




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
    from models import User, Daily_reading, Emotion_logs, Reading_logs

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
        

    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5555, debug=True)