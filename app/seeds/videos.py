from app.models import db, Video, environment, SCHEMA

def seed_videos():
    videos = [
        {
            owner_id:
            video_url:
            title:
            description:
            total_views:
            preview_image:
        }
    ]

    for video in videos:
        new_video = Video(
            owner_id = video.owner_id,
            video_url = video.video_url,
            title = video.title,
            description = video.title,
            total_views = video.total_views,
            preview_image = video.preview_image
        )
        db.session.add(new_video)

    db.session.commit()

def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM videos")

    db.session.commit()
