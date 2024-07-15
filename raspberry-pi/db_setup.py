import psycopg2
import datetime
from MCTranslator_Class import MCTranslator

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
    info = data[1].split(":")
    time = data[0].split(" ")
    query = f"""INSERT INTO MOTOR_CONTROLLER(
    TIME, PDO, NAME, VALUE, UNIT)
    VALUES ('{time[1]+" "+time[2]}', {pdo}, '{info[0]}', {info[1]}, '{unit}')"""

    try:
        cursor.execute(query)
        conn.commit()

    except Exception as e:
        conn.rollback()
        print(f"Error in saving to database: {e}")


def test_db(cursor, conn):
    with open("data/db_test_data.txt", "r") as can_input_file:
        can_data = can_input_file.read()
        can_data = can_data.split("\n")
        for line in can_data:
            can_data = mc_translator.decode_can_string(line)
            data = mc_translator.decode_pdo(can_data, 2)
            save_to_db(cursor, conn, data, 2, "C")


def main():
    cursor, conn = connect_db()
    # setup_db(cursor)
    # create_mc_table(cursor, conn)
    test_db(cursor, conn)
    conn.close()


if __name__ == "__main__":
    main()


### POSTGRES COMMANDS
# \l - list databases
# \c wesmo - connect to database
# \dt - list tables
# \d motor_controller - describe table
# SELECT * FROM motor_controller; - show all rows in table
# \q - quit
