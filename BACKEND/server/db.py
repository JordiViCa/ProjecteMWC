from flask_pymongo import MongoClient

mongo_client = MongoClient("mongodb://localhost")

class Db():
    def __init__(self):
        self.database = mongo_client.MWC
        self.clients = self.database.Clients