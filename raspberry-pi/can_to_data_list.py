import csv


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
            for pair in bytes_pairs[:4]:  # Only take the first 4 pairs
                flipped_pair = flip_byte_pair(pair)
                decimal_values = hex_to_decimal(flipped_pair)
                payload_decimal.extend(decimal_values)

            payload_tuple = tuple(payload_decimal)
            payload_id = int(row["ID"], 16)

            if payload_tuple not in payloads_with_ids:
                payloads_with_ids[payload_tuple] = payload_id

    return payloads_with_ids


def main():
    payloads_with_ids = flip_and_convert_payloads(data_file)

    sorted_payloads = sorted(payloads_with_ids.items(), key=lambda x: x[1])
    for payload, payload_id in sorted_payloads:
        formatted_entry = f"{payload_id} = {list(payload)}"
        print(formatted_entry)


data_file = "data/test_csv_data.csv"

# Casper's translations
enableMotor = [0x23, 0x0D, 0x20, 0x01, 0x00, 0x00, 0x00, 0x00]
disableMotor = [0x23, 0x0C, 0x20, 0x01, 0x00, 0x00, 0x00, 0x00]
setMotorSpeed = [0x23, 0x00, 0x20, 0x01, 0x00, 0x00, 0x00, 0x00]
zeroMessage = [0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00]

if __name__ == "__main__":
    main()
