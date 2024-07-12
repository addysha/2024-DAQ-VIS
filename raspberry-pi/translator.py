import re
import canmatrix.formats
import datetime


def load_dbc(dbc_file_path):
    try:
        db_dict = canmatrix.formats.loadp(dbc_file_path)
        if isinstance(db_dict, dict):
            db = next(iter(db_dict.values()))
            print("DBC file loaded successfully.")
            return db
        else:
            print("Error: Could not load DBC file properly.")
            return None
    except Exception as e:
        print(f"Error loading DBC file: {e}")
        return None


def decode_can_string(can_data):
    can_data = can_data.split()
    dl = int(can_data[7])

    values = [
        can_data[1],
        can_data[3],
        str(dl),
        "".join(can_data[8 : 8 + dl]),
        can_data[8 + dl + 1],
    ]
    return values


def decode_mc_pdo_4(can_data):
    if len(can_data) != 16 and len(can_data) != 14:
        print(f"Invalid PDO 4 message length {can_data}")

    torque_regulator = int(can_data[1] + can_data[0], 16)
    flux_regulator_count = int(can_data[3] + can_data[2], 16)
    if len(can_data) == 14:
        velocity_actual_value = int(can_data[6] + can_data[5] + can_data[4], 16)
    else:
        velocity_actual_value = int(
            can_data[7] + can_data[6] + can_data[5] + can_data[4], 16
        )

    return [
        f"torque regulator: {torque_regulator}",
        f"flux regulator count: {flux_regulator_count}",
        f"velocity actual value: {velocity_actual_value}",
    ]


def decode_mc_pdo_3(can_data):
    if len(can_data) != 12 and len(can_data) != 16:
        print(f"Invalid PDO 3 message length {can_data}")

    motor_current_actual = int(can_data[1] + can_data[0], 16)
    electrical_angle = int(can_data[3] + can_data[2], 16)
    phase_a_current = int(can_data[5] + can_data[4], 16)

    data = [
        f"motor current actual: {motor_current_actual}",
        f"electrical angle: {electrical_angle}",
        f"phase a current: {phase_a_current}",
    ]

    if len(can_data) == 16:
        phase_b_current = int(can_data[7] + can_data[6], 16)
        data += [f"phase b current: {phase_b_current}"]

    return data


def decode_mc_pdo_2(can_data):
    if len(can_data) != 16:
        print(f"Invalid PDO 2 message length {can_data}")

    controller_temp = int(can_data[0], 16)
    motor_temp = int(can_data[1], 16)
    DC_link_circuit_voltage = int(can_data[3] + can_data[2], 16)
    logic_power_supply_voltage = int(can_data[5] + can_data[4], 16)
    current_demand = int(can_data[7] + can_data[6], 16)

    return [
        f"controller temp: {controller_temp}",
        f"motor temp: {motor_temp}",
        f"DC link circuit voltage: {DC_link_circuit_voltage}",
        f"logic power supply voltage: {logic_power_supply_voltage}",
        f"current demand: {current_demand}",
    ]


def decode_mc_pdo_1(can_data):
    if len(can_data) != 16:
        print(f"Invalid PDO 1 message length {can_data}")

    status_word = int(can_data[1] + can_data[0], 16)
    position_actual_value = int(
        can_data[5] + can_data[4] + can_data[3] + can_data[2], 16
    )
    torque_actual_value = int(can_data[7] + can_data[6], 16)

    return [
        f"status word: {status_word}",
        f"position actual: {position_actual_value}",
        f"torque actual: {torque_actual_value}",
    ]


def main():
    decoded_can = []
    with open("data/can_str_test.txt", "r") as can_input_file:
        can_data = can_input_file.read()
        can_data = can_data.split("\n")
        for line in can_data:
            can_data = decode_can_string(line)
            data = [f"time: {datetime.datetime.fromtimestamp(float(can_data[0]))}"]

            if can_data[1] == "0181":
                data += decode_mc_pdo_1(can_data[3])
            elif can_data[1] == "0281":
                data += decode_mc_pdo_2(can_data[3])
            elif can_data[1] == "0381":
                data += decode_mc_pdo_3(can_data[3])
            elif can_data[1] == "0481":
                data += decode_mc_pdo_4(can_data[3])
            else:
                continue
            decoded_can.append(data)

        can_input_file.close()

    # Eventually load into a db
    for data in decoded_can:
        print(data)

    # wont work for the motor controller due to the PDO formatting
    # db = cantools.database.load_file("motor_controller.dbc")
    # for message in db.messages:
    #     print(db.decode_message(message.id, message.data))


if __name__ == "__main__":
    main()
