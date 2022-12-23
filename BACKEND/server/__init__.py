from flask import Flask
from .config import ProdConf, DevConf
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager

db = MongoEngine()
jwt = JWTManager()

def create_app(dev_config=False):
    # create and configure the app
    app = Flask(__name__)

    from .routes.auth import auth
    from .routes.client import client
   

    # Es registren les rutes
    app.register_blueprint(auth, url_prefix='/')
    app.register_blueprint(client, url_prefix='/client')

    if not dev_config:
        # load the production config, if it exists, when not testing
        app.config.from_object(ProdConf)
    else:
        # load the development config if passed in
        app.config.from_object(DevConf)
    
    db.init_app(app)
    jwt.init_app(app)

    return app