from dotenv import load_dotenv
import os
load_dotenv()

class Config:
    DEBUG = False
    TESTING = False
    MONGODB_HOST = os.getenv("DB_URI")
    UPLOAD_FOLDER = "server/uploads/"
    MAX_CONTENT_LENGTH = 15*1000*1000
    
class ProdConf(Config):
    SECRET_KEY= os.getenv("SECRET_KEY")
    SILENT = True

class DevConf(Config):
    ENV="development"
    SECRET_KEY="123"
    DEBUG = True
