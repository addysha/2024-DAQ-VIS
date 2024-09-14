"""
File: App.py
Author: Hannah Murphy
Date: 2024-09-14
Description: Used to start up and run the server side of the WESMO website.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

Usage: Python3 App.py
"""

import threading
from mqtt_subscriber import start_mqtt_subscriber
from websocket import start_webserver


def main():
    socket_thread = threading.Thread(target=start_webserver)
    mqtt_thread = threading.Thread(target=start_mqtt_subscriber)
    socket_thread.start()
    mqtt_thread.start()


if __name__ == "__main__":
    main()
