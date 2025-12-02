from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from config import Config
from models import db
from flask_migrate import Migrate
from flask_bcrypt import Bcrypt


migrate = Migrate()


def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    migrate.init_app(app, db)
    bcrypt = Bcrypt(app)


    # Import models here so Flask-Migrate sees them
    from models import User, Daily_reading, Emotion_logs, Reading_logs


    return app

if __name__ == "__main__":
    app = create_app()
    app.run(port=5555, debug=True)