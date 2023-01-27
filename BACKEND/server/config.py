from dotenv import load_dotenv
import os
print(load_dotenv())
print(os.getenv("MONGODB_SETTINGS"))
class Config:
    DEBUG = False
    TESTING = False
    MONGODB_SETTINGS = {
        "db": os.getenv("DB"),
        "host" : os.getenv("DB_HOST")
    }
class ProdConf(Config):
    SECRET_KEY= os.getenv("SECRET_KEY")
    SILENT = True

class DevConf(Config):
    ENV="development"
    SECRET_KEY="123"
    DEBUG = True
