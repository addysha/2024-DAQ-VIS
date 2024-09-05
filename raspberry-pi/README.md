# Raspberry Pi Telemetry System 2024

## Running Raspberry Pi Telemetry
To collect CAN bus data run the `rpi-main.py` script on the WESMO Raspberry Pi.
This should connect the Pi to the AWS MQTT Broker and begin transmitting an CAN Bus messaged recieved.

## Running Telemetry Reciever Device
To collect telemetry data run the `main.py` script. The script can be run with the following command line arguments:
    -c, --convert: Convert the input file to CSV format. Convert must be used with:
        -i, --input_file: The file containing the CAN messages.
        -o, --output_file: The file to write the CSV formatted data.
    -s, --subscribe: Subscribe to CAN messages using MQTT. Output can messages to console and to a txt file with todays date.

## CAN Bus
The can bus for the raspberry pi is a 2-CH CAN HAT. The links for each hat is set up on system start up.
The development plan for the telemetry system is a single channel in the EV vehicle. For testing purposes
both can ports will be setup and used.

### Recieving CAN Data
The timeout for reading a single can message is measured in seconds. If a timeout of **0.0** is a non-blocking 
message. Meaning it returns immediately with or without a message from a can bus. It is preferable to use a 
non-blocking message for real time data.
 

### CAN Message
#### __str__()

The fields in the printed message are (in order):
1. Timestamp
2. Arbitration ID
3. Flags
4. Data length (DL)
5. Data

The flags field is represented as one, two or three letters:
1. X if the is_extended_id attribute is set, otherwise S,
2. E if the is_error_frame attribute is set,
3. R if the is_remote_frame attribute is set.

The arbitration ID field is represented as either a four or eight digit hexadecimal number depending on the length of the arbitration ID (11-bit or 29-bit). Each of the bytes in the data field (when present) are represented as two-digit hexadecimal numbers.