from flask_sqlalchemy import SQLAlchemy
import bcrypt
from datetime import datetime
import json
from helpers import *
from app import app

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)

class User(db.Model):
    """User model. For end users, this is transparent and only used to keep track of which email address is associated with which room. Their passwords are created in app.py and are unimportant as they don't ever need to log in. For creators and admins, an actual password should be entered. 
    """

    __tablename__ = "users"

    def serialize(self):
        self.privileges_logical = "none"
        if self.privileges == 0:
            self.privileges_logical = "admin"
        if self.privileges == 1:
            self.privileges_logical = "creator"
        if self.privileges > 1:
            self.privileges_logical = "end_user"

        return {
            "email": self.email,
            "name": self.name,
            "privileges": self.privileges_logical
        }
    
    email = db.Column(db.String,
                      primary_key=True,
                      nullable=False,
                      unique=True)
    name = db.Column(db.String, 
                     nullable=False)
    privileges = db.Column(db.Integer,
                           nullable=False)
    password = db.Column(db.String,
                         nullable=False)
    
    def __repr__(self):
        return f'<User {self.email}: {self.privileges_logical}>'

    @classmethod
    def hashpass(cls, email, password, privileges):
        """Generate new user with email, password and privileges.
        """

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")

        return cls(email=email, password=hashed_utf8, privileges=privileges)

    @classmethod
    def authenticate(cls, username, password):
        """Validate correct username and password combination.
        Return user if valid, False if not.
            """
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            return user

        return False

ROOM_REQUIRED = ['template', 'color', 'message']
ROOM_OPTIONAL = ['recipient', 'animal']
ROOM_PRIMARY = 'id'
ROOM_FOREIGN = 'user_id'

ROOM_KEYS = [ ROOM_PRIMARY, ROOM_FOREIGN ]
ROOM_FIELDS = concatinate_lists( [ ROOM_REQUIRED, ROOM_OPTIONAL ] )

class RoomData(db.Model):
    """Model for room data. This data is originally provided by end users and accessible to creators and admins. Rooms are linked to user_id of the end user.
    """

    __tablename__ = "room_data"

    def serialize(self):
        return {
            "id": self.id,
            "template": self.template,
            "timestamp": self.timestamp,
            "user_id": self.user_id,
            "color": self.color,
            "message": self.message,
            "animal": self.animal,
            "recipient": self.recipient
        }

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    template = db.Column(db.String(20),
                         nullable=False)  
    color = db.Column(db.String(20),
                      nullable=False)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.id"))
    message = db.Column(db.String(256),
                        nullable=False)
    recipient = db.Column(db.String)
    animal = db.Column(db.String)

    user = db.relationship("User", cascade="all, delete")

    def __repr__(self):
        room_repr = f"<Room Data {self.id}: \n"
        room_repr += f"from {self.user_id}, "
        for field in ROOM_FIELDS:
            room_repr += f"{field}={self.field}, "
        return room_repr.strip(', ') + ">"
