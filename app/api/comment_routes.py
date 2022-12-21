from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Video, Comment, subscribers, Like


comment_routes = Blueprint("comments", __name__)


@comment_routes.route("/")
def get_all_comment():
    pass
