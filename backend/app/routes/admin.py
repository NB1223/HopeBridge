from app.models import Admin, db
from flask import Blueprint, jsonify, request
from werkzeug.security import check_password_hash

admin_bp = Blueprint("admin", __name__)

@admin_bp.route("/login", methods=["POST"])
def login_admin():
    data = request.get_json()

    # Check if the admin exists
    admin = Admin.query.filter_by(name=data["name"]).first()

    if admin and check_password_hash(admin.password, data["password"]):
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401

