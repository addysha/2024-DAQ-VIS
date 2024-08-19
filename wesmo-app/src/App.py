from flask import Flask, request
from flask_socketio import SocketIO, send, emit, disconnect
import random

app = Flask(__name__)
socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")


@app.route("/")
def index():
    return "Flask server is running."


def generate_data():
    return {
        "SOC": random.randint(0, 100),
        "Temp": random.randint(0, 100),
        "RPM": random.randint(0, 8000),
    }


registered_clients = []


@socketio.on("register_for_data")
def handle_register():
    registered_clients.append(request.sid)
    while True:
        emit("test_data", generate_data(), broadcast=True)
        socketio.sleep(1)


@socketio.on("connect")
def handle_connect():
    print(f"User connected!")


@socketio.on("disconnect")
def handle_disconnect():
    print(f"User disconnected!")


if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
