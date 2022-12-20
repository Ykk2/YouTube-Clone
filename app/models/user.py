from .db import db, environment, SCHEMA
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from .subscribers import subscribers


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    videos = db.relationship('Video', back_populates='users', cascade='all, delete')
    comments = db.relationship('Comment', back_populates='users', cascade='all, delete')
    likes = db.relatiionship('Like', back_populates='users', cascade='all, delete')
    subscibers = db.relationship(
        "User",
        secondary=subscribers,
        primaryjoin=(subscribers.c.user_id == id),
        secondaryjoin=(subscribers.c.subscriber_id == id),
        backref=db.backref("subscribed", lazy='dynamic'),
        lazy='dynamic',
        cascade="all, delete"
    )


    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'firstName': self.first_name,
            'lastName': self.last_name
        }
