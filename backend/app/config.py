class Config:
    SQLALCHEMY_DATABASE_URI = "mysql+pymysql://user:password@localhost/HopeBridge"
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    CORS_HEADERS = "Content-Type"
