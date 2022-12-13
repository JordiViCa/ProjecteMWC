from flask import Flask
from .config import ProdConf, DevConf

def create_app(dev_config=False):
    # create and configure the app
    app = Flask(__name__)

    if not dev_config:
        # load the production config, if it exists, when not testing
        app.config.from_object(ProdConf)
    else:
        # load the development config if passed in
        app.config.from_object(DevConf)

    return app