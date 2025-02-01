from app.routes.admin import admin_bp
from app.routes.donors import donors_bp
from app.routes.ngos import ngos_bp
from flask import Blueprint


def register_blueprints(app):
    app.register_blueprint(admin_bp, url_prefix="/admin")
    app.register_blueprint(donors_bp, url_prefix="/donor")
    app.register_blueprint(ngos_bp, url_prefix="/ngo")
