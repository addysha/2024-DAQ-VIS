from flask import Flask, request
from flask_socketio import SocketIO
import time
from dummy_data import DummySensorData


app = Flask(__name__)
socketio = SocketIO(app, logger=True, engineio_logger=True, cors_allowed_origins="*")


@app.route("/")
def index():
    return "Flask server is running."


def create_data():
    motor_temp = DummySensorData("Motor Temperature", 60, 0, 100, "C")
    battery_temp = DummySensorData("Battery Temperature", 47, 0, 60, "C")
    motor_speed = DummySensorData("Motor Speed", 3654, 1500, 4700, "RPM")
    battery_soc = DummySensorData("Battery State of Charge", 90, 0, 100, "%")
    battery_voltage = DummySensorData("Battery Voltage", 286, 216, 300, "V")
    battery_current = DummySensorData("Battery Current", 269, 0, 300, "A")
    suspension_travel = DummySensorData("Suspension Travel", 48, 0, 78, "mm")
    pedal_angle_1 = DummySensorData("Pedal Angle 1", 50, 0, 100, "%")
    pedal_angle_2 = DummySensorData("Pedal Angle 2", 47, 0, 100, "%")
    track_time = DummySensorData("Track Time", 0, 0, 1000, "s")
    wheel_speed = DummySensorData("Wheel Speed", 2245, 0, 10000, "RPM")
    warnings = DummySensorData("Warnings", 0, 0, 4, "System Faults")
    break_pressure_front = DummySensorData(
        "Break Pressure Front", 6000, -100, 8000, "kPa"
    )
    break_pressure_rear = DummySensorData(
        "Break Pressure Rear", 5189, -100, 8000, "kPa"
    )
    high_voltage = DummySensorData("High Voltage", 0, 0, 1, "")

    return [
        motor_temp,
        battery_temp,
        motor_speed,
        battery_soc,
        battery_voltage,
        battery_current,
        suspension_travel,
        pedal_angle_1,
        pedal_angle_2,
        track_time,
        wheel_speed,
        warnings,
        break_pressure_front,
        break_pressure_rear,
        high_voltage,
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
    sensors[11].update_fault_data()  # warnings
    sensors[12].update_value_step(step=100)  # break_pressure_front
    sensors[13].update_value_step(step=100)  # break_pressure_rear
    sensors[14].update_value_boolean()  # high_voltage


@socketio.on("testing")
def handle_register():
    sensors = create_data()
    while True:
        # generate_data(sensors)
        socketio.emit("data", [sensor.to_dict() for sensor in sensors], to=request.sid)
        time.sleep(1)


@socketio.on("update_clients")
def handle_request():
    socketio.emit("data", generate_data())


@socketio.on("connect")
def handle_connect():
    pass
    print(f"User connected!")


@socketio.on("disconnect")
def handle_disconnect():
    pass
    print(f"User disconnected!")


if __name__ == "__main__":
    socketio.run(app, debug=True, port=5000)
