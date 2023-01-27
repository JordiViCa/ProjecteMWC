from .. import db
from .document import Document


class Client(db.Document):
    name = db.StringField(max_length=100, required=True)
    surname1 = db.StringField(max_length=100, required=True)
    surname2 = db.StringField(max_length=100, required=True)
    password = db.StringField(required=True)
    birthDate = db.DateTimeField(required=True)
    phone = db.StringField(max_length=8, required=True)
    postalCode = db.StringField(max_length=5, required=True)
    town = db.StringField(max_length=100, required=True)
    address = db.StringField(max_length=100, required=True)
    email = db.StringField(max_length=100, unique=True, sparse=True)
    nif = db.StringField(max_length=100, unique=True, sparse=True)
    documents = db.EmbeddedDocumentListField(Document)
