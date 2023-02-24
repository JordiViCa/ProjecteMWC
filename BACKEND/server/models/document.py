from .. import db
from bson import ObjectId

class Document(db.EmbeddedDocument):
    _id = db.ObjectIdField( required=True, default=ObjectId)
    userId = db.StringField(max_length=100, required=True)
    name = db.StringField(max_length=100, required=True)
    path = db.StringField(max_length=250, required=True)