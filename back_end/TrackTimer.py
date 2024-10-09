"""
File: TrackTimer.py
Author: Hannah Murphy
Date: 2024
Description: The class which handles the track timer.

Copyright (c) 2024 WESMO. All rights reserved.
This code is part of the WESMO Data Acquisition and Visualisation Project.

"""

import time


class TrackTimer:
    def __init__(self):
        self.timer_started = False
        self.start_time = None

    def start_timer(self):
        if not self.timer_started:
            self.timer_started = True
            self.start_time = time.time()

    def reset_timer(self):
        print("resetting timer")
        self.timer_started = False
        self.start_time = None

    def check_timer(self, messages):
        if messages["messages"]["RTD_Switch_State"] == 0:
            if self.timer_started:
                elapsed_time = time.time() - self.start_time
                print(f"Car was running for {elapsed_time:.2f} seconds.")
            self.timer_started = False
            self.start_time = None

        if self.timer_started:
            elapsed_time = time.time() - self.start_time
            timer_display = self.format_elapsed_time(elapsed_time)
        else:
            timer_display = "00:00.00"
        return [{"name": "Track Time", "value": timer_display, "unit": "", "max": ""}]

    def format_elapsed_time(self, seconds):
        """Helper function to format elapsed time into a readable format."""
        milliseconds = int(str(seconds)[-2:])
        minutes, seconds = divmod(int(seconds), 60)
        return f"{minutes:02}:{seconds:02}.{milliseconds:02}"

    def update_timer(self):
        timer_display = "00:00.00"
        if self.start_time:
            elapsed_time = time.time() - self.start_time
            timer_display = self.format_elapsed_time(elapsed_time)

        return [{"name": "Track Time", "value": timer_display, "unit": "", "max": ""}]
