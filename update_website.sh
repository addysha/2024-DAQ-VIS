#!/bin/bash

# Define variables
WEB_DIR="/var/www/wesmo.co.nz/html"
APP_DIR="/home/ubuntu/WESMO-2024/wesmo-app"

# Remove the existing HTML files
sudo rm -r $WEB_DIR

# Create a new HTML directory
sudo mkdir -p $WEB_DIR

# Change to the application directory
cd $APP_DIR

# Pull the latest code from the git repository
git pull

# Install the necessary npm packages
npm install

# Build the application
npm run build

# Copy the build files to the web directory
sudo cp -r build/* $WEB_DIR

# Restart the nginx service
sudo systemctl restart nginx

echo "Website update completed successfully."
