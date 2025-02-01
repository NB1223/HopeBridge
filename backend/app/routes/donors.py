from app.models import Donor, db
from flask import Blueprint, jsonify, request
from werkzeug.security import generate_password_hash

donor_bp = Blueprint("donor", __name__)


@donor_bp.route("/register", methods=["POST"])  
def register_donor():
    data = request.get_json()
    hashed_password = generate_password_hash(data["password"], method="sha256")
    new_donor = Donor(
        name=data["name"],
        phone_number=data["phone_number"],
        email=data["email"],
        state=data["state"],
        district=data["district"],
        password=hashed_password # Ensure password hashing before storing
    )
    db.session.add(new_donor)
    db.session.commit()
    return jsonify({"message": "Donor registered successfully"}), 201

@donor_bp.route("/list", methods=["GET"])
def list_donors():
    donors = Donor.query.all()
    result = []
    for donor in donors:
        result.append({
            "donor_id": donor.donor_id,
            "name": donor.name,
            "phone_number": donor.phone_number,
            "email": donor.email,
            "state": donor.state,
            "district": donor.district
        })
    return jsonify(result)


