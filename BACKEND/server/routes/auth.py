from flask import Blueprint, request, redirect, url_for
from ..db import db
from werkzeug.security import generate_password_hash, check_password_hash

auth = Blueprint("auth", __name__)
