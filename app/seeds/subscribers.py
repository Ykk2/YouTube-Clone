from app.models import db, subscribers, environment, SCHEMA

def seed_comments():

    subscribers = [
        {
            user_id:
            subscriber_id:
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
