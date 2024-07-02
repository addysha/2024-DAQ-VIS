#!/usr/bin/env python3
"""_summary_
    Python3 script to set up and run the Raspberry Pi for CAN Bus telemetry
    Developer: Hannah Murphy
    Organisation: WESMO 2024
"""
import os
import can
import random
import time
from paho.mqtt import client as mqtt_client
from can.exceptions import CanInitializationError

# GLOBAL VARIABLES
broker = "3.107.68.65"
port = 1883
topic = "/wesmo-data"
username = "wesmo"
password = "public"
client_id = f"wesmo-{random.randint(0, 1000)}"


def create_device():
    try:
        os.system("sudo ip link set can0 type can bitrate 500000")
        os.system("sudo ifconfig can0 up")
        return can.interface.Bus(channel="can0", bustype="socketcan")

    except CanInitializationError as e:
        print(f"Failed to initialize CAN bus: {e.message}")
        if e.error_code is not None:
            print(f"Error code: {e.error_code}")
    except Exception as e:
        print("Failure to set up can devices:", e)
        return False


def shutdown_device():
    try:
        os.system("sudo ifconfig can0 down")
    except Exception as e:
        print("Failure to shutdown can devices:", e)
        return False


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, reason_code, properties=None):
        if reason_code != 0:
            print("Failed to connect, return code %d\n", reason_code)

    client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION2, client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def publish(client, can0):
    while True:
        msg = can0.recv(0.0)
        result = client.publish(topic, str(msg))
        status = result[0]
        if status != 0:
            print(f"Failed to send message to topic {topic}")


# Main loop
def main():
    shutdown_device()
    can0 = create_device()

    if not can0:
        shutdown_device()

    client = connect_mqtt()
    client.loop_start()
    publish(client, can0)


if __name__ == "__main__":
    main()
