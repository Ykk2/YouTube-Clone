from app.models import db, Like, environment, SCHEMA

def seed_likes():

    likes = [
        {
            user_id:
            video_id:
        }
    ]


    for like in likes:
        new_likes = Like(
            user_id = like.user_id,
            video_id = like.video_id,
        )
        db.session.add(new_likes)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.likes RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM likes")

    db.session.commit()
