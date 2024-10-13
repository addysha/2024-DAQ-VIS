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
        itteration=0
        while True:
            itteration += 1
            sio.emit("update_clients")
            # 4 minutes
            if itteration % 960 == 0:
                itteration = 0
                sio.disconnect()
                time.sleep(0.2)
                sio.connect("http://127.0.0.1:5001/")
            else:
                time.sleep(0.25)
                
                
                
    except Exception as e:
        print(f"An error occurred: {e}")


if __name__ == "__main__":
    main()
