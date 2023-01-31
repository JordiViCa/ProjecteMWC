from dotenv import load_dotenv
import os
load_dotenv()

class Config:
    DEBUG = False
    TESTING = False
    MONGODB_HOST = os.getenv("DB_URI")
    
class ProdConf(Config):
    SECRET_KEY= os.getenv("SECRET_KEY")
    SILENT = True

class DevConf(Config):
    ENV="development"
    SECRET_KEY="123"
    DEBUG = True
