from paho.mqtt import client as mqtt_client

import random
import time


""" Set the Parameter of MQTT Broker Connection
    Set the address, port and topic of MQTT Broker connection. 
    At the same time, we call the Python function random.randint 
    to randomly generate the MQTT client id."""

broker = "3.107.68.65" # IP of broker instance on AWS
port = 1883
topic = "/wesmo-data"
username = "wesmo"
password = "public"

client_id = f"wesmo-{random.randint(0, 1000)}"

""" Write the MQTT Connect Function
    Write the connect callback function on_connect. This function 
    will be called after connecting the client, and we can 
    determine whether the client is connected successfully according
    to rc in this function. Usually, we will create an MQTT client 
    at the same time and this client will connect to the broker in AWS."""


def connect_mqtt() -> mqtt_client:
    def on_connect(client, userdata, flags, reason_code, properties=None):
        if reason_code == 0:
            print("Connected to MQTT Broker!")
        else:
            print("Failed to connect, return code %d\n", reason_code)

    client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION2, client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


""" Publish Messages
    First, we define a while loop. In this loop, and we will set the 
    MQTT client publish function to send messages to the topic
   /wesmo-data every second."""


def publish(client):
    msg_count = 0
    while True:
        time.sleep(1)
        msg = f"messages: {msg_count}"
        result = client.publish(topic, msg)
        status = result[0]
        if status == 0:
            print(f"Send `{msg} to topic `{topic}`")
        else:
            print(f"Failed to send message to topic {topic}")
        msg_count += 1


def run():
    client = connect_mqtt()
    client.loop_start()
    publish(client)


if __name__ == "__main__":
    run()
