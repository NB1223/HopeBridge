import hashlib

from app.models import NGO, Request, db
from flask import Blueprint, jsonify, request

ngo_bp = Blueprint("ngo", __name__)

# Hash password manually using hashlib
def hash_password(password):
    return hashlib.sha256(password.encode('utf-8')).hexdigest()

# Check password manually using hashlib
def check_password(stored_hash, password):
    return stored_hash == hashlib.sha256(password.encode('utf-8')).hexdigest()

@ngo_bp.route("/register", methods=["POST"])
def register_ngo():
    data = request.get_json()
    state = data["state"]
    district = data["district"]
    sector = data["sector"]
    ngo_type = data["ngo_type"]  
    ngo_name = data["ngo_name"] 
    unique_id = data["unique_id"]  
    password = data["password"]

    # Check if NGO with the same unique_id already exists
    if NGO.query.filter_by(unique_id=unique_id).first():
        return jsonify({"message": "NGO with this unique ID already exists"}), 400

    hashed_password = hash_password(password)  # Hash password
    new_ngo = NGO(
        state=state,
        district=district,
        sector=sector,
        ngo_type=ngo_type,
        ngo_name=ngo_name,
        unique_id=unique_id,
        password=hashed_password  # Store hashed password
    )

    db.session.add(new_ngo)
    db.session.commit()
    return jsonify({"message": "NGO registered successfully"}), 201


# Get all NGOs
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

# NGO Login
@ngo_bp.route('/login', methods=['POST'])
def login_ngo():
    data = request.get_json()
    unique_id = data.get('unique_id')
    password = data.get('password')

    ngo = NGO.query.filter_by(unique_id=unique_id).first()
    if not ngo:
        return jsonify({"message": "NGO not found"}), 404

    # Compare the hashed passwords
    if not check_password(ngo.password, password):
        return jsonify({"message": "Invalid password"}), 401

    return jsonify({"message": "NGO logged in successfully"}), 200

# Add a Donation Request (New Route)
@ngo_bp.route('/add-requests', methods=['POST'])
def add_request():
    data = request.get_json()
    
    # Verify if NGO exists
    ngo = NGO.query.filter_by(ngo_name=data.get('ngo_name')).first()
    if not ngo:
        return jsonify({"message": "NGO not found"}), 404

    # Ensure ngo_state and ngo_district have default values if missing
    ngo_state = data.get('ngo_state', 'Unknown')
    ngo_district = data.get('ngo_district', 'Unknown')

    new_request = Request(
        ngo_id=ngo.ngo_id,
        ngo_name=data['ngo_name'],
        request_type=data['request_type'],
        request_description=data['request_description'],
        ngo_state=ngo_state,
        ngo_district=ngo_district,
        donation_deadline=data['donation_deadline'],
        quantity=data['quantity']
    )

    try:
        db.session.add(new_request)
        db.session.commit()
        return jsonify({"message": "Request added successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"message": str(e)}), 500

@ngo_bp.route('/list-requests', methods=['GET'])
def get_requests():
    requests = Request.query.all()
    if not requests:
        return jsonify([])  # Ensure response is always an array
    
    request_list = [
        {
            "request_id": request.request_id,
            "ngo_id": request.ngo_id,
            "ngo_name": request.ngo_name,
            "request_type": request.request_type,
            "request_description": request.request_description,
            "donation_deadline": request.donation_deadline.strftime("%Y-%m-%d"),
            "quantity": request.quantity
        }
        for request in requests
    ]
    return jsonify(request_list)

# Get all donation requests for a specific NGO
@ngo_bp.route('/requests/<string:unique_id>', methods=['GET'])
def get_requests_by_unique_id(unique_id):
    # Fetch NGO using unique_id
    ngo = NGO.query.filter_by(unique_id=unique_id).first()

    # If NGO not found
    if not ngo:
        return jsonify({"message": "NGO not found"}), 404

    # Get the ngo_id from the NGO record
    ngo_id = ngo.ngo_id

    # Fetch requests for that specific ngo_id
    requests = Request.query.filter_by(ngo_id=ngo_id).all()

    # If no requests are found
    if not requests:
        return jsonify([])  # Return an empty list if no requests found

    # Format the response with request details
    request_list = [
        {
            "request_id": req.request_id,
            "ngo_id": req.ngo_id,
            "ngo_name": req.ngo_name,
            "request_type": req.request_type,
            "request_description": req.request_description,
            "ngo_state": req.ngo_state,
            "ngo_district": req.ngo_district,
            "donation_deadline": req.donation_deadline.strftime("%Y-%m-%d"),
            "quantity": req.quantity
        }
        for req in requests
    ]
    
    return jsonify(request_list), 200

