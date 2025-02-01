from app.models import NGO, db
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

ngo_bp = Blueprint("ngo", __name__)

@ngo_bp.route("/register", methods=["POST"])
def register_ngo():
    data = request.get_json()
    hashed_password = generate_password_hash(data["password"], method="sha256")
    new_ngo = NGO(
        state=data["state"],
        district=data["district"],
        sector=data["sector"],
        ngo_type=data["ngo_type"],
        ngo_name=data["ngo_name"],
        unique_id=data["unique_id"],
        password=hashed_password
    )
    db.session.add(new_ngo)
    db.session.commit()
    return jsonify({"message": "NGO registered successfully"}), 201

@ngo_bp.route("/list", methods=["GET"])
def list_ngos():
    ngos = NGO.query.all()
    return jsonify([ngo.to_dict() for ngo in ngos])
