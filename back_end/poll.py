"""
File: poll.py
Author: Hannah Murphy
Date: 2024
Description: Run by the main app server, polls the websocket 
to update the dashbaord client with data.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

"""

import socketio
import time


def main():
    sio = socketio.SimpleClient()

    try:
        sio.connect("http://127.0.0.1:5001/")
        print("Starting server polling")
        while True:
            sio.emit("update_clients")
            time.sleep(0.25)
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
