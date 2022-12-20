from app.models import db, User, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():

    users = [
        {
            "username": 'user1',
            "email": 'user1@aa.io',
            "first_name": 'user1_firstname',
            "last_name": 'user1_lastname',
            "password": 'password'
        },
        {
            "username": 'user2',
            "email": 'user2@aa.io',
            "first_name": 'user2_firstname',
            "last_name": 'user2_lastname',
            "password": 'password'
        },
        {
            "username": 'user3',
            "email": 'user3@aa.io',
            "first_name": 'user3_firstname',
            "last_name": 'user3_lastname',
            "password": 'password'
        },
        {
            "username": 'user4',
            "email": 'user4@aa.io',
            "first_name": 'user4_firstname',
            "last_name": 'user5_lastname',
            "password": 'password'
        },
        {
            "username": 'user5',
            "email": 'user5@aa.io',
            "first_name": 'user5_firstname',
            "last_name": 'user5_lastname',
            "password": 'password'
        },
        {
            "username": 'user6',
            "email": 'user6@aa.io',
            "first_name": 'user6_firstname',
            "last_name": 'user6_lastname',
            "password": 'password'
        },
    ]

    for user in users:
        new_user = User(
            username = user.username,
            email = user.email,
            first_name = user.first_name,
            last_name = user.last_name,
            password = user.password)
        db.session.add(new_user)

    db.session.commit()


def undo_users():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM users")

    db.session.commit()
