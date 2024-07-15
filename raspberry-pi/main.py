import csv
import random
import argparse
from paho.mqtt import client as mqtt_client
from MCTranslator_Class import MCTranslator


""" GLOBAL VARIABLES
Set the Parameter of MQTT Broker Connection
Set the address, port and topic of MQTT Broker connection. 
At the same time, we call the Python function random.randint 
to randomly generate the MQTT client id.
"""
broker = "3.107.68.65"
port = 1883
topic = "/wesmo-data"
client_id = f"wesmo-{random.randint(0, 100)}"
username = "wesmo"
password = "public"

mc_translator = MCTranslator()
pdo = 1


def connect_mqtt() -> mqtt_client:
    """_summary_
    Connects to the MQTT broker and returns the client object.
    The MQTT broker is hosted on an AWS EC2 instance.
        Returns:
            mqtt_client: The publisher object connected to the AWS broker
    """

    def on_connect(client, userdata, flags, reason_code, properties=None):
        if reason_code != 0:
            print("Failed to connect, return code %d\n", reason_code)

    client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION2, client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    """_summary_
    Subscribes to the CAN messages using MQTT.
    Print out any received messages to the console and to a text file.
        Args:
            client (mqtt_client): The publisher object connected to the AWS broker.
    """

    def on_message(client, userdata, msg):

        can_msg = msg.payload.decode()

        if can_msg:
            can_data = mc_translator.decode_can_string(can_msg)
        if can_data:
            mc_translator.decode_pdo(can_data, pdo)

    client.subscribe(topic)
    client.on_message = on_message


def main():
    """Main function to run the script as a reciever device.

    The script can be run with the following command line arguments:
    -s, --subscribe: Subscribe to CAN messages using MQTT.
    """

    parser = argparse.ArgumentParser(
        description="Converts CAN string messages to human readable data."
    )
    parser.add_argument(
        "-s",
        "--subscribe",
        action="store_true",
        help="Subscribe to CAN messages using MQTT",
    )

    args = parser.parse_args()

    if args.subscribe:
        client = connect_mqtt()
        subscribe(client)
        client.loop_forever()
    else:
        print("Error: Please specify either  -s/--subscribe option.")
        exit(1)


if __name__ == "__main__":
    main()
