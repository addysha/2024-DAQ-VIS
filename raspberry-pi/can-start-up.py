#!/usr/bin/env python3
"""_summary_
    Python3 script to set up and run the Raspberry Pi for CAN Bus telemetry
    Developer: Hannah Murphy
    Organisation: WESMO 2024
"""
import os
import can


def create_devices():
    os.system("sudo ip link set can0 type can bitrate 100000")
    os.system("sudo ip link set can1 type can bitrate 100000")
    os.system("sudo ipconfig can0 up")
    os.system("sudo ipconfig can1 up")
    global can0
    global can1
    can0 = can.interface.Bus(channel="can0", bustype="socketcan")
    can1 = can.interface.Bus(channel="can0", bustype="socketcan")


def shutdown():
    os.system("sudo ifconfig can0 down")
    os.system("sudo ifconfig can1 down")


"""
    Can send message process
msg = can.Message(is_extended_id=False, arbutration_id=0x123, data=[0,1,2,3,4,5,6,7])
can0.send(msg)
can1.send(msg)

    Can recieve message process
timeout = 10.0
msg = can0.recv(timeout)
msg = can1.recv(timeout)
if msg is None:
    print('Timeout occured, no message.')

"""


# Main loop
def main():
    create_devices()

    shutdown()


if __name__ == "__main__":
    main()
