import hashlib

from app.models import Donor, db
from flask import Blueprint, jsonify, request

donor_bp = Blueprint("donor", __name__)

# Hash password manually using hashlib
def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Check password manually using hashlib (matching hashed passwords)
def check_password(stored_hash, password):
    return stored_hash == hashlib.sha256(password.encode('utf-8')).hexdigest()

@donor_bp.route("/register", methods=["POST"])  
def register_donor():
    data = request.get_json()

    # Check if donor with the same email already exists
    if Donor.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Donor with this email already exists"}), 400
    
    hashed_password = hash_password(data["password"])  # Hash password using hashlib
    new_donor = Donor(
        name=data["name"],
        phone_number=data["phone_number"],
        email=data["email"],
        state=data["state"],
        district=data["district"],
        password=hashed_password  # Store hashed password
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

@donor_bp.route('/login', methods=['POST'])
def login_donor():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    donor = Donor.query.filter_by(email=email).first()
    if not donor:
        return jsonify({"message": "Donor not found"}), 404

    # Compare the hashed passwords
    if donor.password != hashlib.sha256(password.encode('utf-8')).hexdigest():
        return jsonify({"message": "Invalid password"}), 401

    return jsonify({"message": "Donor logged in successfully"}), 200

