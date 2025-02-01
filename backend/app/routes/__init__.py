from app.routes.admin import admin_bp
from app.routes.donors import donor_bp
from app.routes.ngos import ngo_bp
from flask import Blueprint


def register_blueprints(app):
    app.register_blueprint(admin_bp, url_prefix="/admin")
    app.register_blueprint(donor_bp, url_prefix="/donor")
    app.register_blueprint(ngo_bp, url_prefix="/ngo")
    # app.register_blueprint(login_bp, url_prefix='/login') 
