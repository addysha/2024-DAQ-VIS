import threading
from mqtt_db_subscriber import start_mqtt_subscriber
from websocket import start_webserver


def main():
    socket_thread = threading.Thread(target=start_webserver)
    mqtt_thread = threading.Thread(target=start_mqtt_subscriber)
    socket_thread.start()
    mqtt_thread.start()


if __name__ == "__main__":
    main()
