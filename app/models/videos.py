from .db import db, environment, SCHEMA, add_prefix_for_prod

class Video(db.Model):
    __tablename__ = 'videos'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    owner_id = db.Column(db.Integer, db.ForeginKey(add_prefix_for_prod('users.id')), nullable=False)
    video_url = db.Column(db.String(1000), nullable=False)
    title = db.Column(db.String(255), nullable=False, unique=True)
    description = db.Column(db.String(255))
    total_views = db.Column(db.Integer, server_default=0)
    preview_image = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, server_default=db.func.now())
    updated_at = db.Column(db.DateTime, server_default=db.func.now(),server_onupdate=db.func.now())

    users = db.relationship('User', back_populates='videos')
    comments = db.relationship('Comment', back_populates='videos')
    likes = db.relationship('Video', back_populates='videos', cascade='all, delete')


    def to_dict(self):
        return {
            'id': self.id,
            'ownerId': self.owner_id,
            'videoUrl': self.video_url,
            'title': self.title,
            'description': self.description,
            'totalViews': self.total_views,
            'previewImage': self.preview_image,
            'createdAt': self.created_at,
            'updatedAt': self.updated_at,
        }
