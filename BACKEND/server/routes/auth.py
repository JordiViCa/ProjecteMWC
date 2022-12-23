from flask import Blueprint, request, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from .. import jwt
from ..models.client import Client
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required

auth = Blueprint("auth", __name__)


@auth.route('/login', methods=['POST'])
def login():
    email = request.args.get("email")
    pw = request.args.get("password")
    usuari = Client.objects(email=email).first()
    
    if usuari is not None and check_password_hash(usuari.password, pw):
        access_token = create_access_token(identity=str(usuari.id))
        return jsonify(token=access_token)
    else:
        return jsonify(success=False)
    
@auth.route('/registrar', methods=['POST'])
def sign_in():
    nom = request.args.get("nom")
    email = request.args.get("email")
    pw = request.args.get("password")
    usuari = Client(nom = nom, email = email, password = generate_password_hash(pw))
    usuari.save()
    return jsonify(success=True)


# Aixo encara no funciona, s'ha de decidir en quina part del request estarà el token per a que s'agafi
@auth.route("/usuari-actual", methods=['GET'])
@jwt_required
def usuari_actual():
    usuari_id = get_jwt_identity()
    usuari = Client.filter.get(usuari_id)
    return ""
