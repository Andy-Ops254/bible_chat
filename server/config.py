import os
from dotenv import load_dotenv

load_dotenv()

class Config:
    import os

class Config:
    uri = os.getenv("DATABASE_URL")

    if uri and uri.startswith("postgres://"):
        uri = uri.replace("postgres://", "postgresql://", 1)

    SQLALCHEMY_DATABASE_URI = uri
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = os.getenv("JWT_SECRET_KEY")

    SQLALCHEMY_ENGINE_OPTIONS = {
    "pool_pre_ping": True,       # tests connection before using it
    "pool_recycle": 280,         # recycles connections before Render kills them
    "connect_args": {"sslmode": "require"}

}