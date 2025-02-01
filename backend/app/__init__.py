import os

from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)

    # Load Configurations
    app.config.from_object("app.config.Config")

    # Initialize Plugins
    db.init_app(app)
    Migrate(app, db)
    CORS(app)

    # Register Blueprints
    from app.routes import register_blueprints
    register_blueprints(app)

    return app
