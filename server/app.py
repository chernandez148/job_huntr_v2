# app.py
#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
import requests

# Local imports
from config import app, db, api, CORS

from models import User, Favorite, RecentSearch

class Users(Resource):
    # Retrieves all users 
    def get(self):
        user = [user.to_dict() for user in User.query.all()]
        return make_response(jsonify(user), 200)

api.add_resource(Users, '/users')

class UserByID(Resource):
    def get(self, id):
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(user.to_dict(), 200)
        elif User.query.count() == 0:
            message = '<h1>Sorry, there are no registered users yet.</h1>'
            return make_response(message, 404)
        else:
            return make_response({"error": "No User found"}, 404)

    def patch(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        new_email = request.json.get('email')
        new_phone_number = request.json.get('phone_number')
        new_street_address = request.json.get('street_address')
        new_city = request.json.get('city')
        new_state = request.json.get('state')
        new_postal_code = request.json.get('postal_code')
        new_password = request.json.get('_password_hash')

        if new_email:
            user.email = new_email
        if new_phone_number:
            user.phone_number = new_phone_number
        if new_street_address:
            user.street_address = new_street_address
        if new_city:
            user.city = new_city
        if new_state:
            user.state = new_state
        if new_postal_code:
            user.postal_code = new_postal_code
        if new_password:
            user.password_hash = new_password

        db.session.commit()
        return make_response(user.to_dict(), 200)
    
    def delete(self, id):
        user = User.query.filter_by(id=id).first()
        if not user:
            return make_response({"error": "User not found"}, 404)
        # need to delete favorited jobs when user is deleted here
        db.session.delete(user)
        db.session.commit()
        return make_response({"message":"User successfully deleted"}, 200)
    
api.add_resource(UserByID, '/users/<int:id>')

class Login(Resource):
    # Checks credentials and logs a user in
    def post(self):
        request_json = request.get_json()
        email = request_json.get('email')
        password = request_json.get('password')

        check_user = User.query.filter(User.email == email).first()

        if check_user and check_user.authenticate(password):
            session['user_id'] = check_user.id
            response_data = check_user.to_dict(rules=('favorited_jobs', 'recent_searches'))
            return make_response(response_data, 200)
        
        return {'error': 'Unauthorized'}, 401
                
api.add_resource(Login, '/login')

class Logout(Resource):
    # Logs a user out
    def delete(self):
        session['user_id'] = None 
        response = make_response('',204)
        return response
    
api.add_resource(Logout, '/logout')

class Signup(Resource):
    # Registers a new user
    def post(self):
        request_json = request.get_json()
        fname = request_json.get('fname')
        lname = request_json.get('lname')
        email = request_json.get('email')
        phone_number = request_json.get('phone_number')
        street_address = request_json.get('street_address')
        city = request_json.get('city')
        state = request_json.get('state')
        postal_code = request_json.get('postal_code')
        password = request_json.get('password')

        new_user = User(
            fname=fname,
            lname=lname,
            email=email,
            phone_number=phone_number,
            street_address=street_address,
            city=city,
            state=state,
            postal_code=postal_code
        )

        new_user.password_hash = password

        try:
            db.session.add(new_user)
            db.session.commit()
            session['user_id'] = new_user.id
            return make_response(new_user.to_dict(), 200)
        
        except Exception as e:
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 404)
        
api.add_resource(Signup, '/signup')

class Favorites(Resource):
    def post(self):
        request_json = request.get_json()
        job_id = request_json.get('job_id')
        user_id = request_json.get('user_id')

        # Check if the job is already favorited by the user
        existing_favorite = Favorite.query.filter_by(job_id=job_id, user_id=user_id).first()
        if existing_favorite:
            return make_response({"error": "Job already saved"}, 400)  # Use 400 for bad request
        
        # If the job is not already favorited, proceed to create the favorite entry
        new_favorite = Favorite(
            employer_logo=request_json.get('employer_logo'),
            job_title=request_json.get('job_title'),
            employer_name=request_json.get('employer_name'),
            job_city=request_json.get('job_city'),
            job_state=request_json.get('job_state'),
            job_min_salary=request_json.get('job_min_salary'),
            job_max_salary=request_json.get('job_max_salary'),
            job_employment_type=request_json.get('job_employment_type'),
            job_apply_link=request_json.get('job_apply_link'),
            job_description=request_json.get('job_description'),
            job_qualifications=request_json.get('job_qualifications'),
            job_responsibilities=request_json.get('job_responsibilities'),
            job_benefits=request_json.get('job_benefits'),
            job_id=job_id,
            user_id=user_id
        )

        try: 
            db.session.add(new_favorite)
            db.session.commit()
            return make_response(new_favorite.to_dict(), 201)  # Use 201 for created
        
        except Exception as e:
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 500)  # Use 500 for server error

    def get(self):
        # Retrieves all favorite jobs
        favorites = [favorites.to_dict() for favorites in Favorite.query.all()]
        return make_response(jsonify(favorites), 200)

api.add_resource(Favorites, '/favorites')


class FavoritesByID(Resource):
    def delete(self, id):
        favorite = Favorite.query.filter_by(id=id).first()
        if not favorite:
            return make_response({"error": "Favorite not found"}, 404)
        db.session.delete(favorite)
        db.session.commit()
        return make_response({"message": "Favorite successfully deleted"}, 200)
    
api.add_resource(FavoritesByID, '/favorites/<int:id>')

class RecentSearches(Resource):
    def post(self):

        request_json = request.get_json()
        recent_search = RecentSearch(
            job_search = request_json.get('job_search'),
            location_search = request_json.get('location_search'),
            date_posted = request_json.get('date_posted'),
            remote = request_json.get('remote'),
            experience = request_json.get('experience'),
            radius = request_json.get('radius'),
            user_id = request_json.get('user_id')
        )

        try: 
            db.session.add(recent_search)
            db.session.commit()
            return make_response(recent_search.to_dict(), 201)  # Use 201 for created
        
        except Exception as e:
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 500)  # Use 500 for server error

api.add_resource(RecentSearches, '/recent_searches')

if __name__ == '__main__':
    app.run(port=5000, host="0.0.0.0", debug=True)
