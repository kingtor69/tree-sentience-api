from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from datetime import datetime
import json

db = SQLAlchemy()

bcrypt = Bcrypt()

def connect_db(app):
    db.app = app
    db.init_app(app)


class User(db.Model):
    """User model. user.id is used in Route and Checkpoint models as those will both be stored within the user. 
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
            "id": self.id,
            "name": self.name,
            "privileges": self.privileges
        }
    
    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    name = db.Column(db.String, 
                     nullable=False)
    email = db.Column(db.String,
                      nullable=False,
                      unique=True)
    privileges = db.Column(db.Integer,
                      nullable=False)
    password = db.Column(db.String,
                         nullable=False)
    
    room = db.relationship("RoomData", cascade="all, delete", backref="user")

    def __repr__(self):
        return f'User#{self.id}: {self.username} {self.email} {self.privileges_logical}'

    @classmethod
    def hashpass(cls, username, password):
        """Generate new user with username and hashed password only, other fields still to be populated.
        """

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")

        return cls(username=username, password=hashed_utf8)

    @classmethod
    def authenticate(cls, username, password):
        """Validate correct username and password combination.
        Return user if valid, False if not.
            """
        user = User.query.filter_by(username=username).first()

        if user and bcrypt.check_password_hash(user.password, password):
            return user

        return False

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
    template = db.Column(db.String(16),
                         nullabe=False)  
    timestamp = db.Column(db.DateTime,
                          default=datetime.utcnow())
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.id"))
    color = db.Column(db.String(16),
                      nullable=False)
    message = db.Column(db.String(256),
)

    checkpoint_route = db.relationship("CheckpointRoute", cascade="all, delete", backref="route_cpr")

class Checkpoint(db.Model):
    """Checkpoint model for intermediate geocoded points used as either stopping places or to alter route. 
    """

    __tablename__ = "checkpoints"

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "checkpoint_display_name": self.checkpoint_display_name,
            "checkpoint_lat": self.checkpoint_lat,
            "checkpoint_lng": self.checkpoint_lng
        }

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    user_id = db.Column(db.Integer,
                        db.ForeignKey("users.id"))
    checkpoint_display_name = db.Column(db.String)
    checkpoint_lat = db.Column(db.Float,
                        nullable=False)
    checkpoint_lng = db.Column(db.Float,
                        nullable=False)

    checkpoint_route = db.relationship("CheckpointRoute", backref="checkpoint")


class CheckpointRoute(db.Model):
    """Route-checkpoint model shows in what route and in what order checkpoints are used. 
    """

    __tablename__ = "checkpoints_routes"

    def serialize(self):
        return {
            "id": self.id,
            "route_id": self.route_id,
            "checkpoint_id": self.checkpoint_id,
            "route_order": self.route_order
        }

    id = db.Column(db.Integer,
                   primary_key=True,
                   autoincrement=True)
    route_id = db.Column(db.Integer,
                         db.ForeignKey("routes.id"), 
                         nullable=False)
    checkpoint_id = db.Column(db.Integer,
                              db.ForeignKey("checkpoints.id"),
                              nullable=False)
    route_order = db.Column(db.Integer,
                            nullable=False)