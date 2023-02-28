from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .. import jwt
from ..models.client import Client
from ..models.admin import Admin
import json
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, verify_jwt_in_request
from mongoengine.errors import NotUniqueError, ValidationError

auth = Blueprint("auth", __name__)


@auth.route('/login/<string:userType>', methods=['POST'])
def login(userType):
    body = request.get_json()
    email = body.get("email")
    nif = body.get("nif")
    pw = body.get("password")
    user = None

    if userType == "client":
        if email:
            user = Client.objects(email=email).first()
        elif nif:
            user = Client.objects(nif=nif).first()
        else:
            return "nif or email must be provided", 400

    elif userType == "admin":
        if not email:
            return "email must be provided", 400
        user = Admin.objects(email=email).first()
    else:
        return "Incorrect user type, choose admin or client", 400
    if not pw:
        return "password must be provided", 400
    if not user:
        return "user not found", 400

    if not check_password_hash(user.password, pw):
        return "Invalid password", 404
        
    access_token = create_access_token(identity=str(user.id))
    dict_user = json.loads(user.to_json())
    dict_user.pop("password", None)


    return jsonify(token=access_token, user=dict_user), 200


@auth.route('/register/admin', methods=['POST'])
@jwt_required()
def register_admin():
    token_id = get_jwt_identity()
    request_admin = Admin.objects(id=token_id).first()
    if not (request_admin and request_admin.authority):
        return "forbidden acces", 403
    
    body = request.get_json()
    admin = Admin(**body)
    if not admin.password:
        return "password not correct", 500
    
    admin.password = generate_password_hash(admin.password)
    try:
        admin.save()
    except NotUniqueError as e:
        return "duplicated key", 400   
    
    return jsonify(success=True), 200


@auth.route('/register/client', methods=['POST'])
def register_client():
    body = request.get_json()
    client = Client(**body)
    
    if not (client.email or client.nif):
        return "email and nif are empty, at least one must be provided", 400

    if not client.password:
        return "password must be provided", 400
    
    client.password = generate_password_hash(client.password)
    
    try:
        client.save()
    except NotUniqueError as e:
        return "duplicated key", 400     
    except ValidationError as e:
        return str(e), 400  
    return jsonify(success=True), 200


@auth.route("/current-user", methods=['GET'])
@jwt_required()
def current_user():
    userId = get_jwt_identity()
    user = None

    user = Client.objects(id = userId).first()
    if user is None:
        user = Admin.objects(id = userId).first()
    
    return jsonify(type=user.__class__.__name__,data=user)


@auth.route("/check-token", methods=['POST'])
def check_token():
    return verify_jwt_in_request()