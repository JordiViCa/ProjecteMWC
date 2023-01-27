from .. import db


class Document(db.EmbeddedDocument):
    userId = db.StringField(max_length=100, required=True)
    name = db.StringField(max_length=100, required=True)
    file = db.StringField(max_length=100, required=True)