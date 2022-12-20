from flask import Blueprint, request, redirect, url_for, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from ..db import Db

auth = Blueprint("auth", __name__)

db = Db()

@auth.route('/clients', methods=['GET'])
def clients():
    list = [ x["nom"] for x in db.clients.find()]
    return jsonify(list)
    
