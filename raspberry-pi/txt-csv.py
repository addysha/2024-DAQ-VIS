import csv


def text_to_csv(input_file, output_file):
    csv_data = []
    headers = ["Timestamp", "ID", "Data Length", "Data Payload", "Channel"]
    csv_data.append(headers)

    with open(input_file, "r") as file:
        for line in file:
            if line.strip():
                parts = line.strip().split()
                timestamp = parts[1]
                id_ = parts[3]
                data_length_index = parts.index("DL:") + 1
                data_length = parts[data_length_index]
                data_payload_index = data_length_index + 1
                data_payload = " ".join(
                    parts[data_payload_index : data_payload_index + int(data_length)]
                )
                channel = parts[-1]

                csv_data.append([timestamp, id_, data_length, data_payload, channel])

    with open(output_file, "w", newline="") as csv_file:
        writer = csv.writer(csv_file)
        writer.writerows(csv_data)

    print(f'CSV file "{output_file}" has been created successfully.')


input_file = "data/test-data.txt"
output_file = "data/test-csv-data.csv"

text_to_csv(input_file, output_file)
