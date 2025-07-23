"""
File: mqtt_subscriber.py
Author: Hannah Murphy
Date: 2024
Description: Run by the main app server, contains all MQTT and Redis relevent methods.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.
"""

import requests
import threading
import random
import redis
import pickle
import datetime
import json
import paho.mqtt.client as mqtt_client
import datetime

from MCTranslatorClass import MCTranslator
from BMSTranslatorClass import BMSTranslator
from VCUTranslatorClass import VCUTranslator
from database import (
    start_postgresql,
    setup_db,
    connect_to_db,
    create_mc_table,
    save_to_db_mc,
    save_to_db_bms,
    create_bms_table,
    create_vcu_table,
    save_to_db_vcu,
)

""" GLOBAL VARIABLES
Set the Parameter of MQTT Broker Connection
Set the address, port and topic of MQTT Broker connection. 
At the same time, we call the Python function random.randint 
to randomly generate the MQTT client id.
"""

broker = "localhost" # 52.64.83.72 before
port = 1883
topic = "/wesmo-data"
client_id = f"wesmo-{random.randint(0, 100)}"
username = "wesmo"
password = "wesmo2025" # public 
client_list = []

TIMEOUT = 30
timeout_timer = None
is_timed_out = False

# COMPONENT TRANSLATORS
mc_translator = MCTranslator()
bms_translator = BMSTranslator()
vcu_translator = VCUTranslator()

# REDIS

def start_redis():
    return redis.Redis(host="localhost", port=6379, db=0)

def query_all_latest_data():
    redis_client = start_redis()
    keys = redis_client.keys("*")
    all_data = []
    for key in redis_client.scan_iter("*"):
        data = redis_client.get(key)
        if isinstance(data, bytes):
            try:
                deserialized_data = pickle.loads(data)
                all_data.append({
                    "time": deserialized_data["time"],
                    "name": deserialized_data["name"],
                    "value": deserialized_data["value"],
                    "unit": deserialized_data["unit"]
                })
            except pickle.PickleError as e:
                print(f"{datetime.datetime.now()} -! # Error deserializing data for key {key}: {e}")
    return all_data

def query_latest(data_name):
    redis_client = start_redis()
    data = redis_client.get(data_name)
    if isinstance(data, bytes):
        try:
            deserialized_data = pickle.loads(data)
            return {
                "time": deserialized_data.get("time", ""),
                "name": deserialized_data.get("name", ""),
                "value": deserialized_data.get("value", ""),
                "unit": deserialized_data.get("unit", "")
            }
        except pickle.PickleError as e:
            print(f"{datetime.datetime.now()} -! # Error deserializing data for {data_name}: {e}")
    return None

def cache_data(time, value):
    redis_client = start_redis()
    try:
        redis_key = value["name"]
        redis_value = {
            "time": time[1] + " " + time[2],
            "name": value["name"],
            "value": value["value"],
            "unit": value["unit"]
        }
        redis_client.set(redis_key, pickle.dumps(redis_value))
    except Exception as e:
        print(f"{datetime.datetime.now()} -! # Error with {redis_key}: {e}")

