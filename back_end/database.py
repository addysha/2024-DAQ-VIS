"""
File: database.py
Author: Hannah Murphy
Date: 2024
Description: Run by the main app server, contains all PostgreSQL relevent methods.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

"""

import psycopg2


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


def setup_db(cursor, conn):
    try:
        cursor.execute("SELECT 1 FROM pg_catalog.pg_database WHERE datname = 'wesmo'")
        exists = cursor.fetchone()
        if not exists:
            cursor.execute("CREATE DATABASE wesmo")
            print(" # - Database created successfully")
        print(" # - Database already exists")
    except Exception as e:
        conn.rollback()
        print(" -! # Error creating database - wesmo")


def create_mc_table(cursor, conn):
    try:
        cursor.execute("DROP TABLE IF EXISTS MOTOR_CONTROLLER")

        sql = """CREATE TABLE MOTOR_CONTROLLER(
            TIME TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Auto-filled timestamp,
            PDO INT,
            NAME CHAR(50),
            VALUE INT,
            UNIT CHAR(25),
            MAX CHAR(25)
        )"""

        cursor.execute(sql)
        print(" # - Motor Controller table created successfully")
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(" -! # Error creating table - Motor Contoller")


def create_vcu_table(cursor, conn):
    try:
        cursor.execute("DROP TABLE IF EXISTS VEHICLE_CONTROLL_UNIT")

        sql = """CREATE TABLE VEHICLE_CONTROLL_UNIT(
            TIME TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Auto-filled timestamp,
            NAME CHAR(50),
            VALUE INT,
            UNIT CHAR(25),
            MAX CHAR(25)
        )"""

        cursor.execute(sql)
        print(" # - Vehicle Control Unit table created successfully")
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(" -! # Error creating table - Vehicle Control Unit")


def create_bms_table(cursor, conn):
    try:
        cursor.execute("DROP TABLE IF EXISTS BATTERY_MANAGEMENT_SYSTEM")

        sql = """CREATE TABLE BATTERY_MANAGEMENT_SYSTEM(
            TIME TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,  -- Auto-filled timestamp,
            NAME CHAR(50),
            VALUE INT,
            UNIT CHAR(25),
            MAX CHAR(25)
        )"""

        cursor.execute(sql)
        print(" # - Battery Management System table created successfully")
        conn.commit()
    except Exception as e:
        conn.rollback()
        print(" -! # Error creating table - Battery Management System")


def save_to_db_mc(cursor, conn, data, pdo):
    from mqtt_subscriber import cache_data

    if len(data) < 2:
        return
    time = data[0].split(" ")

    for value in data[2:]:
        query = f"""INSERT INTO MOTOR_CONTROLLER(
        TIME, PDO, NAME, VALUE, UNIT, MAX)
        VALUES ('{time[1]+" "+time[2]}', {pdo}, '{value["name"]}', {value["value"]}, '{value["unit"]}', '{value["max"]}')"""
        try:
            cursor.execute(query)
            conn.commit()
        except Exception as e:
            conn.rollback()
            print(f" -! # Error in saving to database - Motor Controller Table : {e}")

        cache_data(time, value)


def save_to_db_vcu(cursor, conn, data):
    from mqtt_subscriber import cache_data

    if len(data) < 2:
        return
    time = data[0].split(" ")
    for value in data[1:]:
        if value["name"] != "Track Time":
            query = f"""INSERT INTO VEHICLE_CONTROLL_UNIT(
            TIME, NAME, VALUE, UNIT, MAX)
            VALUES ('{time[1]+" "+time[2]}', '{value["name"]}', {value["value"]}, '{value["unit"]}', '{value["max"]}')"""
            try:
                cursor.execute(query)
                conn.commit()
            except Exception as e:
                conn.rollback()
                print(f" -! # Error in saving to database - VCU table: {e}")

        cache_data(time, value)


def save_to_db_bms(cursor, conn, data):
    from mqtt_subscriber import cache_data

    if len(data) < 2:
        return
    time = data[0].split(" ")
    for value in data[1:]:
        query = f"""INSERT INTO BATTERY_MANAGEMENT_SYSTEM(
        TIME, NAME, VALUE, UNIT, MAX)
        VALUES ('{time[1]+" "+time[2]}', '{value["name"]}', {value["value"]}, '{value["unit"]}', '{value["max"]}')"""
        try:
            cursor.execute(query)
            conn.commit()
        except Exception as e:
            conn.rollback()
            print(f" -! # Error in saving to database - BMS table: {e}")

        cache_data(time, value)
