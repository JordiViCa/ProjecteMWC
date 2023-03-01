from flask import Blueprint, request, jsonify, send_file
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
def get_extension(filename):
    return filename.rsplit('.', 1)[1].lower()

documents = Blueprint("documents", __name__)

@documents.route("", methods=["GET"])
@jwt_required()
def get_documents():
    id = get_jwt_identity()
    user = Admin.objects(id=id).first()
    if not user:
        return "forbidden access", 403
    return jsonify(documents=Client.objects.only("documents"))

@documents.route("<id>", methods=["GET"])
@jwt_required()
def get_document(id):
    user = Client.objects(documents__match={"_id":id}).first()
    if not user:
        return "document not found", 404
    
    document = user.documents.filter(_id=id).first()
    if not document:
        return "document not found", 404
    
    token_id = get_jwt_identity()
    admin = Admin.objects(id=token_id).first()
    if str(user.id) != token_id and not admin:
        return "forbidden access", 403
    return jsonify(document=document)


@documents.route("", methods=["POST"])
@jwt_required()
def create_document():
    file = request.files["file"]
    extension = get_extension(file.filename)
    name = request.form.get('name')
    filename = name + "." + extension
    id = get_jwt_identity()   

    user = Client.objects(id=id).first()

    if not user:
        return "Client not found", 404
    
    if not allowed_file(file.filename):
        return "Invalid file extension", 400
    
    file_base_path = os.path.join(os.path.dirname(app.instance_path), app.config["UPLOAD_FOLDER"], str(user.id))
    os.makedirs(file_base_path, exist_ok=True)
    file_name = secure_filename(filename)
    file_path = os.path.join(file_base_path, file_name)
    
    path_exist = os.path.isfile(file_path)
    
    try:
        file.save(file_path)
    except Exception as e:
        return str(e), 500
    
    #if not path_exist:
    doc = Document(userId=str(user.id), name=name ,fileName=file_name, path=file_path)
    user.documents.append(doc)
    user.save()
    
    return jsonify(success=True)

@documents.route("<id>", methods=["DELETE"])
@jwt_required()
def remove_document(id):
    user = Client.objects(documents__match={"_id":id}).first()
    if not user:
        return "document not found", 404
    
    document = user.documents.filter(_id=id).first()
    if not document:
        return "document not found", 404
    
    token_id = get_jwt_identity()
    if str(user.id) != token_id:
        return "forbidden acces", 403
    
    file_path = document.path
    path_exist = os.path.isfile(file_path)

    if path_exist:   
        os.remove(file_path)

    user.update(pull__documents=document)


    return jsonify(succes=True)

@documents.route("file/<id>", methods=["POST"])
@jwt_required()
def get_file(id):
    user = Client.objects(documents__match={"_id":id}).first()
    if not user:
        return "document not found", 404
    
    document = user.documents.filter(_id=id).first()
    if not document:
        return "document not found", 404
    
    token_id = get_jwt_identity()
    if str(user.id) != token_id:
        return "forbidden acces", 403
    
    file_base_path = os.path.join(os.path.dirname(app.instance_path), app.config["UPLOAD_FOLDER"], str(user.id))
    file_path = os.path.join(file_base_path, document.fileName)
    path_exist = os.path.isfile(file_path)

    if not path_exist:
        return "file doesn't exist", 500
    
    return send_file(file_path)

    