def query_data(data_name, cursor, conn):
    try:
        if data_name in ["Motor Temperature", "Motor Speed", "DC Link Circuit Voltage"]:
            query = f"SELECT time, value FROM MOTOR_CONTROLLER WHERE name = '{data_name}' ORDER BY time DESC LIMIT 50;"
        elif data_name == "Wheel Speed":
            query = ("SELECT time, value, name FROM VEHICLE_CONTROLL_UNIT WHERE name IN "
                     "('Wheel Speed RR', 'Wheel Speed RL', 'Wheel Speed FR', 'Wheel Speed FL') "
                     "ORDER BY time DESC LIMIT 50;")
        elif data_name == "Brakes and APPS":
            query = ("SELECT time, value, name FROM VEHICLE_CONTROLL_UNIT WHERE name IN "
                     "('Break Pressure Rear', 'Break Pressure Front', 'Accelerator Travel 1', 'Accelerator Travel 2') "
                     "ORDER BY time DESC LIMIT 50;")
        elif data_name in [
            "Battery Temperature", "Battery Current", "Battery State of Charge",
            "Battery Voltage", "Battery Power", "Battery DCL",
            "Battery Status", "Battery Checksum", "Predictive State of Charge"]:
            query = f"SELECT time, value FROM BATTERY_MANAGEMENT_SYSTEM WHERE name = '{data_name}' ORDER BY time DESC LIMIT 50;"
        else:
            print(f"{datetime.datetime.now()} -! # ERROR: Data '{data_name}' does not exist in database.")
            return []

        cursor.execute(query)
        data = cursor.fetchall()
        converted_data = []
        if data_name in ["Wheel Speed", "Brakes and APPS"]:
            for dt, value, name in data:
                timestamp = int(dt.timestamp())
                converted_data.append({"timestamp": timestamp, "value": value, "name": name.strip()})
        else:
            for dt, value in data:
                timestamp = int(dt.timestamp())
                converted_data.append({"timestamp": timestamp, "value": value})
        return converted_data
    except Exception as e:
        print(f"{datetime.datetime.now()} -! # Error collecting data from: {e}")
        return []

# MQTT

def connect_mqtt():
    try:
        from paho.mqtt.enums import CallbackAPIVersion
        CB_VER = CallbackAPIVersion.VERSION2
    except ImportError:
        CB_VER = 2  # older/newer fallback
    def on_connect(client, userdata, flags, rc, properties=None):
        if rc != 0:
            print(f"Failed to connect, return code {rc}")

    client = mqtt_client.Client(
        client_id=client_id,
        protocol=mqtt_client.MQTTv311,
        callback_api_version=CallbackAPIVersion.VERSION2  # silences deprecation warning
    )
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client



def check_for_faults(raw):
    """
    raw: dict or list[dict] each having 'name' and 'value' (numeric).
    Prints WARN/FAULT with cooldown and returns a list of events.
    """

    # ---------------- thresholds & config ----------------
    fault_thresholds = {
        "Battery Temperature":        {"max": 60,  "min": 0},
        "Battery Voltage":            {"max": 336, "warn": 320, "min": 0},   # 288V nominal
        "Battery Current":            {"max": 240, "warn": 200, "min": -50},
        "Motor Temperature":          {"max": 80},
        "Motor Speed":                {"max": 10000},
        "DC Link Circuit Voltage":    {"max": 450},
        "Accelerator Travel 1":       {"max": 100},
        "Accelerator Travel 2":       {"max": 100},
        "Break Pressure Rear":        {"max": 100},
        "Break Pressure Front":       {"max": 100},
        "Wheel Speed FL":             {"max": 200},
        "Wheel Speed FR":             {"max": 200},
        "Wheel Speed RL":             {"max": 200},
        "Wheel Speed RR":             {"max": 200},
    }
    COOLDOWN_SEC = 5
    # -----------------------------------------------------

    # one-time store for debounce
    if not hasattr(check_for_faults, "_last_report"):
        check_for_faults._last_report = {}   # key: (name, status) -> ts

    # normalize input
    if isinstance(raw, dict):
        data = [raw]
    elif isinstance(raw, list):
        data = [d for d in raw if isinstance(d, dict)]
    else:
        return []

    now_ts = datetime.datetime.now().timestamp()
    events = []

    for point in data:
        name  = point.get("name")
        value = point.get("value")

        if name not in fault_thresholds or not isinstance(value, (int, float)):
            continue

        limits = fault_thresholds[name]
        max_v  = limits.get("max")
        min_v  = limits.get("min")
        warn_v = limits.get("warn")

        status = None
        msg    = None

        # High-side checks
        if max_v is not None and value > max_v:
            status = "FAULT_HIGH"
            msg = f"[FAULT] {name} exceeded max threshold: {value} > {max_v}"
        elif warn_v is not None and value >= warn_v and (max_v is None or value <= max_v):
            status = "WARN_HIGH"
            msg = f"[WARN]  {name} approaching limit: {value} ≥ {warn_v}"

        # Low-side check (only if no high-side status already)
        if status is None and min_v is not None and value < min_v:
            status = "FAULT_LOW"
            msg = f"[FAULT] {name} below min threshold: {value} < {min_v}"

        if status:
            key = (name, status)
            last = check_for_faults._last_report.get(key, 0)
            if now_ts - last >= COOLDOWN_SEC:
                print(msg)
                check_for_faults._last_report[key] = now_ts
                events.append({"name": name, "value": value, "status": status, "time": now_ts})

    return events




