from app.models import Donor, db
from flask import Blueprint, jsonify, request

donor_bp = Blueprint("donor", __name__)

@donor_bp.route("/register", methods=["POST"])
def register_donor():
    data = request.get_json()
    new_donor = Donor(
        name=data["name"],
        phone_number=data["phone_number"],
        email=data["email"],
        state=data["state"],
        district=data["district"],
        password=data["password"]  # Ensure password hashing before storing
    )
    db.session.add(new_donor)
    db.session.commit()
    return jsonify({"message": "Donor registered successfully"}), 201

@donor_bp.route("/list", methods=["GET"])
def list_donors():
    donors = Donor.query.all()
    return jsonify([donor.to_dict() for donor in donors])
