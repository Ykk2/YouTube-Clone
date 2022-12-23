from flask import Flask, Blueprint, request
from flask_login import login_required, current_user
from ..models import db, Video, Comment, subscribers, Like, User


subscriber_routes = Blueprint("subscribers", __name__)


@subscriber_routes.route("/<int:userId", methods=['POST'])
@login_required
def subscribe(userId):

    subscriber = User.query.get(current_user.id)
    user = User.query.get(userId)

    if (user.subscribed.filter(subscribers.c.subscriber_id == subscribers.user_id).count() > 0):
        return { "error": "User is already following this user"}

    user.subscribed.append(subscriber)

    db.session.commit()

    return {"message": "Succesfully subscribed"}

@subscriber_routes.route("/<int:userId", methods=['DELETE'])
@login_required
def unsubscribe(userId):

    subscriber = User.query.get(current_user.id)
    user = User.query.get(userId)

    if (user.subscribed.filter(subscribers.c.subscriber_id == subscribers.user_id).count() <= 0):
        return { "error": "User does not follow this user yet"}

    user.subscribed.remove(subscriber)
    db.session.commit()

    return {'message': "Succesfully unsubscribed"}
