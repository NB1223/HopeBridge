import os

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()  # Initialize the database object

def create_app():
    app = Flask(__name__)

    # Load Configurations (Make sure to have a 'Config' class in app/config.py)
    app.config.from_object("app.config.Config")

    # Initialize Plugins
    db.init_app(app)
    Migrate(app, db)
    CORS(app)  # Enable Cross-Origin Resource Sharing for API calls

    # Register Blueprints (the blueprints are imported from app/routes/__init__.py)
    from app.routes import register_blueprints
    register_blueprints(app)

    return app
