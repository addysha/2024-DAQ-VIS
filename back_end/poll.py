# import time
# from flask_socketio import SocketIO

# socketio = SocketIO(logger=True, engineio_logger=True)


# def update_poll():
#     sio.connect("http://127.0.0.1:5000")

#     print(" # - Connected")
#     while True:
#         sio.emit("update_clients")
#         time.sleep(1)

import socketio


def main():
    sio = socketio.Client()

    @sio.event
    def connect():
        print("Connected to server")

    @sio.event
    def disconnect():
        print("Disconnected from server")

    @sio.event
    def connect_error(data):
        print(f"Connection failed: {data}")

    try:
        sio.connect("http://localhost:5000/my_namespace")
        sio.emit("update_clients", namespace="/my_namespace")
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
