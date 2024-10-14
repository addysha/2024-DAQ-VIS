#!/bin/bash
# File: startup.sh
# Author: Hannah Murphy
# Date: 2024-09-14
# Description: Boots up the Raspberry Pi with the correct scripts running within a virtual enviroment.
#
# Copyright (c) 2024 WESMO. All rights reserved.
# This script is part of the WESMO Data Acquisition and Visualisation Project.
#
# Usage: ./startup.sh (but should run automatically)

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

cd "$SCRIPT_DIR"

VENV_DIR="venv"

if [ ! -d "$VENV_DIR" ]; then
	echo "Creating virtual envrioment..."
	python3 -m venv $VENV_DIR
fi

echo "Activating virtual enviroment..."
source $VENV_DIR/bin/activate

pip install -r requirements.txt

echo "Running rpi_main script..."

python3 -u rpi_main.py