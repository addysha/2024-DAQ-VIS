import cantools
import datetime


class BMSTranslator:
    def __init__(self):
        pass

    def decode(self, can_data):
        dbc = cantools.database.load_file("bms.dbc")
        can_data = can_data.split()

        dl = int(can_data[7])
        data_list = can_data[8:]
        if len(data_list) != dl:
            return []

        id = int(can_data[3], 16)
        data = bytearray.fromhex("".join(data_list))

        decoded_message = dbc.decode_message(id, data)
        data = [f"time: {datetime.datetime.fromtimestamp(float(can_data[1]))}"]

        return data + [
            {
                "name": "High Temperature",
                "value": decoded_message["High_Temperature"],
                "unit": "C",
                "max": 60,
            },
            {
                "name": "Battery Current",
                "value": decoded_message["Pack_Current"],
                "unit": "A",
                "max": 100,
            },
            {
                "name": "Battery State of Charge",
                "value": decoded_message["Pack_Current"],
                "unit": "%",
                "max": 100,
            },
            {
                "name": "Battery Voltage",
                "value": decoded_message["Pack_Inst_Voltage"],
                "unit": "V",
                "max": 100,
            },
            {
                "name": "Battery Power",
                "value": decoded_message["Pack_kW_Power"],
                "unit": "kW",
                "max": 100,
            },
            {
                "name": "Battery DCL",  # discharge current limit
                "value": decoded_message["Maximum_Pack_DCL"],
                "unit": "A",
                "max": 80,
            },
            {
                "name": "Battery Status",
                "value": decoded_message["Failsafe_Statuses"],
                "unit": "",
                "max": 100,
            },
            {
                "name": "Battery Checksum",
                "value": decoded_message["CRC_Checksum"],
                "unit": "",
                "max": 100,
            },
        ]
