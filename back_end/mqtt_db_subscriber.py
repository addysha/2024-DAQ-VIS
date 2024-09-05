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
client_list = []

### Translators
mc_translator = MCTranslator()


"""
        POSTGRESQL
"""


def start_postgresql():
    conn = psycopg2.connect(
        database="postgres",
        user="hannah",
        password="password",
        host="127.0.0.1",
        port="5432",
    )
    conn.autocommit = True
    cursor = conn.cursor()

    return cursor, conn


def connect_to_db():
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
    cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'wesmo'")
    exists = cursor.fetchone()
    if not exists:
        cursor.execute("CREATE DATABASE wesmo")
        print(" # - Database created successfully")
    print(" # - Database already exists")


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
    print(" # - Motor Controller table created successfully")
    conn.commit()


def save_to_db(cursor, conn, data, pdo, unit=None):
    if len(data) < 2:
        return
    time = data[0].split(" ")
    for value in data[2:]:
        query = f"""INSERT INTO MOTOR_CONTROLLER(
        TIME, PDO, NAME, VALUE, UNIT)
        VALUES ('{time[1]+" "+time[2]}', {pdo}, '{value["name"]}', {value["value"]}, '{unit}')"""
        try:
            cursor.execute(query)
            conn.commit()

        except Exception as e:
            conn.rollback()
            print(f" # - Error in saving to database: {e}")


def query_data(data_name):
    if data_name == "Motor Temperature":  #  or data_name == "Motor Speed"
        query = "SELECT time, value from MOTOR_CONTROLLER where name == 'motor temp'"
    else:
        print(" # - ERROR")

    cursor.execute(query)
    return cursor.fetchall()


"""
        MQTT
"""


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
        # Timestamp: 1718756828.377694        ID: 0201    S Rx                DL:  8    0f 00 00 00 00 00 36 00     Channel: can0

        raw_data = msg.payload.decode()
        if raw_data != "None":
            # Motor Controller
            if (
                "ID: 0181" in raw_data
                or "ID: 0281" in raw_data
                or "ID: 0381" in raw_data
                or "ID: 0481" in raw_data
            ):
                # decode
                data = mc_translator.decode(raw_data)

                if data:
                    # store
                    save_to_db(cursor, conn, data, data[1])

    client.subscribe(topic)
    client.on_message = on_message


def start_mqtt_subscriber():
    # Connect & Set up database
    global cursor, conn
    cursor, conn = start_postgresql()
    setup_db(cursor)
    cursor, conn = connect_to_db()
    create_mc_table(cursor, conn)

    # Set up MQTT communications
    client = connect_mqtt()
    subscribe(client)
    client.loop_forever()
