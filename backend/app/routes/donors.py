import hashlib

from app.models import Donor, Request, db
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
        phone_number=data["phone_number"],  # Corrected field name
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

    # Compare the hashed passwords using the check_password function
    if not check_password(donor.password, password):
        return jsonify({"message": "Invalid password"}), 401

    return jsonify({"message": "Donor logged in successfully"}), 200

@donor_bp.route("/donate", methods=["POST"])
def donate_items():
    data = request.get_json()

    donor_id = data.get("donor_id")
    request_id = data.get("request_id")
    items_donated = data.get("items_donated")
    quantity = data.get("quantity")

    # Validate fields
    if not donor_id:
        return jsonify({"message": "Donor ID not found. Please log in again."}), 400
    if not request_id:
        return jsonify({"message": "Request ID is missing."}), 400
    if not items_donated or not quantity:
        return jsonify({"message": "Missing donation details."}), 400

    # Verify donor exists
    donor = Donor.query.filter_by(donor_id=donor_id).first()
    if not donor:
        return jsonify({"message": "Invalid donor ID. Please log in again."}), 400
# Assuming a table 'DonationRequest' where requests are stored
    requestF = Request.query.filter_by(request_id=request_id).first()

    if not requestF:
        return jsonify({"message": "Invalid request ID"}), 400

    # Insert into the donation table
    try:
        connection = db.engine.raw_connection()
        cursor = connection.cursor()
        cursor.execute("CALL InsertDonation(%s, %s, %s, %s)", 
                       (donor_id, request_id, items_donated, quantity))
        connection.commit()
        cursor.close()
        connection.close()
        return jsonify({"message": "Donation submitted successfully"}), 201
    except Exception as e:
        print(f"Error: {str(e)}")  # Log the error for debugging
        return jsonify({"message": f"Error: {str(e)}"}), 500


@donor_bp.route("/get-id", methods=["GET"])
def get_donor_id():
    email = request.args.get("email")
    if not email:
        return jsonify({"message": "Email is required"}), 400

    donor = Donor.query.filter_by(email=email).first()
    
    if donor:
        print(f"✅ Donor Found: {donor.donor_id}, Email: {donor.email}")  # Debugging output
        return jsonify({"donor_id": donor.donor_id}), 200
    else:
        print(f"❌ Donor Not Found for Email: {email}")  # Debugging output
        return jsonify({"message": "Donor not found"}), 404

