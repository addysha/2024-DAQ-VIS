import random
import psycopg2
from paho.mqtt import client as mqtt_client
from MCTranslator_Class import MCTranslator


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

mc_translator = MCTranslator()


def connect_db():
    conn = psycopg2.connect(
        database="wesmo",
        user="hannah",
        password="password",
        host="127.0.0.1",
        port="5432",
    )
    conn.autocommit = True
    cursor = conn.cursor()

    return cursor, conn


def setup_db(cursor):
    sql = """CREATE database wesmo"""
    cursor.execute(sql)
    print("Database created successfully........")


def create_mc_table(cursor, conn):
    cursor.execute("DROP TABLE IF EXISTS MOTOR_CONTROLLER")

    sql = """CREATE TABLE MOTOR_CONTROLLER(
        TIME TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Auto-filled timestamp,
        PDO INT,
        NAME CHAR(50),
        VALUE INT,
        UNIT CHAR(25)
    )"""

    cursor.execute(sql)
    print("Motor Controller table created successfully........")
    conn.commit()


def save_to_db(cursor, conn, data, pdo, unit=None):
    if len(data) < 2:
        return
    time = data[0].split(" ")
    for val in data[2:]:
        info = val.split(":")
        query = f"""INSERT INTO MOTOR_CONTROLLER(
        TIME, PDO, NAME, VALUE, UNIT)
        VALUES ('{time[1]+" "+time[2]}', {pdo}, '{info[0]}', {info[1]}, '{unit}')"""
        try:
            cursor.execute(query)
            conn.commit()

        except Exception as e:
            conn.rollback()
            print(f"Error in saving to database: {e}")


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
        if can_msg != "None":
            data = mc_translator.decode(can_msg)
            if data:
                print(data)
                save_to_db(cursor, conn, data, data[1])

    client.subscribe(topic)
    client.on_message = on_message


def main():
global cursor, conn
cursor, conn = connect_db()

# setup_db(cursor)
# create_mc_table(cursor, conn)

client = connect_mqtt()
subscribe(client)
client.loop_forever()

conn.close()



if __name__ == "__main__":
    main()
