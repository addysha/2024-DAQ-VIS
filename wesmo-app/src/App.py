from flask import Flask, request
from flask_socketio import SocketIO
import time
import datetime
from dummy_data import DummySensorData

app = Flask(__name__)
socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")

historical_data = {
    "Battery State of Charge": [],
    "Motor Temperature": [],
}


def create_data():
    return [
        DummySensorData("Motor Temperature", 60, 0, 100, "C"),
        DummySensorData("Battery Temperature", 47, 0, 60, "C"),
        DummySensorData("Motor Speed", 3654, 1500, 4700, "RPM"),
        DummySensorData("Battery State of Charge", 90, 0, 100, "%"),
        DummySensorData("Battery Voltage", 286, 216, 300, "V"),
        DummySensorData("Battery Current", 269, 0, 300, "A"),
        DummySensorData("Suspension Travel", 48, 0, 78, "mm"),
        DummySensorData("Pedal Angle 1", 50, 0, 100, "%"),
        DummySensorData("Pedal Angle 2", 47, 0, 100, "%"),
        DummySensorData("Track Time", 0, 0, 1000, "s"),
        DummySensorData("Wheel Speed LF", 2245, 0, 10000, "RPM"),
        DummySensorData("Wheel Speed RF", 3654, 1500, 4700, "RPM"),
        DummySensorData("Wheel Speed LB", 3654, 1500, 4700, "RPM"),
        DummySensorData("Wheel Speed RB", 3654, 1500, 4700, "RPM"),
        DummySensorData("Warnings", 0, 0, 4, "System Faults"),
        DummySensorData("Break Pressure Front", 6000, -100, 8000, "kPa"),
        DummySensorData("Break Pressure Rear", 5189, -100, 8000, "kPa"),
        DummySensorData("High Voltage", 0, 0, 1, ""),
        DummySensorData("Vehicle Errors", "Error", 0, 0, ""),
        DummySensorData("Predictive State of Charge", 45, 0, 100, "%"),
    ]


def generate_data(sensors):
    sensors[0].update_value_step(step=1)  # motor_temp
    sensors[1].update_value_step(step=3)  # battery_temp
    sensors[2].update_value_step(step=20)  # motor_speed
    sensors[3].update_value_decreasing(step=5)  # battery_soc
    sensors[4].update_value_step(step=5)  # battery_voltage
    sensors[5].update_value_step(step=5)  # battery_current
    sensors[6].update_value_step(step=3)  # suspension_travel
    sensors[7].update_value_step(step=7)  # pedal_angle_1
    sensors[8].update_value_step(step=7)  # pedal_angle_2
    sensors[9].update_value_increasing(step=1)  # track_time
    sensors[10].update_value_step(step=150)  # wheel_speed
    sensors[11].update_value_step(step=150)  # wheel_speed1
    sensors[12].update_value_step(step=150)  # wheel_speed2
    sensors[13].update_value_step(step=150)  # wheel_speed3
    sensors[14].update_fault_data()  # warnings
    sensors[15].update_value_step(step=100)  # break_pressure_front
    sensors[16].update_value_step(step=100)  # break_pressure_rear
    sensors[17].update_value_boolean()  # high_voltage
    sensors[18].update_string()  # error
    sensors[19].update_value_step(step=3)  # predict_charge

    log_data(sensors)


def log_data(sensors):
    timestamp = datetime.datetime.now().strftime("%s")
    historical_data["Battery State of Charge"].append(
        {"timestamp": timestamp, "value": sensors[3].value}
    )
    historical_data["Motor Temperature"].append(
        {"timestamp": timestamp, "value": sensors[0].value}
    )


@socketio.on("testing")
def handle_testing():
    sensors = create_data()
    while True:
        # generate_data(sensors)
        socketio.emit("data", [sensor.to_dict() for sensor in sensors], to=request.sid)
        time.sleep(1)


@socketio.on("history")
def handle_history():
    socketio.emit("historic_data", historical_data, to=request.sid)


@socketio.on("update_clients")
def handle_update_clients():
    sensors = create_data()
    generate_data(sensors)
    socketio.emit("data", [sensor.to_dict() for sensor in sensors])


@socketio.on("connect")
def handle_connect():
    print(f"User connected!")


@socketio.on("disconnect")
def handle_disconnect():
    print(f"User disconnected!")


if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
