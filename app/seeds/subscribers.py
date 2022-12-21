from app.models import db, subscribers, environment, SCHEMA

def seed_comments():

    subscribers = [
        {
            "user_id": 1,
            "subscriber_id": 2
        },
        {
            "user_id": 1,
            "subscriber_id": 3
        },
        {
            "user_id": 2,
            "subscriber_id": 4
        },
        {
            "user_id": 3,
            "subscriber_id": 5
        },
        {
            "user_id": 4,
            "subscriber_id": 6
        },
        {
            "user_id": 5,
            "subscriber_id": 3
        }
    ]

    for subscriber in subscribers:
        new_follow = subscribers.insert().values(
            user_id = subscriber.user_id,
            subscriber_id = subscriber.subscriber_id
        )
        db.session.add(new_follow)

    db.session.commit()



def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.subscribers RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM subscribers")

    db.session.commit()