def subscribe(client, redis_client):
    def on_message(client, userdata, msg):
        global is_timed_out
        reset_timeout()
        if is_timed_out:
            on_timeout(False)

        raw_payload = msg.payload
        try:
            raw_text = raw_payload.decode()
        except UnicodeDecodeError:
            print(f"{datetime.datetime.now()} -! # Can't decode payload bytes")
            return

        normalized = raw_text.lower().replace(" ", "").replace("\t", "")

        def process_and_fault(save_fn, decoded):
            if decoded:
                save_fn(cursor, conn, decoded)
                check_for_faults(decoded)

        # helper to process a decoded block
        def handle_block(label, decoded):
            if not decoded:
                return
            # save to DB (keep your existing calls)
            if label == "BMS":
                save_to_db_bms(cursor, conn, decoded)
            elif label == "MC":
                save_to_db_mc(cursor, conn, decoded, decoded[1] if isinstance(decoded, list) and len(decoded) > 1 else None)
            elif label == "VCU":
                save_to_db_vcu(cursor, conn, decoded)

            # --- NEW: collect fault/warn events
            events = check_for_faults(decoded)
            # optional: do something with events
            # if events:
            #     safe_request("post", "http://localhost:5001/faults", json=events)
            #     redis_client.rpush("fault_events", pickle.dumps(events))


        # Battery Management System
        if "id:004d" in normalized:
            data = bms_translator.decode(raw_text)
            process_and_fault(save_to_db_bms, data)

        # Motor Controller
        if any(f"id:{id_}" in normalized for id_ in ["0181", "0281", "0381", "0481"]):
            data = mc_translator.decode(raw_text)
            if data:
                save_to_db_mc(cursor, conn, data, data[1] if isinstance(data, list) and len(data) > 1 else None)
                check_for_faults(data)

        # Vehicle Control Unit
        if any(f"id:{id_}" in normalized for id_ in ["0010", "0011", "0012", "0201"]):
            data = vcu_translator.decode(raw_text)
            if data:
                save_to_db_vcu(cursor, conn, data)
                check_for_faults(data)

    client.subscribe(topic)
    client.on_message = on_message


def reset_timeout():
    global timeout_timer
    if timeout_timer:
        timeout_timer.cancel()
    timeout_timer = threading.Timer(TIMEOUT, lambda: on_timeout(True))
    timeout_timer.start()

def on_timeout(timeout):
    global is_timed_out, redis_client
    url = "http://localhost:5001/timeout"
    is_timed_out = not is_timed_out
    redis_client.flushdb()
    try:
        response = requests.post(
            url, json={"timeout": timeout}, headers={"Content-Type": "application/json"}
        )
        if response.status_code != 200:
            print(f"{datetime.datetime.now()} -! # Failed: {response.status_code} - {response.json()}")
    except requests.exceptions.RequestException as e:
        print(f"{datetime.datetime.now()} -! # Error making request: {e}")

def start_mqtt_subscriber():
    global cursor, conn, redis_client
    cursor, conn = start_postgresql()
    setup_db(cursor, conn)
    cursor, conn = connect_to_db()

    create_mc_table(cursor, conn)
    create_bms_table(cursor, conn)
    create_vcu_table(cursor, conn)

    redis_client = start_redis()
    global is_timed_out
    is_timed_out = False

    reset_timeout()
    client = connect_mqtt()
    subscribe(client, redis_client)
    client.loop_forever()

def main():
    start_mqtt_subscriber()

if __name__ == "__main__":
    main()
