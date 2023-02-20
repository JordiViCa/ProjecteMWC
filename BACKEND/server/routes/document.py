from flask import Blueprint, request, jsonify
from ..models.document import Document
from ..models.admin import Admin
from ..models.client import Client
from mongoengine.errors import ValidationError, InvalidQueryError
from flask_jwt_extended import get_jwt_identity, jwt_required
from werkzeug.utils import secure_filename
from flask import current_app as app
import os

ALLOWED_EXTENSIONS = {'pdf', 'png', 'jpg', 'jpeg'}
def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

documents = Blueprint("documents", __name__)

@documents.route("/", methods=["GET"])
@jwt_required()
def get_documents():
    id = get_jwt_identity()
    user = Admin.objects(id=id).first()
    if not user:
        return "forbidden access", 403
    return jsonify(documents=Client.objects.only("documents"))


@documents.route("/", methods=["POST"])
def create_document():
    file = request.files["file"]
    id = request.form.get("id")    

    user = Client.objects(id=id).first()

    if not user:
        return "error", 404
    
    if not allowed_file(file.filename):
        return "Invalid file extension", 400
    
    file_base_path = os.path.join(app.config["UPLOAD_FOLDER"], str(user.id))
    os.makedirs(file_base_path, exist_ok=True)
    file_name = secure_filename(file.filename)
    file_path = os.path.join(file_base_path, file_name)
    
    path_exist = os.path.isfile(file_path)
    
    try:
        file.save(file_path)
    except Exception as e:
        return str(e), 500
    
    if not path_exist:
        doc = Document(userId=str(user.id), name=file_name)
        user.documents.append(doc)
        user.save()
    
    return jsonify(success=True)
    
    # id = get_jwt_identity()
    # user = Admin.objects(id=id).first()
    # if not user:
    #     user = Client.objects(id=id).first()
    # if not user:
    #     return "not found", 404

@documents.route("/", methods=["DELETE"])
def remove_document():
    body = request.get_json()
    file_name = body["fileName"]
    user_id = body["userId"]
    try:
        user = Client.objects(id=user_id).first()
    except ValidationError:
        return "invalid id", 400
    if not user:
        return "user not found", 404
    
    document = user.documents.filter(name=file_name).first()
    if not document:
        return "document not found", 404
    
    file_base_path = os.path.join(app.config["UPLOAD_FOLDER"], str(user.id))
    file_path = os.path.join(file_base_path, file_name)
    path_exist = os.path.isfile(file_path)

    if path_exist:   
        os.remove(file_path)


    user.update(pull__documents=document)


    return jsonify(succes=True)