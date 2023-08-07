# models.py

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import validates
from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.ext.associationproxy import association_proxy
from sqlalchemy.ext.hybrid import hybrid_property
from bcrypt import hashpw, gensalt
from flask_bcrypt import Bcrypt
from config import app, db, CORS

bcrypt = Bcrypt(app)

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    fname = db.Column(db.String, nullable=False)
    lname = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    phone_number = db.Column(db.String, nullable=False)
    street_address = db.Column(db.String, nullable=False)
    city = db.Column(db.String, nullable=False)
    state = db.Column(db.String, nullable=False)
    postal_code = db.Column(db.Integer, nullable=False)
    _password_hash = db.Column(db.String, nullable=False)

    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    favorited_jobs = db.relationship('Favorite', backref='user')

    @hybrid_property
    def password_hash(self):
        return self._password_hash
    
    @password_hash.setter
    def password_hash(self, password):
        password_hash = bcrypt.generate_password_hash(
            password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, password):
        return bcrypt.check_password_hash(self._password_hash, password.encode('utf-8'))
    
    serialize_rules = ('-created_at', '-updated_at', '-favorited_jobs')

class Favorite(db.Model, SerializerMixin):
    __tablename__ = "favorited_jobs"

    id = db.Column(db.Integer, primary_key=True)
    employer_logo = db.Column(db.String)
    job_title = db.Column(db.String)
    employer_name = db.Column(db.String)
    job_city = db.Column(db.String)
    job_state = db.Column(db.String)
    job_min_salary = db.Column(db.Integer)
    job_max_salary = db.Column(db.Integer)
    job_employment_type = db.Column(db.String)
    job_apply_link = db.Column(db.String)
    job_description = db.Column(db.String)
    job_qualifications = db.Column(db.String)
    job_responsibilities = db.Column(db.String)
    job_benefits = db.Column(db.String)
    job_id = db.Column(db.String)

    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, onupdate=db.func.now())

    serialize_rules = ('-created_at', '-updated_at', '-user_id')