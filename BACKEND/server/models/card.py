from .. import db

class Card(db.Document):
    url_image = db.StringField(max_length=100, required=True)
    url_open = db.StringField(max_length=100, required=True)
    title= db.StringField(max_length=100, required=True)
    description = db.StringField(required=True)