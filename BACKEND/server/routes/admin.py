from flask import Blueprint, request, jsonify
from ..models.admin import Admin
from flask_jwt_extended import jwt_required, get_jwt_identity
from mongoengine.errors import InvalidQueryError


admins = Blueprint("admins", __name__)

@admins.before_request
@jwt_required()
def nothing():
    pass


def admin_is_authorized(token_id):
    admin = Admin.objects(id=token_id).first()
    if not (admin and admin.authority):
        return False
    return True


@admins.route('', methods=['GET'])
def get_admins():
    if not admin_is_authorized(get_jwt_identity()):
        return "forbidden access", 403
        
    admins = [admin for admin in Admin.objects.exclude("password") ]
    return admins

@admins.route('<id>', methods=['DELETE'])
def remove_Admin(id):
    if not admin_is_authorized(get_jwt_identity()):
        return "forbidden access", 403
    user = Admin.objects(id=id).first()
    if not user:
        return "user not found", 404

    user.delete()
    return jsonify(succes=True)

@admins.route('<id>', methods=['GET'])
def get_Admin(id):
    token_id = get_jwt_identity()
    request_admin = Admin.objects(id=token_id).first()
    user = Admin.objects(id=id).exclude("password").first()

    if not request_admin:
        return "admin from jwt not found", 404
    if not user:
        return "user not found", 404
    if request_admin.id != user.id and not request_admin.authority:
        return "forbidden access", 403
    
    return jsonify(user)


@admins.route('<id>', methods=['PUT'])
def update_Admin(id):
    if not admin_is_authorized(get_jwt_identity()):
        return "forbidden access", 403

    user = Admin.objects(id=id).first()
    if not user:
        return "user not found", 404
    
    
    body = request.get_json()
    body.pop("password", None)
    
    try:
        user.update(**body)
    except InvalidQueryError:
        return "bad request", 400
    except Exception as e:
        return str(e), 500

    


    return jsonify(success=True)
