from flask_bcrypt import Bcrypt
from flask_sqlalchemy import SQLAlchemy


bcrypt = Bcrypt()
db = SQLAlchemy()
# this is like the blueprint of how the models will be created 
# Base = declarative_base()
