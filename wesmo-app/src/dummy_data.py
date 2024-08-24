import random
import datetime
import json


## DATA CLASS FOR DUMMY DATA
class DummySensorData:
    def __init__(self, name, value, min_value, max_value, unit):
        self.name = name
        self.value = value
        self.min_value = min_value
        self.max_value = max_value
        self.unit = unit

    def update_value_step(self, step):
        self.value = generate_step_data(
            self.value, self.min_value, self.max_value, step
        )

    def update_value_decreasing(self, step):
        self.value = generate_decreasing_data(self.value, self.min_value, step)

    def update_value_increasing(self, step):
        self.value = generate_increasing_data(self.value, self.max_value, step)

    def to_dict(self):
        return {
            "name": self.name,
            "value": self.value,
            "min": self.min_value,
            "max": self.max_value,
            "unit": self.unit,
        }

    def to_json(self):
        return json.dumps(self.to_dict(), indent=4)


## GENERATION METHOD
def generate_step_data(prev, min_value, max_value, step):
    return max(min_value, min(prev + random.randint(-step, step), max_value))


def generate_decreasing_data(prev, min_value, step):
    return max(prev + random.randint(-step, 0), min_value)


def generate_increasing_data(prev, max_value, step):
    return min(max_value, prev + random.randint(0, step))
