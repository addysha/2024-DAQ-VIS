#!/usr/bin/env python3
"""_summary_
    Python3 script to set up and run the Raspberry Pi for CAN Bus telemetry
    Developer: Hannah Murphy
    Organisation: WESMO 2024
"""
import os
import can
import random
from paho.mqtt import client as mqtt_client
from can.exceptions import CanInitializationError

""" GLOBAL VARIABLES
Set the Parameter of MQTT Broker Connection
Set the address, port and topic of MQTT Broker connection. 
At the same time, we call the Python function random.randint 
to randomly generate the MQTT client id.
"""
broker = "3.107.68.65"
port = 1883
topic = "/wesmo-data"
username = "wesmo"
password = "public"
client_id = f"wesmo-{random.randint(0, 1000)}"


def create_device():
    """_summary_
    Function to create a CAN device on the Raspberry Pi.
    Retuns a CAN device object if successful or None if failed.
    Returns:
        bus: CAN-BUS interface or None
    """
    try:
        os.system("sudo ip link set can0 type can bitrate 500000")
        os.system("sudo ifconfig can0 up")
        return can.interface.Bus(channel="can0", interface="socketcan")

    except CanInitializationError as e:
        print(f"Failed to initialize CAN bus: {e.message}")
        if e.error_code is not None:
            print(f"Error code: {e.error_code}")
        return None
    except Exception as e:
        print("Failure to set up can devices:", e)
        return None


def shutdown_device():
    """_summary_
    Shuts down the CAN device on the Raspberry Pi.
    """
    try:
        os.system("sudo ifconfig can0 down")
    except Exception as e:
        print("Failure to shutdown can devices:", e)


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
            if reason_code == 0:
                print("connected to MQTT")
                connected = True
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


def publish(client, can0):
    """_summary_
    Publishes CAN messages to the MQTT broker.
        Args:
            client (mqtt_client): The publisher object connected to the AWS broker.
            can0 (can.interface.Bus): The CAN-BUS interface object.
    """
    while True:
        msg = can0.recv(0.0)
        msg = "sent from pi"
        result = client.publish(topic, str(msg))
        status = result[0]
        # if status != 0:
        #    print(f"Failed to send message to topic {topic}")
        # else:
        #    print("success")


def main():
    """_summary_
    --- Main loop ---
    1. Shutdown the CAN device, if there are any
    2. Create a CAN device
    3. Connect to the MQTT broker
    4. Publish CAN messages to the MQTT broker continuously
    """
    shutdown_device()
    can0 = create_device()

    if not can0:
        shutdown_device()

    connected = False
    while not connected:
        client = connect_mqtt()
        print(client)
        if client != None:
            client.loop_start()
            publish(client, can0)


if __name__ == "__main__":
    main()
