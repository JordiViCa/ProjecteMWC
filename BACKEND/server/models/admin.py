from .. import db


class Admin(db.Document):
    nom = db.StringField()
    email = db.StringField()
    password = db.StringField()