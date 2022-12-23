from flask import Blueprint, request, jsonify
from ..models.client import Client

client = Blueprint("client", __name__)


@client.route('/llistar', methods=['GET'])
def llistar():
    return jsonify(Client.objects)