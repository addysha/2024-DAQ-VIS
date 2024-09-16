"""
File: mqtt_subscriber.py
Author: Hannah Murphy
Date: 2024-09-14
Description: Run by the main app server, contains all MQTT and Redis relevent methods.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

"""

import random
import redis
import pickle
from paho.mqtt import client as mqtt_client
from MCTranslatorClass import MCTranslator
from BMSTranslatorClass import BMSTranslator
from database import (
    start_postgresql,
    setup_db,
    connect_to_db,
    create_mc_table,
    save_to_db_mc,
    save_to_db_bms,
    create_bms_table,
)


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
client_list = []

""" COMPONENT TRANSLATORS """
mc_translator = MCTranslator()
bms_translator = BMSTranslator()


"""
        REDIS
"""


def start_redis():
    r = redis.Redis(host="localhost", port=6379, db=0)
    return r


def query_all_latest_data():
    keys = redis_client.keys("*")
    all_data = []

    for key in keys:
        data = redis_client.get(key)
        if data:
            try:
                deserialized_data = pickle.loads(data)
                all_data.append(
                    {
                        "time": deserialized_data["time"],
                        "name": deserialized_data["name"],
                        "value": deserialized_data["value"],
                        "unit": deserialized_data["unit"],
                        "max": deserialized_data["max"],
                    }
                )
            except pickle.PickleError as e:
                print(f" -! # Error deserializing data for key {key}: {e}")
        else:
            print(f" -! #  No data found for key {key}")

    return all_data


def query_latest(data_name, redis_client):
    data = redis_client.get(data_name)
    if data:
        try:
            deserialized_data = pickle.loads(data)
            latest_data = {
                "time": deserialized_data.get("time", ""),
                "name": deserialized_data.get("name", ""),
                "value": deserialized_data.get("value", ""),
                "unit": deserialized_data.get("unit", ""),
                "max": deserialized_data.get("max", ""),
            }
            return latest_data
        except pickle.PickleError as e:
            print(f" -! # Error deserializing data for {data_name}: {e}")
    else:
        print(f" -! # No data found for {data_name}")
        return None


def cache_data(time, value):
    try:
        redis_key = value["name"]
        redis_value = {
            "time": time[1] + " " + time[2],
            "name": value["name"],
            "value": value["value"],
            "unit": value["unit"],
            "max": value["max"],
        }
        redis_client.set(
            redis_key,
            pickle.dumps(redis_value),
        )

    except Exception as e:
        print(f" -! # Error with {redis_key}: {e}")


def query_data(data_name):
    try:
        if data_name == "Motor Temperature" or data_name == "Motor Speed":
            query = (
                f"SELECT time, value from MOTOR_CONTROLLER where name = '{data_name}'"
            )
        elif (
            data_name == "Battery Temperature"
            or data_name == "Battery Current"
            or data_name == "Battery State of Charge"
            or data_name == "Battery Voltage"
            or data_name == "Battery Power"
            or data_name == "Battery DCL"
            or data_name == "Battery Status"
            or data_name == "Battery Checksum"
        ):
            query = f"SELECT time, value from BATTERY_MANAGEMENT_SYSTEM where name = '{data_name}'"
        else:
            print(f" -! #  ERROR: Data '{data_name}' does not exist in database.")

        cursor.execute(query)
        data = cursor.fetchall()
        converted_data = []
        for dt, value in data:
            timestamp = int(dt.timestamp())
            converted_data.append({"timestamp": timestamp, "value": value})
        print(converted_data)
        return converted_data
    except Exception as e:
        print(f" -! # Error collecting data from: {e}")


"""
        MQTT
"""


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


def subscribe(client: mqtt_client, redis_client):
    """_summary_
    Subscribes to the CAN messages using MQTT.
    Print out any received messages to the console and to a text file.
        Args:
            client (mqtt_client): The publisher object connected to the AWS broker.
    """

    def on_message(client, userdata, msg):
        data = []
        raw_data = msg.payload.decode()
        if raw_data != "None":
            # Motor Controller
            if (
                "ID: 0181" in raw_data
                or "ID: 0281" in raw_data
                or "ID: 0381" in raw_data
                or "ID: 0481" in raw_data
            ):
                data = mc_translator.decode(raw_data)
                if data != []:
                    save_to_db_mc(cursor, conn, data, data[1])
            # Battery Management System
            elif (
                "ID: 1713" in raw_data
                or "ID: 000006b1" in raw_data
                or "ID: 77" in raw_data
                or "ID: 4d" in raw_data
            ):
                data = bms_translator.decode(raw_data)
                if data != []:
                    save_to_db_bms(cursor, conn, data)

    client.subscribe(topic)
    client.on_message = on_message


def start_mqtt_subscriber():
    # Connect & Set up database
    global cursor, conn, redis_client
    cursor, conn = start_postgresql()
    setup_db(cursor, conn)
    cursor, conn = connect_to_db()
    create_mc_table(cursor, conn)
    create_bms_table(cursor, conn)

    # Initialize Redis connection
    redis_client = start_redis()

    # Set up MQTT communications
    client = connect_mqtt()
    subscribe(client, redis_client)
    client.loop_forever()
