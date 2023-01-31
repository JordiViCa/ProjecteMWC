from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .. import jwt
from ..models.client import Client
from ..models.admin import Admin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, verify_jwt_in_request

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

    if not check_password_hash(user.password, pw):
        return "Invalid password", 500
        
    access_token = create_access_token(identity=str(user.id))
    return jsonify(token=access_token), 200



    
# @auth.route('/registrar/<string:user>', methods=['POST'])
# def sign_in(user):
#     nom = request.args.get("nom")
#     email = request.args.get("email")
#     pw = request.args.get("password")
#     usuari = None

#     if nom is None or email is None or pw is None:
#         return "Els paramtres son incorrectes", 500

#     if user == "client":
#         if Client.objects(email=email).first():
#             return "El client ja existeix", 500
#         usuari = Client(nom = nom, email = email, password = generate_password_hash(pw))
#     elif user == "admin":
#         if Admin.objects(email=email).first():
#             return "L'Admin ja existeix", 500        
#         usuari = Admin(nom = nom, email = email, password = generate_password_hash(pw))
    
#     usuari.save()
#     return jsonify(success=True)


@auth.route('/register/admin', methods=['POST'])
def register_admin():
    body = request.get_json()
    admin = Admin(**body)
    if not admin.password:
        return "password not correct", 500
    
    admin.password = generate_password_hash(admin.password)
    try:
        admin.save()
    except Exception as e:
        return str(e), 500

    return jsonify(success=True), 200


@auth.route('/register/client', methods=['POST'])
def register_client():
    body = request.get_json()
    client = Client(**body)
    
    if not (client.email or client.nif):
        return "email and nif are empty, at least one must be provided", 500

    # [TODO] full password checking
    if not client.password:
        return "password not correct", 500
    
    client.password = generate_password_hash(client.password)
    try:
        client.save()
    except Exception as e:
        return str(e), 500

    return jsonify(success=True), 200


@auth.route("/current-user", methods=['GET'])
@jwt_required()
def usuari_actual():
    userId = get_jwt_identity()
    user = None
    try:
        user = Client.objects(id = userId).first()
    except Exception:
        pass

    if user is None:
        user = Admin.objects(pk = userId).first()
    
    return jsonify(type=user.__class__.__name__,data=user)


@auth.route("/check-token", methods=['POST'])
def check():
    return verify_jwt_in_request()