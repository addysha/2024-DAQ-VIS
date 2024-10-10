"""
File: websocket.py
Author: Hannah Murphy
Date: 2024
Description: Run by the main app server, contains all websocket relevant methods.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.
"""

import logging
from flask import Flask, request, jsonify
from flask_socketio import SocketIO
from flask_cors import CORS
from mqtt_subscriber import (
    query_data,
    query_all_latest_data,
    connect_to_db,
    query_latest,
)
from TrackTimer import TrackTimer

""" GLOBAL VARIABLES """
app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")
client_list = []
timeout = False
track_timer = None
on_track = False

# Suppress socket logging
logging.basicConfig(level=logging.ERROR)
logging.getLogger("engineio").setLevel(logging.WARNING)
logging.getLogger("werkzeug").setLevel(logging.WARNING)

""" HTTP ROUTE FOR TIMEOUT """


@app.route("/timeout", methods=["POST"])
def set_timeout():
    global timeout
    data = request.get_json()

    if "timeout" in data and isinstance(data["timeout"], bool):
        timeout = data["timeout"]
        return jsonify({"message": "Timeout detected", "timeout": timeout}), 200
    else:
        return jsonify({"error": "Invalid data"}), 400


@app.route("/track-timer", methods=["POST"])
def create_timer():
    global track_timer, on_track
    data = request.get_json()

    if not track_timer:
        track_timer = TrackTimer()
        print(f"Creating timer - on_track: {on_track}, track_timer: {track_timer}")

    if not on_track and track_timer:
        on_track = True
        track_timer.start_timer()
        print(f"Starting timer - on_track: {on_track}, track_timer: {track_timer}")

    if on_track and track_timer:
        time = track_timer.check_timer(data)
        return jsonify({"message": "Timer Update", "timer": time}), 200

    return (
        jsonify(
            {
                "message": "Track Timer request recieved",
            }
        ),
        200,
    )


@app.route("/track-timer", methods=["DELETE"])
def delete_timer():
    global track_timer, on_track

    if on_track:
        on_track = False
    if track_timer:
        track_timer.reset_timer()
        track_timer = None

    print(f"Deleteing timer - on_track: {on_track}, track_timer: {track_timer}")

    return (
        jsonify(
            {
                "message": "Track Timer has successfully been removed",
            }
        ),
        200,
    )


""" SOCKET HANDLING """


@socketio.on("send_history")
def handle_history(data):
    historical_data = query_data(data, cursor, conn)
    socketio.emit("recieve_historic_data", historical_data, to=request.sid)


@socketio.on("update_clients")
def handle_update_clients():
    if not timeout:
        latest_data = query_all_latest_data()
        socketio.emit("data", latest_data)


@socketio.on("timer")
def handle_timer():
    global track_timer
    if track_timer:
        socketio.emit("timerRecieve", track_timer.update_timer())


@socketio.on("connect")
def handle_connect():
    print(f" - * User connected!")
    client_list.append(request.sid)


@socketio.on("disconnect")
def handle_disconnect():
    print(f" # - User disconnected!")


def start_webserver():
    global cursor, conn
    cursor, conn = connect_to_db()
    socketio.run(app, port=5001, host="0.0.0.0")


def main():
    start_webserver()


if __name__ == "__main__":
    main()
