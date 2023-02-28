from flask import Blueprint, request, jsonify
from ..models.client import Client
from ..models.admin import Admin
from mongoengine.errors import InvalidQueryError
from flask_jwt_extended import get_jwt_identity, jwt_required


clients = Blueprint("clients", __name__)

@clients.before_request
@jwt_required()
def nothing():
    pass

@clients.route('', methods=['GET'])
def get_clients():
    id = get_jwt_identity()
    user = Admin.objects(id=id).first()
    if not user:
        return "forbidden access", 403 
    client_list = Client.objects.exclude("password")
    clients = [client for client in  client_list]
    return clients

@clients.route('<id>', methods=['DELETE'])
def remove_client(id):
    token_id = get_jwt_identity()
    user = Admin.objects(id=token_id).first()
    if not user:
        return "forbidden access", 403 
    
    user = Client.objects(id=id).first()
    if not user:
        return "user not found", 404

    user.delete()
    return jsonify(succes=True)

@clients.route('<id>', methods=['GET'])
def get_client(id):
    token_id = get_jwt_identity()
    admin = Admin.objects(id=token_id).first()
    user = Client.objects(id=id).exclude("password").first()
    if not user:
        return "user not found", 404
    if str(user.id) != token_id and not admin:
        return "forbidden access", 403

    return jsonify(user)


@clients.route('<id>', methods=['PUT'])
def update_client(id):
    token_id = get_jwt_identity()
    admin = Admin.objects(id=token_id).first()
    if not admin:
        return "forbidden access", 403 
    
    body = request.get_json()
    body.pop("password", None)
    body.pop("email", None)
    body.pop("nif", None)

    user = Client.objects(id=id).first()
    if not user:
        return "user not found", 404
    try:
        user.update(**body)
    except InvalidQueryError as e:
        return str(e), 400
    except Exception as e:
        return str(e), 500

    return jsonify(success=True)

@clients.route("<id>/documents", methods=["GET"])
@jwt_required()
def get_client_documents(id):
    token_id = get_jwt_identity()
    admin = Admin.objects(id=token_id).first()
    user = Client.objects(id=id).first()
    if not user:
        return "user not found", 404
    if str(user.id) != token_id and not admin:
        return "forbidden access", 403
    
    return jsonify(documents=user.documents)

@clients.route("<id>/toggle", methods=["GET"])
@jwt_required()
def toggle_client_activated(id):
    token_id = get_jwt_identity()
    admin = Admin.objects(id=token_id).first()
    if not admin:
        return "forbidden access", 403

    user = Client.objects(id=id).first()
    if not user:
        return "user not found", 404
    
    if str(user.id) != token_id and not admin:
        return "forbidden access", 403
    
    user.activated = not user.activated
    user.save()
    
    return jsonify(success=True)
