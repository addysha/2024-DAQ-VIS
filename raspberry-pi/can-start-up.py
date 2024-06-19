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
        os.system("sudo ip link set can0 type can bitrate 500000")
        os.system("sudo ip link set can1 type can bitrate 500000")
        os.system("sudo ifconfig can0 up")
        os.system("sudo ifconfig can1 up")
        global can0
        global can1
        can0 = can.interface.Bus(channel="can0", bustype="socketcan")
        can1 = can.interface.Bus(channel="can0", bustype="socketcan")
        # This doesnt return a failure
        # RTNETLINK answers: Device or resource busy
        # RTNETLINK answers: Device or resource busy

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
    #shutdown()
    success = create_devices()

    if success:
        print("Initilising Loop")
        while True:
            msg0 = can0.recv(0.0)
            
            # Live printing
        #    if msg0 is not None:
        #        print(msg0)
        #    else:
        #        print("No message on can0")


            # Store in file
            with open("testing-output.txt", "a") as writer:
                if msg0 is not None:
                    writer.write('\n')
                    writer.write(str(msg0))
                    
            writer.close()
    else:
        print("Beginning shutdown process")
        shutdown()


if __name__ == "__main__":
    main()
