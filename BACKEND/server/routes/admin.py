from flask import Blueprint, request, jsonify
from ..models.admin import Admin
from flask_jwt_extended import verify_jwt_in_request
from mongoengine.errors import InvalidQueryError


admins = Blueprint("admins", __name__)

@admins.before_request
def check_token():
    verify_jwt_in_request()


@admins.route('', methods=['GET'])
def get_admins():
    admins = [admin for admin in Admin.objects.exclude("password") ]
    return admins

@admins.route('<id>', methods=['DELETE'])
def remove_Admin(id):
    user = Admin.objects(email=id).first()
    if not user:
        return "user not found", 404

    user.delete()
    return jsonify(succes=True)

@admins.route('<id>', methods=['GET'])
def get_Admin(id):
    user = Admin.objects(email=id).exclude("password").first()
    if not user:
        return "user not found", 404
    
    return jsonify(user)


@admins.route('<id>', methods=['PUT'])
def update_Admin(id):
    body = request.get_json()
    body.pop("password", None)

    user = Admin.objects(email=id).first()
    if not user:
        return "user not found", 404
    try:
        user.update(**body)
    except InvalidQueryError:
        return "bad request", 400
    except Exception as e:
        return str(e), 500

    


    return jsonify(success=True)
