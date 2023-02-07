from flask import Blueprint, request, jsonify
from ..models.client import Client

clients = Blueprint("clients", __name__)


@clients.route('/', methods=['GET'])
def get_clients():
    return jsonify(Client.objects)

@clients.route('<id>', methods=['DELETE'])
def remove_client(id):
    user = Client.objects(email=id).first()
    if not user:
        user = Client.objects(nif=id).first()
    if not user:
        return "user not found", 500

    user.delete()
    return jsonify(succes=True)

@clients.route('<id>', methods=['GET'])
def get_client(id):
    user = Client.objects(email=id).first()
    if not user:
        user = Client.objects(nif=id).first()
    if not user:
        return "user not found", 500
    return jsonify(user)

