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

@ngo_bp.route('/list', methods=['GET'])
def get_ngos():
    ngos = NGO.query.all()
    if not ngos:
        return jsonify([])  # Ensure response is always an array
    
    ngo_list = [
        {
            "ngo_id": ngo.ngo_id,
            "ngo_name": ngo.ngo_name,
            "ngo_type": ngo.ngo_type,
            "sector": ngo.sector,
            "state": ngo.state,
            "district": ngo.district,
            "unique_id": ngo.unique_id
        }
        for ngo in ngos
    ]
    return jsonify(ngo_list)

