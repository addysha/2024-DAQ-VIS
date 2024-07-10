import re
import canmatrix
import canmatrix.formats
import pickle
import MotorControllerClass as mc


def load_dbc(dbc_file_path):
    try:
        db_dict = canmatrix.formats.loadp(dbc_file_path)
        if isinstance(db_dict, dict):
            db = next(iter(db_dict.values()))
            print("DBC file loaded successfully.")
            return db
        else:
            print("Error: Could not load DBC file properly.")
            return None
    except Exception as e:
        print(f"Error loading DBC file: {e}")
        return None


def get_mc_object(line):
    id = parametername = objecttype = datatype = accesstype = PDOmapping = subnumber = (
        defaultvalue
    ) = lowlimit = highlimit = notes = None
    data = line.split("\n")
    for i in range(len(data)):
        if data[i].startswith("["):
            id = data[i].strip("[]")
        elif data[i].startswith("ParameterName"):
            parametername = data[i].split("=")[1].strip()
        elif data[i].startswith("ObjectType"):
            objecttype = data[i].split("=")[1].strip()
        elif data[i].startswith("DataType"):
            datatype = data[i].split("=")[1].strip()
        elif data[i].startswith("AccessType"):
            accesstype = data[i].split("=")[1].strip()
        elif data[i].startswith("PDOMapping"):
            PDOmapping = data[i].split("=")[1].strip()
        elif data[i].startswith("SubNumber"):
            subnumber = data[i].split("=")[1].strip()
        elif data[i].startswith("DefaultValue"):
            defaultvalue = data[i].split("=")[1].strip()
        elif data[i].startswith("LowLimit"):
            lowlimit = data[i].split("=")[1].strip()
        elif data[i].startswith("HighLimit"):
            highlimit = data[i].split("=")[1].strip()
        elif data[i].startswith(";;"):
            notes = data[i]
        else:
            print(f"Error: Invalid parameter in EDS file. {data[i]}")
    mc_object = mc.MotorController(
        id,
        parametername,
        objecttype,
        datatype,
        accesstype,
        PDOmapping,
        subnumber,
        defaultvalue,
        lowlimit,
        highlimit,
        notes,
    )
    return mc_object


def add_to_db(mc_object):
    with open("mc_objects.pkl", "ab") as outp:
        pickle.dump(mc_object, outp, pickle.HIGHEST_PROTOCOL)


def main():
    mc_objects = []
    with open("eds/motor_controller.eds", "r") as eds_file:
        eds_data = eds_file.read()
        eds_data = eds_data.split("\n\n")
        for line in eds_data:
            if re.match(r"\[\d{3}\w\]", line) or re.match(r"\[\d{4}sub\d\]", line):
                obj = get_mc_object(line)
                mc_objects.append(obj)
        eds_file.close()

        print(f"Objects found: {len(mc_objects)}")

        with open("mc_objects.pkl", "wb") as outp:
            pickle.dump(mc_objects, outp, pickle.HIGHEST_PROTOCOL)

        # UNPICKLE THE OBJECT
        with open("mc_objects.pkl", "rb") as outp:
            mc_objects = pickle.load(outp)
            for obj in mc_objects:
                print(obj)

    # db = load_dbc("dbc/motor_controller.dbc")

    # if db:

    # can_data = read_can_file("raspberry-pi/data/can_str_test.txt")
    # Decode CAN messages using the DBC database
    # decoded_messages = decode_can_messages(can_data, db)

    # print(decoded_messages)
    # Print decoded messages
    # for message in decoded_messages:
    #     if message["name"] == "Receive_PDO_2_Mapping":
    #         print(message)


data_file = "data/test_csv_data.csv"

if __name__ == "__main__":
    main()
