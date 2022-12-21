from flask import Flask
from .config import ProdConf, DevConf
from flask_mongoengine import MongoEngine

db = MongoEngine()

def create_app(dev_config=False):
    # create and configure the app
    app = Flask(__name__)

    from .routes.auth import auth
   

    # Es registren les rutes
    app.register_blueprint(auth, url_prefix='/')

    if not dev_config:
        # load the production config, if it exists, when not testing
        app.config.from_object(ProdConf)
    else:
        # load the development config if passed in
        app.config.from_object(DevConf)
    
    db.init_app(app)

    return app