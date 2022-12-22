from flask import Blueprint, request, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import JWTManager


auth = Blueprint("auth", __name__)


@auth.route('/clients', methods=['GET'])
def clients():
    pass
    
