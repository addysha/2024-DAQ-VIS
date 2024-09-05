from flask import Flask, request
from flask_socketio import SocketIO
from mqtt_db_subscriber import query_data

""" GLOBAL VARIABLES """
app = Flask(__name__)
socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")
client_list = []


""" SOCKET HANDELING """


@socketio.on("send_history")
def handle_history(data):
    historical_data = query_data(data)
    socketio.emit("recieve_historic_data", historical_data, to=request.sid)


# TODO Have something poll this every 1 second etc to update client list
@socketio.on("update_clients")
def handle_update_clients():
    # socketio.emit("data", [sensor.to_dict() for sensor in sensors])
    pass


@socketio.on("connect")
def handle_connect():
    print(f" # - User connected!")
    client_list.append(request.sid)


@socketio.on("disconnect")
def handle_disconnect():
    print(f" # - User disconnected!")


def start_webserver():
    # Set up websocket and server
    socketio.run(app, port=5000)
