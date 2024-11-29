"""
File: TrackTimer.py
Author: Hannah Murphy
Date: 2024
Description: This Python script is for remotely accesssing the raw CAN data during the 2024 competition. 
    The reasoning for this is to ensure that future years are able to use CAN data for testing of software systems.
    
    A new text file will be created containing the raw data from the time the script connects until the script is mannually shut off.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

"""

from paho.mqtt import client as mqtt_client
from datetime import datetime
import random

broker = "52.64.83.72"
port = 1883
topic = "/wesmo-data"
client_id = f"wesmo-{random.randint(0, 100)}"
username = "wesmo"
password = "public"
client_list = []


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, reason_code, properties=None):
        if reason_code != 0:
            print("Failed to connect, return code %d\n", reason_code)

    client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION2, client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    def on_message(client, userdata, msg):
        raw_data = msg.payload.decode()

        if raw_data != "None":
            current_datetime = datetime.now().strftime("%Y-%m-%d %H-%M-%S")
            str_current_datetime = str(current_datetime)

            file_name = "raw_can_" + str_current_datetime + ".txt"
            file = open(file_name, "a")
            file.writeline("\n")
            file.writeline(str(raw_data))
            file.close()

    client.subscribe(topic)
    client.on_message = on_message


def main():
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()


if __name__ == "__main__":
    main()
