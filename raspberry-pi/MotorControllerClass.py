class MotorController:
    def __init__(
        self,
        id,
        parametername,
        objecttype,
        datatype=None,
        accesstype=None,
        PDOmapping=None,
        subnumber=None,
        defaultvalue=None,
        lowlimit=None,
        highlimit=None,
        notes=None,
    ):
        self.id = id
        self.parametername = parametername
        self.objecttype = objecttype
        self.datatype = datatype
        self.accesstype = accesstype
        self.PDOmapping = PDOmapping
        self.subnumber = subnumber
        self.defaultvalue = defaultvalue
        self.lowlimit = lowlimit
        self.highlimit = highlimit
        self.notes = notes

    def __str__(self):
        return f"{self.id}:{self.parametername}"
