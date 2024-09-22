"""
File: App_dummy.py
Author: Hannah Murphy
Date: 2024
Description: Used to create a rough simulation for the data displayed on the digital dashboard

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

Usage: Python3 App_dummy.py
"""

from flask import Flask, request

# from flask_socketio import SocketIO
import socketio
import time
import datetime
from dummy_data import DummySensorData

app = Flask(__name__)
# socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")

historical_data = {
    "Motor Temperature": [],
    "Battery Temperature": [],
    "Motor Speed": [],
    "Battery State of Charge": [],
    "Battery Voltage": [],
    "Battery Current": [],
    "Suspension Travel": [],
    "Pedal Angle 1": [],
    "Pedal Angle 2": [],
    "Track Time": [],
    "Wheel Speeds": [],
    "Warnings": [],
    "Break Pressures": [],
    "High Voltage": [],
    "Vehicle Errors": [],
    "Predictive State of Charge": [],
    "Low Voltage": [],
    "Electrical Systems": [],
    "Sensors": [],
    "Ready to Drive": [],
}


def create_data():
    return [
        DummySensorData("Motor Temperature", 60, 0, 100, "C"),
        DummySensorData("Battery Temperature", 47, 0, 60, "C"),
        DummySensorData("Motor Speed", 3654, 1500, 4700, "RPM"),
        DummySensorData("Battery State of Charge", 90, 0, 100, "%"),
        DummySensorData("Battery Voltage", 286, 216, 300, "V"),
        DummySensorData("Battery Current", 269, 0, 300, "A"),
        DummySensorData("Suspension Travel", 48, 0, 78, "mm"),
        DummySensorData("Pedal Angle 1", 50, 0, 100, "%"),
        DummySensorData("Pedal Angle 2", 47, 0, 100, "%"),
        DummySensorData("Track Time", 0, 0, 1000, "s"),
        DummySensorData("Wheel Speed LF", 2245, 0, 10000, "RPM"),
        DummySensorData("Wheel Speed RF", 3654, 1500, 4700, "RPM"),
        DummySensorData("Wheel Speed LB", 3654, 1500, 4700, "RPM"),
        DummySensorData("Wheel Speed RB", 3654, 1500, 4700, "RPM"),
        DummySensorData("Warnings", 0, 0, 4, "System Faults"),
        DummySensorData("Break Pressure Front", 6000, -100, 8000, "kPa"),
        DummySensorData("Break Pressure Rear", 5189, -100, 8000, "kPa"),
        DummySensorData("High Voltage", 0, 0, 1, ""),
        DummySensorData("Vehicle Errors", "Error", 0, 0, ""),
        DummySensorData("Predictive State of Charge", 45, 0, 100, "%"),
        DummySensorData("Low Voltage", 0, 0, 1, ""),
        DummySensorData("Electrical Systems", 0, 0, 1, ""),
        DummySensorData("Sensors", 0, 0, 1, ""),
        DummySensorData("Ready to Drive", 0, 0, 1, ""),
    ]


def generate_data(sensors):
    sensors[0].update_value_step(step=1)  # motor_temp
    sensors[1].update_value_step(step=3)  # battery_temp
    sensors[2].update_value_step(step=20)  # motor_speed
    sensors[3].update_value_decreasing(step=5)  # battery_soc
    sensors[4].update_value_step(step=5)  # battery_voltage
    sensors[5].update_value_step(step=5)  # battery_current
    sensors[6].update_value_step(step=3)  # suspension_travel
    sensors[7].update_value_step(step=7)  # pedal_angle_1
    sensors[8].update_value_step(step=7)  # pedal_angle_2
    sensors[9].update_value_increasing(step=1)  # track_time
    sensors[10].update_value_step(step=150)  # wheel_speed
    sensors[11].update_value_step(step=150)  # wheel_speed1
    sensors[12].update_value_step(step=150)  # wheel_speed2
    sensors[13].update_value_step(step=150)  # wheel_speed3
    sensors[14].update_fault_data()  # warnings
    sensors[15].update_value_step(step=100)  # break_pressure_front
    sensors[16].update_value_step(step=100)  # break_pressure_rear
    sensors[17].update_value_boolean()  # high_voltage
    sensors[18].update_string()  # error
    sensors[19].update_value_step(step=3)  # predict_charge
    sensors[20].update_value_boolean()  # low_voltage
    sensors[21].update_value_boolean()  # electrical_systems
    sensors[22].update_value_boolean()  # sensors
    sensors[23].update_value_boolean()  # ready_to_drive

    log_data(sensors)


