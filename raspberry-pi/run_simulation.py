"""
File: simulate.py
Author: Hannah Murphy
Date: 2024-09-14
Description: This file is to simulate the Raspberry Pi sending CAN data over MQTT.
    Used for testing of the backend system.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

Usage: Python3 simulate.py
"""

import random
import time
from paho.mqtt import client as mqtt_client

""" GLOBAL VARIABLES
Set the Parameter of MQTT Broker Connection
Set the address, port and topic of MQTT Broker connection. 
At the same time, we call the Python function random.randint 
to randomly generate the MQTT client id.
"""
broker = "52.64.83.72"
port = 1883
topic = "/wesmo-data"
client_id = f"wesmo-{random.randint(0, 100)}"
username = "wesmo"
password = "public"


def connect_mqtt() -> mqtt_client:
    """_summary_
    Connects to the MQTT broker and returns the client object.
    The MQTT broker is hosted on an AWS EC2 instance.
        Returns:
            mqtt_client: The publisher object connected to the AWS broker
    """
    client = None
    try:

        def on_connect(client, userdata, flags, reason_code, properties=None):
            if reason_code != 0:
                print("Failed to connect, return code %d\n", reason_code)

        client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION2, client_id)
        client.username_pw_set(username, password)
        client.on_connect = on_connect
        client.connect(broker, port)
        return client
    except Exception as e:
        print("Issue connecting:", e)
    finally:
        return client


def publish(client):
    """_summary_
    Publishes CAN messages to the MQTT broker. Using the simulation data
        Args:
            client (mqtt_client): The publisher object connected to the AWS broker.
    """
    while True:
        with open("data/simulation_data.txt", "r") as file:
            msg = ""
            for line in file:
                result = client.publish(topic, line.strip())
                status = result[0]
                if status != 0:
                    print(f"Failed to send message to topic {topic}")
                else:
                    print(line.strip())
                time.sleep(0.5)


def main():
    connected = False
    while not connected:
        client = connect_mqtt()
        if client != None:
            client.loop_start()
            publish(client)


if __name__ == "__main__":
    main()


### POSTGRES COMMANDS
# psql wesmo - start psql
# \l - list databases
# \c wesmo - connect to database
# \dt - list tables
# \d motor_controller - describe table
# SELECT * FROM motor_controller; - show all rows in table
# \q - quit
