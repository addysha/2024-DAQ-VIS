import cantools
import can


def main():
    db = cantools.database.load_file("dbc/bms.dbc")
    bms_message = db.get_message_by_name("MSGID_0X6B1")
    print(bms_message)

    print(bms_message.frame_id)  # 1713
    data = bms_message.encode(
        {
            "High_Temperature": 48,
            "Pack_Current": 3,
            "Pack_SOC": 80,
            "Pack_Inst_Voltage": 5,
            "Pack_kW_Power": 3,
            "Maximum_Pack_DCL": 12,
            "Failsafe_Statuses": 0,
            "CRC_Checksum": 0,
        }
    )  # b'0\x1e\xa02\x1e\x0c\x00\x00'
    print(data)
    message = can.Message(arbitration_id=bms_message.frame_id, data=data)
    print(
        message
    )  # Timestamp:        0.000000    ID: 000006b1    X Rx                DL:  8    30 1e a0 32 1e 0c 00 00
    print(
        db.decode_message(message.arbitration_id, message.data)
    )  # Returns correct method


if __name__ == "__main__":
    main()


# print(bms_message.signals)
# Signal(name, start, length, byte_order='little_endian', is_signed=False, raw_initial=None, raw_invalid=None, conversion=None, minimum=None, maximum=None, unit=None, dbc_specifics=None, comment=None, receivers=None, is_multiplexer=False, multiplexer_ids=None, multiplexer_signal=None, spn=None)
# signal('High_Temperature', 7, 8, 'big_endian', False, None, 1, 0, None, None, 'Celsius', False, None, None, None, None)
# signal('Pack_Current', 15, 8, 'big_endian', False, None, 0.1, 0, None, None, 'Amps', False, None, None, None, None)
# signal('Pack_SOC', 23, 8, 'big_endian', False, None, 0.5, 0, None, None, 'Percent', False, None, None, None, None)
# signal('Pack_Inst_Voltage', 31, 8, 'big_endian', False, None, 0.1, 0, None, None, 'Volts', False, None, None, None, None)
# signal('Pack_kW_Power', 39, 8, 'big_endian', False, None, 0.1, 0, None, None, 'kW', False, None, None, None, None)
# signal('Maximum_Pack_DCL', 47, 8, 'big_endian', False, None, 1, 0, None, None, 'Amps', False, None, None, None, None)
# signal('Failsafe_Statuses', 55, 8, 'big_endian', False, None, 1, 0, None, None, 'None', False, None, None, None, None)
# signal('CRC_Checksum', 63, 8, 'big_endian', False, None, 1, 0, None, None, 'None', False, None, None, None, None)
