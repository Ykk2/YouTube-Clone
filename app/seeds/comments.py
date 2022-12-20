from app.models import db, Comment, environment, SCHEMA

def seed_comments():

    comments = [
        {
            user_id:
            video_id:
            comment:
        }
    ]






    for comment in comments:
        new_comment = Comment(
            user_id = comment.user_id,
            video_id = comment.video_id,
            comment = comment.comment
        )
        db.session.add(new_comment)

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM comments")

    db.session.commit()
