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


class VCUTranslator:
    def __init__(self):
        pass

    def decode(self, can_data):
        try:
            dbc = cantools.database.load_file("dbc/EV24.dbc")
            can_data = can_data.split()
            dl = int(can_data[7])
            data_list = can_data[8 : 8 + dl]
            if len(data_list) != dl:
                return []

            id = int(can_data[3], 16)
            data = bytearray.fromhex("".join(data_list))
            decoded_message = dbc.decode_message(id, data)
            data = [f"time: {datetime.datetime.fromtimestamp(float(can_data[1]))}"]

            if ("16" == id) or ("10" == id):
                data += self.format_vehicle_status(decoded_message)
            elif ("385" == id) or ("181" == id):
                data += self.format_PD01(decoded_message)
            elif ("641" == id) or ("281" == id):
                data += self.format_PD02(decoded_message)
            elif ("1383" == id) or ("567" == id):
                data += self.format_wheel_speed(decoded_message)
            elif ("513" == id) or ("201" == id):
                data += self.format_RPD01(decoded_message)

            return data

        except Exception as e:
            print(f" -! # Error translating vcu data: {e}")

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
                "name": "Break Conflict warning",
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

    def format_PD01(self, messages):
        return [
            {
                "name": "Torque Actual Value",
                "value": messages["Torque_Actual_Value"],
                "unit": "",
                "max": 100,
            },
            {
                "name": "Position Actual Value",
                "value": messages["Position_Actual_Value"],
                "unit": "",
                "max": 1000,
            },
            {
                "name": "Status Word",
                "value": messages["Statusword"],
                "unit": "",
                "max": 1000,
            },
        ]

    def format_PD02(self, messages):
        print("pdo2", messages)
        return [
            {
                "name": "Current Demand",
                "value": messages["Current_Demand"],
                "unit": "",
                "max": 100,
            },
            {
                "name": "Logic Power Supply Voltage",
                "value": messages["Logic_Power_Supply_Voltage"],
                "unit": "",
                "max": 1000,
            },
            {
                "name": "DC Link Circuit Voltage",
                "value": messages["DC_Link_Circuit_Voltage"],
                "unit": "",
                "max": 1000,
            },
            {
                "name": "Motor Temperature",
                "value": messages["Motor_Temperature"],
                "unit": "",
                "max": 100,
            },
            {
                "name": "Controller Temperature",
                "value": messages["Controller_Temperature"],
                "unit": "",
                "max": 1000,
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
