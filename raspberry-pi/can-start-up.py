#!/usr/bin/env python3
"""_summary_
    Python3 script to set up and run the Raspberry Pi for CAN Bus telemetry
    Developer: Hannah Murphy
    Organisation: WESMO 2024
"""
import os
import can


def create_devices():
    try:
        os.system("sudo ip link set can0 type can bitrate 100000")
        os.system("sudo ip link set can1 type can bitrate 100000")
        os.system("sudo ipconfig can0 up")
        os.system("sudo ipconfig can1 up")
        global can0
        global can1
        can0 = can.interface.Bus(channel="can0", bustype="socketcan")
        can1 = can.interface.Bus(channel="can0", bustype="socketcan")
        print("Setup complete for can devices: can0 and can1")
        return True
    except Exception as e:
        print("Failure to set up can devices:", e)
        return False


def shutdown():
    try:
        os.system("sudo ifconfig can0 down")
        os.system("sudo ifconfig can1 down")
        print("Shutdown complete for can devices: can0 and can1")
        return True
    except Exception as e:
        print("Failure to shutdown can devices:", e)
        return False


# Main loop
def main():
    success = create_devices()

    if success:
        print("Initilising Loop")
        while True:
            msg0 = can0.recv(0.0)
            msg1 = can1.recv(0.0)

            with open("testing-output.txt", "w") as writer:
                if msg0 is not None:
                    writer.write(msg0)
                if msg1 is not None:
                    writer.write(msg1)
            writer.close()
    else:
        print("Beginning shutdown process")
        shutdown()


if __name__ == "__main__":
    main()
