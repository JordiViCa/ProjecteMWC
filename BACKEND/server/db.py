from flask import current_app as app
from flask_pymongo import PyMongo

mongo_client = PyMongo(app)

class db():
    def __init__(self):
        self.database = mongo_client.MWC
        self.clients = self.database.Clients