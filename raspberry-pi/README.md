# Raspberry Pi Telemetry System 2024

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