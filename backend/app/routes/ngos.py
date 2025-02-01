import hashlib

from app.models import NGO, Request, db
from flask import Blueprint, jsonify, request

ngo_bp = Blueprint("ngo", __name__)

# Hash password manually using hashlib
def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Check password manually using hashlib (matching hashed passwords)
def check_password(stored_hash, password):
    return stored_hash == hashlib.sha256(password.encode('utf-8')).hexdigest()

@ngo_bp.route("/register", methods=["POST"])
def register_ngo():
    data = request.get_json()

    # Check if NGO with the same unique_id already exists
    if NGO.query.filter_by(unique_id=data["unique_id"]).first():
        return jsonify({"message": "NGO with this unique ID already exists"}), 400

    hashed_password = hash_password(data["password"])  # Hash password using hashlib
    new_ngo = NGO(
        state=data["state"],
        district=data["district"],
        sector=data["sector"],
        ngo_type=data["ngo_type"],
        ngo_name=data["ngo_name"],
        unique_id=data["unique_id"],
        password=hashed_password  # Store hashed password
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

# NGO login route using hashlib for password verification
@ngo_bp.route('/login', methods=['POST'])
def login_ngo():
    data = request.get_json()
    unique_id = data.get('unique_id')
    password = data.get('password')

    ngo = NGO.query.filter_by(unique_id=unique_id).first()
    if not ngo:
        return jsonify({"message": "NGO not found"}), 404

    # Compare the hashed passwords
    if ngo.password != hashlib.sha256(password.encode('utf-8')).hexdigest():
        return jsonify({"message": "Invalid password"}), 401

    return jsonify({"message": "NGO logged in successfully"}), 200


@ngo_bp.route('/requests', methods=['GET'])
def get_requests():
    requests = Request.query.all()  # Get all requests from the Request table
    if not requests:
        return jsonify([])  # Ensure response is always an array
    
    request_list = [
        {
            "request_id": request.request_id,
            "ngo_id": request.ngo_id,
            "ngo_name": request.ngo_name,
            "request_type": request.request_type,
            "request_description": request.request_description,
            "ngo_state": request.ngo_state,
            "ngo_district": request.ngo_district,
            "donation_deadline": request.donation_deadline.strftime("%Y-%m-%d"),  # Format date
            "quantity": request.quantity  # Include the quantity field
        }
        for request in requests
    ]
    return jsonify(request_list)

