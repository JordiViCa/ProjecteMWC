from flask import Blueprint, request, jsonify
from ..models.client import Client

client = Blueprint("client", __name__)


@client.route('/llistar', methods=['GET'])
def llistar():
    return jsonify(Client.objects)

@client.route('/baixa', methods=['POST'])
def baixa():
    email = request.args.get("email")
    user = Client.objects(email = email).first()
    if user is None:
        return "L'usuari no existeix"
    
    user.delete()
    return jsonify(succes=True)