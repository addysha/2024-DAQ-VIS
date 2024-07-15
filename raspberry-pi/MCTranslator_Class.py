import datetime


class MCTranslator:
    def __init__(self):
        pass

    def decode_can_string(self, can_data):
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

    def decode_mc_pdo_4(self, can_data):
        if len(can_data) != 16 and len(can_data) != 14:
            print(f"Invalid PDO 4 message length {can_data}")

        torque_regulator = int(can_data[2:4] + can_data[0:2], 16)
        flux_regulator_count = int(can_data[6:8] + can_data[4:6], 16)
        if len(can_data) == 14:
            velocity_actual_value = int(
                can_data[12:14] + can_data[10:12] + can_data[8:10], 16
            )
        else:
            velocity_actual_value = int(
                can_data[16:14] + can_data[12:14] + can_data[10:12] + can_data[8:10], 16
            )

        return [
            f"torque regulator: {torque_regulator}",
            f"flux regulator count: {flux_regulator_count}",
            f"velocity actual value: {velocity_actual_value}",
        ]

    def decode_mc_pdo_3(self, can_data):
        if len(can_data) != 12 and len(can_data) != 16:
            print(f"Invalid PDO 3 message length {can_data}")

        motor_current_actual = int(can_data[2:4] + can_data[0:2], 16)
        electrical_angle = int(can_data[6:8] + can_data[4:6], 16)
        phase_a_current = int(can_data[10:12] + can_data[8:10], 16)

        data = [
            f"motor current actual: {motor_current_actual}",
            f"electrical angle: {electrical_angle}",
            f"phase a current: {phase_a_current}",
        ]

        if len(can_data) == 16:
            phase_b_current = int(can_data[16:14] + can_data[12:14], 16)
            data += [f"phase b current: {phase_b_current}"]

        return data

    def decode_mc_pdo_2(self, can_data):
        if len(can_data) != 16:
            print(f"Invalid PDO 2 message length {can_data}")

        controller_temp = int(can_data[0:2], 16)
        motor_temp = int(can_data[2:4], 16)
        DC_link_circuit_voltage = int(can_data[6:8] + can_data[4:6], 16)
        logic_power_supply_voltage = int(can_data[10:12] + can_data[8:10], 16)
        current_demand = int(can_data[16:14] + can_data[12:14], 16)
        return [
            f"controller temp:{controller_temp}",
            f"motor temp:{motor_temp}",
            f"DC link circuit voltage:{DC_link_circuit_voltage}",
            f"logic power supply voltage:{logic_power_supply_voltage}",
            f"current demand:{current_demand}",
        ]

    def decode_mc_pdo_1(self, can_data):
        if len(can_data) != 16:
            print(f"Invalid PDO 1 message length {can_data}")

        status_word = int(can_data[0:2] + can_data[2:4], 16)
        position_actual_value = int(
            can_data[10:12] + can_data[8:10] + can_data[6:8] + can_data[4:6], 16
        )
        torque_actual_value = int(can_data[16:14] + can_data[12:14], 16)

        return [
            f"status word: {status_word}",
            f"position actual: {position_actual_value}",
            f"torque actual: {torque_actual_value}",
        ]

    def decode_pdo(self, can_data, pdo=None):

        data = [f"time: {datetime.datetime.fromtimestamp(float(can_data[0]))}"]

        if can_data[1] == "0181" and pdo == 1:
            data += self.decode_mc_pdo_1(can_data[3])
        elif can_data[1] == "0281" and pdo == 2:
            data += self.decode_mc_pdo_2(can_data[3])
        elif can_data[1] == "0381" and pdo == 3:
            data += self.decode_mc_pdo_3(can_data[3])
        elif can_data[1] == "0481" and pdo == 4:
            data += self.decode_mc_pdo_4(can_data[3])

        print(data)
        return data
