from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates, declarative_base
from sqlalchemy import MetaData
from werkzeug.security import generate_password_hash
from extension import db, bcrypt  # safe import






class User(db.Model, SerializerMixin):
    __tablename__ = 'users'

    id =db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String)
    created_at =db.Column(db.DateTime, server_default=db.func.now())

    emotion_logs=db.relationship('Emotion_logs', back_populates='user')
    reading_logs=db.relationship('Reading_logs',back_populates='user')

    @validates ('email')
    def validate_email (self, key, email):
        if '@' not in email:
            raise TypeError('Invalid email format!')
        else:
            return email

    @property
    def password(self):
        raise AttributeError("Password is not readable!")
    
    @password.setter
    def password(self, raw_password):
        if len(raw_password) < 8 :
            raise ValueError("Password must be 8 character long !")
        # validate is triggered here
        password_hash = bcrypt.generate_password_hash(
                raw_password.encode('utf-8'))
        # after validation generate the password hash
        self.password_hash =password_hash.decode('utf-8')


    def __repr__(self):
        return f'<User email{self.email}, created_at{self.email}>'


class Daily_reading (db.Model, SerializerMixin):
    __tablename__ = 'daily_readings'

    id = db.Column (db.Integer, primary_key=True)
    date = db.Column(db.DateTime, server_default=db.func.now())
    scripture_reference = db.Column(db.String)
    scripture = db.Column(db.Text)

    reading_logs= db.relationship('Reading_logs', back_populates='daily_reading')


    def __repr__(self):
        return f'<Daily_readings date={self.date}, scripture={self.scripture}>'


class Reading_logs(db.Model, SerializerMixin):
    __tablename__='reading_logs'

    id=db.Column(db.Integer, primary_key=True)
    user_id=db.Column(db.Integer, db.ForeignKey('users.id'))
    daily_readings_id = db.Column(db.Integer, db.ForeignKey('daily_readings.id'))
    completed = db.Column(db.Boolean, nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    user=db.relationship('User', back_populates='reading_logs')
    daily_reading = db.relationship('Daily_reading', back_populates='reading_logs')

    def __repr__(self):
        return f'<Reading_logs user_id={self.user_id},daily_readings_id={self.daily_readings_id}, completed={self.completed}, created_at= {self.created_at}>'


class Emotion_logs(db.Model, SerializerMixin):
    __tablename__='emotion_logs'

    id= db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    emotion_text=db.Column(db.Text, nullable=False)
    scripture = db.Column(db.Text)
    time = db.Column(db.DateTime, server_default=db.func.now())

    user=db.relationship('User', back_populates='emotion_logs')

    def __repr__(self):
        return f'<Emotion_log users_id={self.users_id}, emotion_text = {self.emotion_text}, scripture={self.scripture}, time={self.time}>'


class Bible_books(db.Model, SerializerMixin):
    __tablename__='bible_books'

    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String)
    order = db.Column(db.Integer)
    abbreviation = db.Column (db.String)
# 1 to many relationship
    chapters=db.relationship('Bible_chapters',backref='book')

    def __repr__(self):
        return f'Book name={self.name}, order={self.order}'



class Bible_chapters(db.Model, SerializerMixin):
    __tablename__='bible_chapters'
    id = db.Column(db.String, primary_key=True)
    books_id = db.Column(db.String, db.ForeignKey('bible_books.id'))
    chapter_number = db.Column(db.Integer)

# 1 to many relationship
    verses=db.relationship('Bible_verses',backref='chapter')

    def __repr__(self):
        return f'Chapter books_id={self.books_id}, chapter_number={self.chapter_number}'



class Bible_verses(db.Model, SerializerMixin):
    __tablename__='bible_verses'
    id = db.Column(db.String, primary_key=True)
    chapters_id = db.Column(db.String, db.ForeignKey('bible_chapters.id'))
    verse_number = db.Column(db.Integer)
    text=db.Column(db.Text)

    def __repr__(self):
        return f'Verses chapters_id={self.chapters_id}, verse_number={self.verse_number}'


    