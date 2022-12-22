
from .. import db


class Admin(db.Document):
    name = db.StringField()
    email = db.StringField()
    password = db.StringField()