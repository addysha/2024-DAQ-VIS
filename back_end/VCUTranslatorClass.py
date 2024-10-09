"""
File: VCUTranslatorClass.py
Author: Hannah Murphy
Date: 2024
Description: The translating class for data sent from the Motor Controller.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

"""

import datetime
import cantools
import requests


class VCUTranslator:
    def __init__(self):
        pass

    def decode(self, can_data):
        try:
            dbc = cantools.database.load_file("dbc/EV24.dbc")
            can_data = can_data.split()
            can_data = can_data[:-2]
            dl = int(can_data[7])
            data_list = can_data[8 : 8 + dl]
            if len(data_list) != dl:
                return []

            id = int(can_data[3], 16)
            data = bytearray.fromhex("".join(data_list))
            decoded_message = dbc.decode_message(id, data)
            data = [f"time: {datetime.datetime.fromtimestamp(float(can_data[1]))}"]

            # TODO USED FOR SIMULATION DELETE WHEN IN PRODUCTION
            data = [f"time: {datetime.datetime.now()}"]

            if (16 == id) or (10 == id):
                self.check_timer(decoded_message)
                data += self.format_vehicle_status(decoded_message)
            elif (17 == id) or (11 == id):
                data += self.format_pedals(decoded_message)
            elif (18 == id) or (12 == id):
                data += self.format_wheel_speed(decoded_message)
            elif (513 == id) or (201 == id):
                data += self.format_RPD01(decoded_message)

            return data

        except Exception as e:
            print(f" -! # Error translating vcu data: {e}")

    def check_timer(self, messages):
        url = "http://localhost:5001/track-timer"

        if messages["RTD_Running"] == 1:
            try:
                response = requests.post(
                    url,
                    json={"messages": messages},
                    headers={"Content-Type": "application/json"},
                )

                if response.status_code != 200:
                    print(f"Failed: {response.status_code} - {response.json()}")
            except requests.exceptions.RequestException as e:
                print(f"Error making request: {e}")
        if messages["RTD_Switch_State"] == 0:
            try:
                response = requests.delete(
                    url,
                    headers={"Content-Type": "application/json"},
                )

                if response.status_code != 200:
                    print(f"Failed: {response.status_code} - {response.json()}")
            except requests.exceptions.RequestException as e:
                print(f"Error requesting delete: {e}")

    def format_vehicle_status(self, messages):

        return [
            {
                "name": "APPS Voltage fault",
                "value": messages["APPS_Voltage_Fault"],
                "unit": "",
                "max": 1,
            },
            {
                "name": "APPS Mismatch fault",
                "value": messages["APPS_Mismatch_Fault"],
                "unit": "",
                "max": 1,
            },
            {
                "name": "Break Conflict",
                "value": messages["Brake_Conflict_Warning"],
                "unit": "",
                "max": 1,
            },
            {
                "name": "MCU is RTD",
                "value": messages["MCU_isRTD"],
                "unit": "",
                "max": 1,
            },
            {
                "name": "NMT is Operational",
                "value": messages["NMT_isOperational"],
                "unit": "",
                "max": 1,
            },
            {
                "name": "RTD Running",
                "value": messages["RTD_Running"],
                "unit": "",
                "max": 1,
            },
            {
                "name": "VCU Error Present",
                "value": messages["VCU_Error_Present"],
                "unit": "",
                "max": 1,
            },
            {
                "name": "RTD Switch State",
                "value": messages["RTD_Switch_State"],
                "unit": "",
                "max": 1,
            },
            {
                "name": "Comms Switch State",
                "value": messages["Comms_Switch_State"],
                "unit": "",
                "max": 1,
            },
        ]

    def format_RPD01(self, messages):
        return [
            {
                "name": "Control Word",
                "value": messages["Controlword"],
                "unit": "",
                "max": 65535,
            },
            {
                "name": "Target Torque",
                "value": messages["Target_Torque"],
                "unit": "rpm",
                "max": 32767,
            },
            {
                "name": "Target Velocity",
                "value": messages["Target_Velocity"],
                "unit": "rpm",
                "max": 100000,
            },
        ]

    def format_wheel_speed(self, messages):
        return [
            {
                "name": "Wheel Speed RR",
                "value": messages["wheel_speed_RR"],
                "unit": "",
                "max": 0,
            },
            {
                "name": "Wheel Speed RL",
                "value": messages["wheel_speed_RL"],
                "unit": "",
                "max": 0,
            },
            {
                "name": "Wheel Speed FR",
                "value": messages["wheel_speed_FR"],
                "unit": "",
                "max": 0,
            },
            {
                "name": "Wheel Speed FL",
                "value": messages["wheel_speed_FL"],
                "unit": "",
                "max": 0,
            },
        ]

    def format_pedals(self, messages):
        return [
            {
                "name": "Break Pressure Rear",
                "value": messages["Brake_Pressure_Rear"],
                "unit": "Bar",
                "max": 32767,
            },
            {
                "name": "Break Pressure Front",
                "value": messages["Brake_Pressure_Front"],
                "unit": "Bar",
                "max": 32767,
            },
            {
                "name": "Accelerator Travel 1",
                "value": messages["APPS1_travel"],
                "unit": "%",
                "max": 32767,
            },
            {
                "name": "Accelerator Travel 2",
                "value": messages["APPS2_travel"],
                "unit": "%",
                "max": 32767,
            },
        ]
