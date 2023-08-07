# app.py
#!/usr/bin/env python3

# Standard library imports

# Remote library imports
from flask import request, session, make_response, jsonify, abort
from flask_restful import Resource
from sqlalchemy.exc import IntegrityError
from flask_bcrypt import Bcrypt
import requests

# Local imports
from config import app, db, api, CORS

from models import User, Favorite

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
            response_data = check_user.to_dict()
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

class GeoLocation(Resource):
    # Retrieves your nearest location
    def get(self):
        url = "https://ip-geo-location.p.rapidapi.com/ip/check"
        querystring = {
            "format": "json"
        }
        headers = {
            "X-RapidAPI-Key": "87a13bb857msh6d480686553cc77p1415cajsn5fd5ebf1bbd6",
            "X-RapidAPI-Host": "ip-geo-location.p.rapidapi.com"
        }

        try:
            response = requests.get(url, querystring, headers=headers)

            if response.status_code == 200:
                data = response.json()
                return make_response(jsonify(data), 200)
            else:
                return make_response({'error': 'API request failed'}, 500)
        except requests.exceptions.RequestException as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(GeoLocation, '/location')


class Jobs(Resource):
    # Retrieves job listings
    def get(self):
        url = 'https://jsearch.p.rapidapi.com/search?'
        headers = {
            'X-RapidAPI-Key': 'KJwZZIJSFimshuivMSVGaiYzkRomp15f2vKjsnK4bKzuUzVLzA',
            'Content-Type': 'application/json'
        }
        # Set default query parameters
        params = {
            'radius': '25',
            'page': 3,
            'num_pages': 20,
            'date_posted': "",
            'remote_job_only': "",
            'employment-type': "",
            'job-requierment': '',
            'radius': ""
        }

        # Retrieve the location from the GeoLocation resource
        location_response = requests.get('http://127.0.0.1:5000/location')
        if location_response.status_code == 200:
            location_data = location_response.json()
            location = location_data.get('city', {}).get('name')
            if location:
                # If location is available, update the 'query' parameter accordingly
                params['query'] = f'jobs in {location}, US'

        try:
            response = requests.get(url, headers=headers, params=params)

            if response.status_code == 200:
                data = response.json()
                return make_response(jsonify(data), 200)
            else:
                return make_response({'error': 'API request failed'}, 500)
        except requests.exceptions.RequestException as e:
            return make_response({'error': str(e)}, 500)

api.add_resource(Jobs, '/jobs')



class Favorites(Resource):
    # Saves a job to a favorite list
    def post(self):
        request_json = request.get_json()
        employer_logo = request_json.get('employer_logo')
        job_title = request_json.get('job_title')
        employer_name = request_json.get('employer_name')
        job_city = request_json.get('job_city')
        job_state = request_json.get('job_state')
        job_min_salary = request_json.get('job_min_salary')
        job_max_salary = request_json.get('job_max_salary')
        job_employment_type = request_json.get('job_employment_type')
        job_apply_link = request_json.get('job_apply_link')
        job_description = request_json.get('job_description')
        job_qualifications = request_json.get('job_qualifications')
        job_responsibilities = request_json.get('job_responsibilities')
        job_benefits = request_json.get('job_benefits')
        job_id = request_json.get('job_id')
        user_id = request_json.get('user_id')

        new_favorite = Favorite(
            employer_logo=employer_logo,
            job_title = job_title,
            employer_name = employer_name,
            job_city = job_city,
            job_state = job_state,
            job_min_salary = job_min_salary,
            job_max_salary = job_max_salary,
            job_employment_type = job_employment_type,
            job_apply_link = job_apply_link,
            job_description = job_description,
            job_qualifications = job_qualifications,
            job_responsibilities = job_responsibilities,
            job_benefits = job_benefits,
            job_id = job_id,
            user_id = user_id
        )

        try: 
            db.session.add(new_favorite)
            db.session.commit()
            return make_response(new_favorite.to_dict(), 200)
        
        except Exception as e:
            print(e)
            return make_response({'error': 'Unprocessable Entity'}, 404)
        
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

if __name__ == '__main__':
    app.run(port=5000, host="0.0.0.0", debug=True)
