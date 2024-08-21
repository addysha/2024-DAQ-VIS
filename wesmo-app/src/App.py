from flask import Flask, request
from flask_socketio import SocketIO, send, emit, disconnect
import random
import time


app = Flask(__name__)
socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")


@app.route("/")
def index():
    return "Flask server is running."


def generate_data():
    data = [
        {
            "name": "Motor Temperature",
            "value": 82,
            "min": 0,
            "max": 100,
            "unit": "C",
        },
        {"name": "Motor Speed", "value": 3654, "min": 1500, "max": 4700, "unit": "RPM"},
        {
            "name": "Battery Temperature",
            "value": 37,
            "min": 0,
            "max": 60,
            "unit": "C",
        },
        {
            "name": "Battery State of Charge",
            "value": 80,
            "min": 0,
            "max": 100,
            "unit": "%",
        },
        {"name": "Battery Voltage", "value": 286, "min": 216, "max": 300, "unit": "V"},
        {"name": "Battery Current", "value": 263, "min": 0, "max": 300, "unit": "A"},
    ]

    return data


registered_clients = []


@socketio.on("testing")
def handle_register():
    while True:
        socketio.emit("data", generate_data(), to=request.sid)
        time.sleep(5)


@socketio.on("update_clients")
def handle_request():
    socketio.emit("data", generate_data())


@socketio.on("connect")
def handle_connect():
    pass
    # print(f"User connected!")


@socketio.on("disconnect")
def handle_disconnect():
    pass
    # print(f"User disconnected!")


if __name__ == "__main__":

    socketio.run(app, debug=True, port=5000)
