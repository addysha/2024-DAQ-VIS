# 2024 WESMO Website Backend
## Data Acquisition and Visualisation System

### Set up Python Virtual Envrioment
```sudo apt install python3.12-venv```
```python3 -m venv env```  
```source env/bin/activate```  
```sudo pip install -r requirements.txt```

### Install Redis Database
```sudo apt-get install redis```

### Set up Postgresql Database
```sudo apt-get install postgresql```
```sudo -u postgres psql```
```\password password```
```CREATE DATABASE wesmo```

### Set up Supervisor for Backend Scripts
```sudo apt-get install supervisor```

To run the backend of the website (only require if running the race-data dashboard), you need to create 
three config file (below), the contents for the files are in 'supervisord.txt'. Ensure that the virtual envrioment
is active when starting the supervisor.

```sudo nano /etc/supervisor/conf.d/websocket.conf```  
```sudo nano /etc/supervisor/conf.d/mqtt_subscriber.conf```  
```sudo nano /etc/supervisor/conf.d/poll.conf```

```sudo supervisorctl reread```  
```sudo supervisorctl update```  
```sudo supervisorctl start websocket mqtt_subscriber poll```  