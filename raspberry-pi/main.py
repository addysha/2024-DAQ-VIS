import csv
import random
import argparse
from datetime import date
from paho.mqtt import client as mqtt_client


""" GLOBAL VARIABLES
Set the Parameter of MQTT Broker Connection
Set the address, port and topic of MQTT Broker connection. 
At the same time, we call the Python function random.randint 
to randomly generate the MQTT client id.
"""
broker = "3.107.68.65"
port = 1883
topic = "/wesmo-data"
client_id = f"wesmo-{random.randint(0, 100)}"
username = "wesmo"
password = "public"


def text_to_csv(input_file, output_file):
    """_summary_
    Converts CAN string messages to csv fomatted data.
    Using input file 'test_data.txt' and output file 'test_csv_data.csv'
        Args:
            input_file (str): The txt file containing CAN messages.
            output_file (str): The file to write the csv formatted data.
    """
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


def connect_mqtt() -> mqtt_client:
    """_summary_
    Connects to the MQTT broker and returns the client object.
    The MQTT broker is hosted on an AWS EC2 instance.
        Returns:
            mqtt_client: The publisher object connected to the AWS broker
    """

    def on_connect(client, userdata, flags, reason_code, properties=None):
        if reason_code != 0:
            print("Failed to connect, return code %d\n", reason_code)

    client = mqtt_client.Client(mqtt_client.CallbackAPIVersion.VERSION2, client_id)
    client.username_pw_set(username, password)
    client.on_connect = on_connect
    client.connect(broker, port)
    return client


def subscribe(client: mqtt_client):
    """_summary_
    Subscribes to the CAN messages using MQTT.
    Print out any received messages to the console and to a text file.
        Args:
            client (mqtt_client): The publisher object connected to the AWS broker.
    """

    def on_message(client, userdata, msg):
        can_msg = msg.payload.decode()
        print(can_msg)
        with open(f"data/{date.today()}-data.txt", "a") as writer:
            if can_msg is not None:
                writer.write(can_msg)
                writer.write("\n")

        writer.close()

    client.subscribe(topic)
    client.on_message = on_message


def main():
    """Main function to run the script as a reciever device.

    The script can be run with the following command line arguments:
    -c, --convert: Convert the input file to CSV format.
    -i, --input_file: The file containing the CAN messages.
    -o, --output_file: The file to write the CSV formatted data.
    -s, --subscribe: Subscribe to CAN messages using MQTT.
    """

    parser = argparse.ArgumentParser(
        description="Converts CAN string messages to CSV formatted data."
    )
    parser.add_argument(
        "-c",
        "--convert",
        action="store_true",
        help="Convert the input file to CSV format",
    )
    parser.add_argument(
        "-i", "--input_file", help="The file containing the CAN messages"
    )
    parser.add_argument(
        "-o", "--output_file", help="The file to write the CSV formatted data"
    )
    parser.add_argument(
        "-s",
        "--subscribe",
        action="store_true",
        help="Subscribe to CAN messages using MQTT",
    )

    args = parser.parse_args()

    if args.convert and args.subscribe:
        print(
            "Error: Cannot use both -c/--convert and -s/--subscribe options at the same time."
        )
        exit(1)
    elif args.convert:
        if not args.input_file or not args.output_file:
            print(
                "Error: Please provide both input_file and output_file when using -c/--convert option."
            )
            exit(1)
        text_to_csv(args.input_file, args.output_file)
    elif args.subscribe:
        client = connect_mqtt()
        subscribe(client)
        client.loop_forever()
    else:
        print("Error: Please specify either -c/--convert or -s/--subscribe option.")
        exit(1)


if __name__ == "__main__":
    main()
