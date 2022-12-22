from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Video, Comment, subscribers, Like, User
from ..forms import VideoForm
from .aws import (allowed_file, get_unique_filename, upload_file_to_s3, delete_file_from_s3)

video_routes = Blueprint("videos", __name__)


# GET ALL VIDEOS
@video_routes.route("/")
def get_all_videos():

    videos_query = Video.query.all()
    videos = [video.to_dict() for video in videos_query]
    return {"videos": videos}


#GET VIDEO BY videoID
@video_routes.route("/<int:videoId>")
def get_video_by_id(videoId):

    # try:
        video = Video.query.get(videoId).to_dict()
        return {"video": video}
    # except Exception:
    #     return {"error": "requested video not found"}, 404


#GET ALL VIDEOS OF SPECIFIC USER
@video_routes.route("/user/<int:userId>")
@login_required
def get_user_videos(userId):

    videos_query = Video.query.filter_by(id = userId).all()
    videos = [video.to_dict() for video in videos_query]
    return {"videos": videos}


#GET ALL VIDEOS THE USER IS SUBSCRIBED TO
@video_routes.route("/user/subscribed/<int:userId>")
@login_required
def get_subscribed_videos(userId):

    res = []
    user = User.query.get(userId)
    subscribed_list = user.subscribed.all()
    for users in subscribed_list:
        videos_query = Video.query.filter_by(owner_id = users.id).all()
        for video in videos_query:
            res.append(video.to_dict())

    return {'videos' : res}


#EDIT VIDEO BY videoID
#USER MUST BE OWNER OF VIDEO
@video_routes.route('/<int:videoId>', methods=['PUT'])
@login_required
def edit_video(videoId):

    video = Video.query.get(videoId)
    form = VideoForm()
    # form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        setattr(video, "title", form.data["title"])
        setattr(video, "description", form.data["title"])
        setattr(video, "preview_image", form.data["preview_image"])

    db.session.commit()

    return video.to_dict()

#CREATE VIDEO
#USER MUST BE LOGGED IN
@video_routes.route('/new', methods=["POST"])
# @login_required
def new_video():
    form = VideoForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    if "video" not in request.files:
        return {"errors": "video is required"}, 400

    video = request.files['video']

    if not allowed_file(video.filename):
        return {"errors": "file type not permitted"}, 400

    video.filename = get_unique_filename(video.filename)

    upload = upload_file_to_s3(video)

    if "url" not in upload:
        return upload, 400

    video_url = upload["url"]
    title = form.data.title
    description = form.data.description
    preview_image = form.data.preview_image
    owner_id = current_user.id

    new_video = Video(owner_id = owner_id,
                      video_url = video_url,
                      title = title,
                      description = description,
                      preview_image = preview_image)

    db.session.add(new_video)
    db.session.commit()

    return {"videos" : new_video.to_dict()}

#DELETE VIDEO BY videoID
#USER MUST BE OWNER OF VIDEO
@video_routes.route("/<int:videoId>", methods=['DELETE'])
# @login_required
def delete_video(videoId):

    try:
        video = Video.query.get(videoId)
        video_url = video.video_url
        delete_file_from_s3(video_url)
        db.session.delete(video)
        db.session.commit()
        return {"message": "Succesfully Deleted"}, 202

    except Exception:
        return {"error": "requested video not found"}, 404


#INCREASE VIEW COUNT

@video_routes.route('/<int:videoId>/view', methods=['PUT'])
def increase_view_count(videoId):

    video = Video.query.get(videoId)
    new_view_count = video.total_views + 1
    setattr(video, "total_views", new_view_count)

    db.session.commit()

    return video.to_dict()


#LIKE A VIDEO
#MUST BE LOGGED IN
@video_routes.route('/<int:videoId>/like', methods=['POST'])
def like_video(videoId):

    new_like = Like(user_id = 1, video_id = videoId)

    db.session.add(new_like)
    db.session.commit()

    return { "message": "User liked the video"}

#DISLIKE A VIDEO
#MUST BE LOGGED IN

@video_routes.route('/<int:videoId>/like', methods=['DELETE'])
def dislike_video(videoId):

    like = Like.query.filter_by(user_id = 1, video_id = videoId).first()

    db.session.delete(like)
    db.session.commit()

    return { "message": "User dis-liked the video"}
