from .. import db


class Admin(db.Document):
    email = db.StringField(max_length=100, unique=True, required=True)
    name = db.StringField(max_length=100, required=True)
    password = db.StringField(required=True)
    authority = db.BooleanField(required=True)