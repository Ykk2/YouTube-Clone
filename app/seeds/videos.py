from app.models import db, Video, environment, SCHEMA

def seed_videos():
    videos = [
        {
            "owner_id": 1,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-After+Hanabi+-Listen+to+My+Beats--(1080p).mp4",
            "title": "After Hanabi -Listen to My Beats",
            "description": "Description for video 1",
            "total_views": 999,
            "preview_image": "https://i.ytimg.com/vi/0jFzOnDQmA4/hq720.jpg?sqp=-oaymwEcCNAFEJQDSFXyq4qpAw4IARUAAIhCGAFwAcABBg==&rs=AOn4CLAVAcbCHrA9Rn2v0iqoNkrretD11Q"
        },
        {
            "owner_id": 2,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-Logic+-+All+I+Do+(Official+Audio)-(1080p).mp4",
            "title": "All I Do (Official Audio)",
            "description": "Description for video 2",
            "total_views":500000,
            "preview_image": "https://i.ytimg.com/an_webp/ZPhfVXQDU2Y/mqdefault_6s.webp?du=3000&sqp=CL6mjZ0G&rs=AOn4CLDLcn2xPCBRjUN_u6sZNhT3Id9B5w"
        },
        {
            "owner_id": 3,
            "video_url": "https://ykk-youtubeclone.s3.us-west-2.amazonaws.com/yt5s.io-RYAN+HAYASHI+on+Penn+%26+Teller+FOOL+US+-+Complete+Version+With+EPIC+EMOTIONAL+ENDING-(1080p)+(1).mp4",
            "title": "RYAN HAYASHI on Penn & Teller FOOL US - Complete Version With EPIC EMOTIONAL ENDING",
            "description": "Description for video 3",
            "total_views": 1000000,
            "preview_image": "https://i.ytimg.com/an_webp/kjURsDCIJws/mqdefault_6s.webp?du=3000&sqp=CLiNjZ0G&rs=AOn4CLAw4QU7TlUcvcWJE5pVbxMmrY6S2w"
        }
    ]

    for video in videos:
        new_video = Video(
            owner_id = video['owner_id'],
            video_url = video['video_url'],
            title = video['title'],
            description = video['title'],
            total_views = video['total_views'],
            preview_image = video['preview_image']
        )
        db.session.add(new_video)

    db.session.commit()

def undo_videos():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.videos RESTART IDENTITY CASCADE;")
    else:
        db.session.execute("DELETE FROM videos")

    db.session.commit()
