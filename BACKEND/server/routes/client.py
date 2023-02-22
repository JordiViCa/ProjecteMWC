from flask import Blueprint, request, jsonify
from ..models.client import Client
from mongoengine.errors import InvalidQueryError
from flask_jwt_extended import get_jwt_identity, jwt_required

clients = Blueprint("clients", __name__)


@clients.route('/', methods=['GET'])
def get_clients():
    clients = [client for client in Client.objects.exclude("password") ]
    return clients

@clients.route('<id>', methods=['DELETE'])
def remove_client(id):
    user = Client.objects(email=id).first()
    if not user:
        user = Client.objects(nif=id).first()
    if not user:
        return "user not found", 404

    user.delete()
    return jsonify(succes=True)

@clients.route('<id>', methods=['GET'])
def get_client(id):
    user = Client.objects(email=id).exclude("password").first()
    if not user:
        user = Client.objects(nif=id).exclude("password").first()
    if not user:
        return "user not found", 404
    
    return jsonify(user)


@clients.route('<id>', methods=['PUT'])
def update_client(id):
    body = request.get_json()
    body.pop("password", None)

    user = Client.objects(email=id).first()
    if not user:
        user = Client.objects(nif=id).first()
    if not user:
        return "user not found", 404
    try:
        user.update(**body)
    except InvalidQueryError:
        return "bad request", 400
    except Exception as e:
        return str(e), 500

    return jsonify(success=True)

@clients.route("documents", methods=["GET"])
@jwt_required()
def get_client_documents():
    id = get_jwt_identity()
    user = Client.objects(id=id).first()
    if not user:
        return "client not found", 404
    return jsonify(documents=user.documents)
