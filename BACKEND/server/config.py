class Config:
    DEBUG = False
    TESTING = False
    MONGODB_SETTINGS = {
        'db' : 'MWC',
        'host' : 'localhost'
    }
class ProdConf(Config):
    SECRET_KEY="pasdlsanbehfb4324rwf2#~@"
    SILENT = True

class DevConf(Config):
    ENV="development"
    SECRET_KEY="123"
    DEBUG = True
