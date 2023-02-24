from flask import Blueprint, request, jsonify
from ..models.admin import Admin
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine.errors import InvalidQueryError


admins = Blueprint("admins", __name__)

@admins.before_request
@jwt_required()
def check_token():
    admin = Admin.objects(id=get_jwt_identity()).first()
    if not admin:
        return "forbidden access", 403


@admins.route('', methods=['GET'])
def get_admins():
    admins = [admin for admin in Admin.objects.exclude("password") ]
    return admins

@admins.route('<id>', methods=['DELETE'])
def remove_Admin(id):
    user = Admin.objects(id=id).first()
    if not user:
        return "user not found", 404

    user.delete()
    return jsonify(succes=True)

@admins.route('<id>', methods=['GET'])
def get_Admin(id):
    user = Admin.objects(id=id).exclude("password").first()
    if not user:
        return "user not found", 404
    
    return jsonify(user)


@admins.route('<id>', methods=['PUT'])
def update_Admin(id):
    body = request.get_json()
    body.pop("password", None)

    user = Admin.objects(id=id).first()
    if not user:
        return "user not found", 404
    try:
        user.update(**body)
    except InvalidQueryError:
        return "bad request", 400
    except Exception as e:
        return str(e), 500

    


    return jsonify(success=True)
