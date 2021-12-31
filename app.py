import os
from flask import Flask, request, render_template, redirect, flash, jsonify
from flask_debugtoolbar import DebugToolbarExtension
import requests

from models import *
from helpers import *

app = Flask(__name__)

app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'so_very_secret')
app.config['DEBUG_TB_INTERCEPT_REQUESTS'] = False
debug = DebugToolbarExtension(app)

connect_db(app)


###########################
#### RESTful API routes ###
###########################

### user routes
@app.route('/user', methods=["POST"])
def create_new_user():
    try:
        privileges = 2
        dummy_password = "p4s$w0rD"
        if "privileges" in request:
            try:
                privies = int(request.privileges)
                if privies > 0 and privies < 2:
                    privileges = privies
                    dummy_password = False
            except:
                return jsonify({"Errors": {"user data error"}}, BAD_DATA_CODE)

        password = dummy_password if dummy_password else request.password
        new_user = User.hashpass(request.email, password, privileges)
        db.session.add(new_user)
        db.session.commit()

    except: 
        return jsonify({"Errors": {"user error": "Insufficient data"}}, BAD_DATA_CODE)

### room data routes
@app.route('/room-data', methods=["POST"])
def create_room_data():
    try:
        room_data = {}
                
        return(jsonify({"roomData", room_data}))
    except:
        return jsonify({"Errors": {"roomData error": "Insufficient data"}}, BAD_DATA_CODE)

@app.route('/room-data/<int:room_id>', methods=["GET"])
def read_room_data(room_id):
    """Return all room information."""
    room_data = {}
    try:
        room_data = RoomData.query.get(room_id)
    except:
        return jsonify({"Errors": {"room error": f"No room with ID {room_id} found."}}, 404)
    return jsonify({"roomData": room_data}, 200)

@app.route('/room-data/<int:room_id>', methods=["PATCH"])
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
        return jsonify({"Errors": {"room error": f"Insuffient or invalid data"}}, BAD_DATA_CODE)
    return jsonify({"roomData": new_room_data}, 200)

@app.route('/room-data/<int:room_id>', methods=["DELETE"])
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
        return jsonify({"Errors": {"room error": f"Insuffient or invalid data"}}, BAD_DATA_CODE)
        