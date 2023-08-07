# seed.py
#!/usr/bin/env python3
from faker import Faker

# Local imports
from app import app
from config import db
from models import User, Favorite
fake = Faker()

with app.app_context():

    print("Starting seed...")
    # Seed code goes here!

    print('Deleting existing data...')
    User.query.delete()
    Favorite.query.delete()

    # create seed data for User model
    for i in range(10):
        user = User(
            fname=fake.first_name(),
            lname=fake.last_name(),
            email=fake.email(),
            phone_number=fake.phone_number(),
            street_address=fake.street_address(),
            city=fake.city(),
            state=fake.state(),
            postal_code = fake.pyint(),
            password_hash=fake.password(),
        )
        db.session.add(user)

    db.session.commit()