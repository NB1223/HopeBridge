import os


class Config:
    # Set up the main database URI with mysql+mysqlconnector to ensure compatibility
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL', 
        'mysql+mysqlconnector://root:Jeevana%4005@localhost/HopeBridge'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False