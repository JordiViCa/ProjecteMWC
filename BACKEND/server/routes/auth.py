from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .. import jwt
from ..models.client import Client
from ..models.admin import Admin
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required, verify_jwt_in_request

auth = Blueprint("auth", __name__)



@auth.route('/login/<string:user>', methods=['POST'])
def login(user):
    email = request.args.get("email")
    pw = request.args.get("password")

    usuari = Client.objects(email=email).first() if user=='client' else Admin.objects(email=email).first() if user=='admin' else None
    
    if usuari is not None and check_password_hash(usuari.password, pw):
        access_token = create_access_token(identity=str(usuari.id))
        return jsonify(token=access_token)
    else:
        return jsonify(success=False)
    
@auth.route('/registrar/<string:user>', methods=['POST'])
def sign_in(user):
    nom = request.args.get("nom")
    email = request.args.get("email")
    pw = request.args.get("password")
    usuari = None

    if nom is None or email is None or pw is None:
        return "Els paramtres son incorrectes", 500

    if user == "client":
        if Client.objects(email=email).first():
            return "El client ja existeix", 500
        usuari = Client(nom = nom, email = email, password = generate_password_hash(pw))
    elif user == "admin":
        if Admin.objects(email=email).first():
            return "L'Admin ja existeix", 500        
        usuari = Admin(nom = nom, email = email, password = generate_password_hash(pw))
    
    usuari.save()
    return jsonify(success=True)


@auth.route("/usuari-actual", methods=['GET'])
@jwt_required()
def usuari_actual():
    usuari_id = get_jwt_identity()
    usuari = Client.objects(id = usuari_id).first()
    if usuari is None:
        usuari = Admin.objects(id = usuari_id).first()
    
    return jsonify(tipus=usuari.__class__.__name__,dades=usuari)

@auth.route("/check-token", methods=['POST'])
def check():
    return verify_jwt_in_request()