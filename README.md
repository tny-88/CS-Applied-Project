# Readme

In order to run the the project, you need to install:
Python, Flask, Node.js and a PostgreSQL database (pgAdmin4).


Command to run the React frontend:
npm run dev

Activate the python virtual environment and install the requirements located in the requirements.txt file in the backend:
pip install -r requirements.txt

Command to run tge Flask backend:
flask run

You may need to modify the database connection in the Flask api file (app.py) with your own database details.

pgAdmin4 was used to handle the local PostgreSQL database.

You can create the necessary tables using the database.txt file which contains the sql query for creating the tables in the database.

Change necessary IP addresses for the API calls in the frontend as they will be running on the local ip of the device.
