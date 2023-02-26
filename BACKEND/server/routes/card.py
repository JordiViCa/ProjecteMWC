from flask import Blueprint, request, jsonify
from ..models.card import Card
from ..models.admin import Admin
from mongoengine.errors import InvalidQueryError, ValidationError
from flask_jwt_extended import get_jwt_identity, jwt_required


cards = Blueprint("cards", __name__)

@cards.before_request
@jwt_required()
def check_token():
    admin = Admin.objects(id=get_jwt_identity()).first()
    if not admin:
        return "forbidden access", 403

@cards.route("", methods=["GET"])
def get_cards():
    return jsonify(cards=Card.objects())

@cards.route("<id>", methods=["GET"])
def get_card(id):
    card = Card.objects(id=id).first()
    if not card:
        return "no card found", 404
    return jsonify(card=card)

@cards.route("", methods=["POST"])
def create_card():
    body = request.get_json()
    card = Card(**body)

    try:
        card.validate()
    except ValidationError as e:
        return str(e), 400
    
    card.save()
    return jsonify(succes=True)

@cards.route("<id>", methods=["DELETE"])
def delete_card(id):
    card = Card.objects(id=id).first()
    if not card:
        return "no card found", 404
    card.delete()
    return jsonify(succes=True)