def log_data(sensors):
    timestamp = datetime.datetime.now().strftime("%s")
    historical_data["Motor Temperature"].append(
        {"timestamp": timestamp, "value": sensors[0].value}
    )
    historical_data["Battery Temperature"].append(
        {"timestamp": timestamp, "value": sensors[1].value}
    )
    historical_data["Motor Speed"].append(
        {"timestamp": timestamp, "value": sensors[2].value}
    )
    historical_data["Battery State of Charge"].append(
        {"timestamp": timestamp, "value": sensors[3].value}
    )
    historical_data["Battery Voltage"].append(
        {"timestamp": timestamp, "value": sensors[4].value}
    )
    historical_data["Battery Current"].append(
        {"timestamp": timestamp, "value": sensors[5].value}
    )
    historical_data["Suspension Travel"].append(
        {"timestamp": timestamp, "value": sensors[6].value}
    )
    historical_data["Pedal Angle 1"].append(
        {"timestamp": timestamp, "value": sensors[7].value}
    )
    historical_data["Pedal Angle 2"].append(
        {"timestamp": timestamp, "value": sensors[8].value}
    )
    historical_data["Track Time"].append(
        {"timestamp": timestamp, "value": sensors[9].value}
    )
    historical_data["Wheel Speeds"].append(
        {
            "timestamp": timestamp,
            "LF": sensors[10].value,
            "RF": sensors[11].value,
            "LB": sensors[12].value,
            "RB": sensors[13].value,
        }
    )
    historical_data["Warnings"].append(
        {"timestamp": timestamp, "value": sensors[14].value}
    )
    historical_data["Break Pressures"].append(
        {"timestamp": timestamp, "front": sensors[15].value, "rear": sensors[16].value}
    )
    historical_data["High Voltage"].append(
        {"timestamp": timestamp, "value": sensors[17].value}
    )
    historical_data["Vehicle Errors"].append(
        {"timestamp": timestamp, "value": sensors[18].value}
    )
    historical_data["Predictive State of Charge"].append(
        {"timestamp": timestamp, "value": sensors[19].value}
    )
    historical_data["Low Voltage"].append(
        {"timestamp": timestamp, "value": sensors[20].value}
    )
    historical_data["Electrical Systems"].append(
        {"timestamp": timestamp, "value": sensors[21].value}
    )
    historical_data["Sensors"].append(
        {"timestamp": timestamp, "value": sensors[22].value}
    )
    historical_data["Ready to Drive"].append(
        {"timestamp": timestamp, "value": sensors[23].value}
    )


@socketio.on("testing")
def handle_testing():
    sensors = create_data()
    while True:
        generate_data(sensors)
        socketio.emit("data", [sensor.to_dict() for sensor in sensors], to=request.sid)
        time.sleep(5)


@socketio.on("history")
def handle_history():
    socketio.emit("historic_data", historical_data, to=request.sid)


@socketio.on("update_clients")
def handle_update_clients():
    sensors = create_data()
    generate_data(sensors)
    socketio.emit("data", [sensor.to_dict() for sensor in sensors])


@socketio.on("connect")
def handle_connect():
    print(f"User connected!")


@socketio.on("disconnect")
def handle_disconnect():
    print(f"User disconnected!")


if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
