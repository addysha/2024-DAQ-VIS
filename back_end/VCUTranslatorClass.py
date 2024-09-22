"""
File: VCUTranslatorClass.py
Author: Hannah Murphy
Date: 2024
Description: The translating class for data sent from the Motor Controller.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

"""

import datetime


class VCUTranslator:
    def __init__(self):
        pass

    def decode(self, can_data):
        can_data = can_data.split()
        dl = int(can_data[7])

        data = [f"time: {datetime.datetime.fromtimestamp(float(can_data[1]))}"]
        id = can_data[3]

        data_list = can_data[8 : 8 + dl]
        if len(data_list) != dl:
            return []

        if "010" in id:
            data += self.decode_error_message(data_list)
        elif "201" in id:
            data += self.decode_RPDO1(data_list)
        elif "000" in id:
            data += self.decode_startup_message(data_list)

        return data

    def decode_error_message(self, data):
        if len(data) != 2:
            print(f"Invalid Error message length {data}")

        byte1, byte2 = data[0], data[1]

        voltage_fault = (byte1 >> 7) & 1
        mismatch_fault = (byte1 >> 6) & 1
        break_conflict = (byte1 >> 5) & 1

        return [
            {
                "name": "APPS Voltage fault",
                "value": voltage_fault,
                "unit": "",
                "max": 1,
            },
            {
                "name": "APPS Mismatch fault",
                "value": mismatch_fault,
                "unit": "",
                "max": 1,
            },
            {
                "name": "Break Conflict warning",
                "value": break_conflict,
                "unit": "",
                "max": 1,
            },
        ]

    def decode_RPDO1(self, data):
        if len(data) != 16:
            print(f"Invalid RPD01 message length {data}")

        control_word = int(data[0:2] + data[2:4], 16)
        target_torque = int(data[12:14] + data[14:16], 16)

        return [
            {"name": "Control word", "value": control_word, "unit": "", "max": 100},
            {
                "name": "Target torque",
                "value": target_torque,
                "unit": "rpm",
                "max": 10000,
            },
        ]

    def decode_startup_message(self, data):
        if len(data) != 4:
            print(f"Invalid startup message length {data}")

        MCU_mode = int(data[0:2], 16)
        dest_node = int(data[2:4], 16)

        return [
            {"name": "MCU Mode", "value": MCU_mode, "unit": "", "max": 100},
            {
                "name": "Destination Node",
                "value": dest_node,
                "unit": "",
                "max": 100,
            },
        ]

        return []
