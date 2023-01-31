from flask import Blueprint, request, jsonify
from ..models.client import Client

clients = Blueprint("clients", __name__)


@clients.route('/', methods=['GET'])
def llistar():
    return jsonify(Client.objects)

@clients.route('/baixa', methods=['POST'])
def baixa():
    email = request.args.get("email")
    user = Client.objects(email = email).first()
    if user is None:
        return "L'usuari no existeix"
    
    user.delete()
    return jsonify(succes=True)