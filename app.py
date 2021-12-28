from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
import requests
import os

from models import db, connect_db, User, RoomData
from helpers import *

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql://{DBUSER}:{DBPW}@localhost/custom_mc'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'really_very_secret')
app.config['DEBUG_TB_INTERCEPT_REQUESTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)

###########################
#### RESTful API routes ###
###########################

### user routes


### room data routes
@app.route('/room-data', METHODS=["POST"])
def create_room_data():
    try:
        room_data = {}
        return(jsonify({"roomData", room_data}))
    except:
        code = 418 if is_today_april_fools() else 400
        return jsonify({"Errors": {"roomData error": "Insufficient data"}}, code)

@app.route('/room-data/<int:room_id>', METHODS=["GET"])
def read_room_data(room_id):
    """Return all room information."""
    room_data = {}
    try:
        room_data = RoomData.query.get(room_id)
    except:
        return jsonify({"Errors": {"room error": f"No room with ID {room_id} found."}}, 404)
    return jsonify({"roomData": room_data}, 200)

@app.route('/room-data/<int:room_id>', METHODS=["PATCH"])
def update_room_data(room_id):
    """Return all room information."""
    room_data = {}
    new_room_data = {}
    input_data = {}
    try:
        room_data = RoomData.query.get(room_id)
    except:
        return jsonify({"Errors": {"room error": f"No room with ID {room_id} found."}}, 404)
    
    try:
        for key in room_data:
            new_room_data[key] = input_data[key] or room_data[key]
    except: 
        code = 418 if is_today_april_fools() else 400
        return jsonify({"Errors": {"room error": f"Insuffient or invalid data"}}, code)
    return jsonify({"roomData": new_room_data}, 200)

@app.route('/room-data/<int:room_id>', METHODS=["DELETE"])
def delete_room_data(room_id):
    """Delete room data, return confirmation message."""
    try:
        RoomData.query.get(room_id)
    except: 
        return jsonify({"Errors": {"room error": f"No room with ID {room_id} found."}}, 404)

    try:
        RoomData.query.delete(room_id)
        db.session.commit()
    except:
        code = 418 if is_today_april_fools() else 400
        return jsonify({"Errors": {"room error": f"Insuffient or invalid data"}}, code)
        