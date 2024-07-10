def flip_byte_pair(pair):
    """Flips the order of bytes in a hex pair."""
    return pair[2:] + pair[:2]


def hex_to_decimal(hex_str):
    """Converts a hex string to a list of decimal integers."""
    decimal_values = []
    for i in range(0, len(hex_str), 2):
        hex_pair = hex_str[i : i + 2]
        decimal_value = int(hex_pair, 16)
        decimal_values.append(decimal_value)
    return decimal_values


def flip_and_convert_payloads(csv_file):
    """Reads a CSV file and flips/converts data payloads, including ID."""
    payloads_with_ids = {}

    with open(csv_file, "r", newline="") as file:
        reader = csv.DictReader(file)
        for row in reader:
            data_payload_hex = row["Data Payload"]
            bytes_pairs = [
                data_payload_hex[i : i + 2] for i in range(0, len(data_payload_hex), 2)
            ]

            payload_decimal = []
            for pair in bytes_pairs[:4]:
                flipped_pair = flip_byte_pair(pair)
                decimal_values = hex_to_decimal(flipped_pair)
                payload_decimal.extend(decimal_values)

            payload_tuple = tuple(payload_decimal)
            payload_id = int(row["ID"], 16)

            if payload_tuple not in payloads_with_ids:
                payloads_with_ids[payload_tuple] = payload_id

    return payloads_with_ids


def convert_motor_controller_payloads(csv_file):
    try:
        with open(csv_file, "r", newline="") as file:
            reader = csv.DictReader(file)
            print("----- Motor Controller Data -----")
            for row in reader:

                payload_id = int(row["ID"])
                data_bytes = row["Data Payload"].split(" ")
                if len(data_bytes) >= 8:

                    if payload_id == 181:
                        # TX PDO 1
                        print(
                            f"Status Word:\t\t\t{int(data_bytes[1]+ data_bytes[2], 16)}"
                        )
                        print(
                            f"Position Actual Value:\t{int(data_bytes[4] + data_bytes[5] + data_bytes[2] + data_bytes[3], 16)}"
                        )
                        print(
                            f"Torque Actual Value:\t{int(data_bytes[7] + data_bytes[6], 16)}"
                        )

                    elif payload_id == 281:
                        # TX PDO 2
                        print(f"Controller Temp:\t\t{int(data_bytes[0], 16)}")
                        print(f"Motor Temp:\t\t\t\t{int(data_bytes[1], 16)}")
                        print(
                            f"DC Link Voltage:\t\t{int(data_bytes[3] + data_bytes[2], 16)}"
                        )
                        print(
                            f"Supply Voltage:\t\t\t{int(data_bytes[5] + data_bytes[4], 16)}"
                        )
                        print(
                            f"Current Demand:\t\t\t{int(data_bytes[7] + data_bytes[6], 16)}"
                        )

                    elif payload_id == 381:
                        # TX PDO 3
                        print(
                            f"Motor Current Actual Value:\t{int(data_bytes[1] + data_bytes[0], 16)}"
                        )
                        print(
                            f"Electric Angle:\t\t\t{int(data_bytes[3] + data_bytes[2], 16)}"
                        )
                        print(
                            f"Phase A Current:\t\t{int(data_bytes[5] + data_bytes[4], 16)}"
                        )
                        print(
                            f"Phase B Demand:\t\t{int(data_bytes[7] + data_bytes[6], 16)}"
                        )
                    else:
                        continue
                else:
                    continue
    except Exception as e:
        print("Error : " + e)
