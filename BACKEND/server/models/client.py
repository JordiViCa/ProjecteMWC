from .. import db


class Client(db.Document):
    nom = db.StringField()
    email = db.StringField()
    password = db.StringField()

