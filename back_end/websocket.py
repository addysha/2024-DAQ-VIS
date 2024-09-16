"""
File: websocket.py
Author: Hannah Murphy
Date: 2024-09-14
Description: Run by the main app server, contains all websocket relevent methods.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

"""

import time
from flask import Flask, request
from flask_socketio import SocketIO
from mqtt_subscriber import query_data, query_all_latest_data

""" GLOBAL VARIABLES """
app = Flask(__name__)
socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")
client_list = []


""" SOCKET HANDELING """


@socketio.on("send_history")
def handle_history(data):
    historical_data = query_data(data)
    socketio.emit("recieve_historic_data", historical_data, to=request.sid)


@socketio.on("update_clients")
def handle_update_clients():
    latest_data = query_all_latest_data()
    socketio.emit("data", latest_data)


@socketio.on("connect")
def handle_connect():
    print(f" - * User connected!")
    client_list.append(request.sid)


@socketio.on("disconnect")
def handle_disconnect():
    print(f" # - User disconnected!")


def start_webserver():
    # Set up websocket and server
    socketio.run(app, port=5000)
