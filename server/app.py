from flask import Flask, request,jsonify
from flask_sqlalchemy import SQLAlchemy
from config import Config
from flask_migrate import Migrate
from extension import db, bcrypt
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import (
    create_access_token, jwt_required, get_jwt_identity
)
from datetime import datetime, timedelta




migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    bcrypt.init_app(app)

    db.init_app(app)
    migrate.init_app(app, db)


    # Import models here so Flask-Migrate sees them
    from models import User, Daily_reading, Emotion_logs, Reading_logs

    @app.route('/login', METHODS=['POST'])
    def app_login ():
        data = request.get_json()
        # handles the error that may result from blank spaces from the users request
        if not data or"email" in data or "password" in data:
            return jsonify({'error': 'Email and password are required!'}), 400
        
        # get password and email from the clients request
        email = data['email'].strip().lower()
        password = data['password']

        # Validate user
        user = User.query.filter_by(email=email).first()
        if not user:
            return jsonify({"error": "Unknown User!"}), 401
        
        # valid passowrd
        if not check_password_hash(user.password, password):
            return jsonify({"error": "Invalid Password!"}), 401
        
        # Generate the tokens
        access_token = create_access_token(
            identity={"user_id": user.id, "email": user.email},
            expires_delta=timedelta(hours=1))

        return jsonify({
            "message": "Login Successful",
            "access_token": access_token,
            "user": {
                id: "user.id",
                email: "user.email"
            }
        }), 200
    
    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5555, debug=True)