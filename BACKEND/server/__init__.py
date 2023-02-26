from flask import Flask
from flask_cors import CORS
from .config import ProdConf, DevConf
from flask_mongoengine import MongoEngine
from flask_jwt_extended import JWTManager

db = MongoEngine()
jwt = JWTManager()

    
def create_app(dev_config=False):
    # create and configure the app
    app = Flask(__name__)
    cors = CORS(app, resources={r'/api/*': {'origins': 'http://localhost:4200'}}, headers=['Content-Type', 'Access-Control-Allow-Origin', 'Authorization'])

    from .routes.auth import auth
    from .routes.client import clients
    from .routes.admin import admins
    from .routes.document import documents
    from .routes.card import cards

    # Es registren les rutes
    app.register_blueprint(auth, url_prefix='/api/auth')
    app.register_blueprint(clients, url_prefix='/api/clients')
    app.register_blueprint(admins, url_prefix='/api/admins')
    app.register_blueprint(documents, url_prefix='/api/documents')
    app.register_blueprint(cards, url_prefix='/api/cards')

    if not dev_config:
        # load the production config, if it exists, when not testing
        app.config.from_object(ProdConf)
    else:
        # load the development config if passed in
        app.config.from_object(DevConf)
    
    db.init_app(app)
    jwt.init_app(app)

    return app