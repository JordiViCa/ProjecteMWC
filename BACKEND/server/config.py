class Config:
    DEBUG = False
    TESTING = False
    MONGO_URI = "mongodb://localhost"
class ProdConf(Config):
    SECRET_KEY="pasdlsanbehfb4324rwf2#~@"
    SILENT = True

class DevConf(Config):
    ENV="development"
    SECRET_KEY="123"
    DEBUG = True
