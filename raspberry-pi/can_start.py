#!/usr/bin/env python3
"""_summary_
    Python3 script to set up and run the Raspberry Pi for CAN Bus telemetry
    Developer: Hannah Murphy
    Organisation: WESMO 2024
"""
import os
import can
from can.exceptions import CanInitializationError


def create_devices():
    try:
        os.system("sudo ip link set can0 type can bitrate 500000")
        os.system("sudo ifconfig can0 up")
        global can0
        can0 = can.interface.Bus(channel="can0", bustype="socketcan")

        print("Setup complete for can devices: can0")
        return can0

    except CanInitializationError as e:
        print(f"Failed to initialize CAN bus: {e.message}")
        if e.error_code is not None:
            print(f"Error code: {e.error_code}")
    except Exception as e:
        print("Failure to set up can devices:", e)
        return False


def shutdown():
    try:
        os.system("sudo ifconfig can0 down")
        print("Shutdown complete for can devices: can0")
        return True
    except Exception as e:
        print("Failure to shutdown can devices:", e)
        return False


def log_message(msg, csv_logger):
    csv_logger.on_message_received(msg)
    # For live logging to console
    # print(msg)


# Main loop
def main():
    shutdown()
    can0 = create_devices()

    if not can0:
        print("Beginning shutdown process")
        shutdown()

    print("Initilising logging loop for can0")

    log_file = "data/can_log.csv"
    csv_logger = can.CSVWriter(log_file, append=True)

    listener = can.Listener()
    listener.on_message_received = log_message
    notifier = can.Notifier(can0, [listener])

    print("Logging CAN bus messages. Press Ctrl+C to stop.")

    try:
        # Keep the script running to log messages indefinitely
        while True:
            pass
    except KeyboardInterrupt:
        print("Stopping logging...")

    notifier.stop()
    csv_logger.stop()

    print(f"Messages logged to {log_file}")


if __name__ == "__main__":
    main()
