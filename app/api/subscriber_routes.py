from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Video, Comment, subscribers, Like


subscriber_routes = Blueprint("subscribers", __name__)


@subscriber_routes.route("/")
def get_all_subscribers():
    pass
