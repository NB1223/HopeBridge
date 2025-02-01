from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Donor(db.Model):
    __tablename__ = "Donor"

    donor_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    phone_number = db.Column(db.String(10), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    state = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(255), nullable=False)

    def to_dict(self):
        return {
            "donor_id": self.donor_id,
            "name": self.name,
            "phone_number": self.phone_number,
            "email": self.email,
            "state": self.state,
            "district": self.district
        }

class Admin(db.Model):
    __tablename__ = "Admin"

    admin_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)

class NGO(db.Model):
    __tablename__ = "NGO"

    ngo_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    state = db.Column(db.String(100), nullable=False)
    district = db.Column(db.String(100), nullable=False)
    sector = db.Column(db.String(255), nullable=False)
    ngo_type = db.Column(db.String(100), nullable=False)
    ngo_name = db.Column(db.String(255), nullable=False)
    unique_id = db.Column(db.String(50), unique=True, nullable=False)

    def to_dict(self):
        return {
            "ngo_id": self.ngo_id,
            "state": self.state,
            "district": self.district,
            "sector": self.sector,
            "ngo_type": self.ngo_type,
            "ngo_name": self.ngo_name,
            "unique_id": self.unique_id
        }

class Request(db.Model):
    __tablename__ = "Request"

    request_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    ngo_id = db.Column(db.Integer, db.ForeignKey("NGO.ngo_id", ondelete="CASCADE"), nullable=False)
    ngo_name = db.Column(db.String(255), nullable=False)
    request_type = db.Column(db.Enum("Food", "Money", "Clothes", "Sanitary/Toiletries"), nullable=False)
    request_description = db.Column(db.Text, nullable=False)
    ngo_state = db.Column(db.String(100), nullable=False)
    ngo_district = db.Column(db.String(100), nullable=False)
    donation_deadline = db.Column(db.Date, nullable=False)

    ngo = db.relationship("NGO", backref=db.backref("requests", cascade="all, delete-orphan"))

    def to_dict(self):
        return {
            "request_id": self.request_id,
            "ngo_id": self.ngo_id,
            "ngo_name": self.ngo_name,
            "request_type": self.request_type,
            "request_description": self.request_description,
            "ngo_state": self.ngo_state,
            "ngo_district": self.ngo_district,
            "donation_deadline": self.donation_deadline.strftime("%Y-%m-%d")
        }

class Donation(db.Model):
    __tablename__ = "Donation"

    donation_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    donor_id = db.Column(db.Integer, db.ForeignKey("Donor.donor_id", ondelete="CASCADE"), nullable=False)
    request_id = db.Column(db.Integer, db.ForeignKey("Request.request_id", ondelete="CASCADE"), nullable=False)
    items_donated = db.Column(db.Text, nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    pickup_location = db.Column(db.String(255), nullable=False)
    drop_location = db.Column(db.String(255), nullable=False)

    donor = db.relationship("Donor", backref=db.backref("donations", cascade="all, delete-orphan"))
    request = db.relationship("Request", backref=db.backref("donations", cascade="all, delete-orphan"))

    def to_dict(self):
        return {
            "donation_id": self.donation_id,
            "donor_id": self.donor_id,
            "request_id": self.request_id,
            "items_donated": self.items_donated,
            "quantity": self.quantity,
            "pickup_location": self.pickup_location,
            "drop_location": self.drop_location
        }
