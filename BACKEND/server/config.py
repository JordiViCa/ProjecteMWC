class Config:
    DEBUG = False
    TESTING = False
    MONGODB_SETTINGS = {
    'db': 'your_database',
    'host': 'localhost',
    'port': 27017
}
class ProdConf(Config):
    SECRET_KEY="pasdlsanbehfb4324rwf2#~@"
    SILENT = True

class DevConf(Config):
    ENV="development"
    SECRET_KEY="123"
    DEBUG = True
