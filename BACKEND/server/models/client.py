from .. import db


class Client(db.Document):
    name = db.StringField()
    email = db.StringField()
    password = db.StringField()
