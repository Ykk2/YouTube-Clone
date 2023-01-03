import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { useParams, NavLink } from "react-router-dom";
import { getComments } from "../../store/comments"
import { getVideo, getVideos } from "../../store/videos"
import './videoDetails.css'


const VideoDetails = () => {

    const dispatch = useDispatch()

    const { videoId } = useParams()
    const videos = useSelector(state => Object.values(state.videos.videos))
    const video = useSelector(state => state.videos.video)
    const comments = useSelector(state => Object.values(state.comments.comments))



    useEffect(() => {
        dispatch(getComments(videoId))
        dispatch(getVideos())
        dispatch(getVideo(videoId))
    }, [dispatch, videoId])



    return (
        <div className="video-details">
            <div className="main-content">
                <div className="main-video">
                    <video src={video?.videoUrl} controls autoPlay />
                </div>
                <div className="video-info">
                    <div id="video-title">
                        {video.title}
                    </div>
                    <div id="channel-info">
                        <div id="channel-info-left">
                            <div id="channel-info-left-left">
                                <div>
                                    icon
                                </div>
                                <div>
                                    <div>{video?.user?.username}</div>
                                    <div>{video?.user?.subscribers} subscribers</div>
                                </div>
                            </div>
                            <button>
                                Subscribe
                            </button>
                        </div>
                        <div id="channel-info-right">
                            <button>Upvote</button>
                            <span>{video.likes}</span>
                            <button>Downvote</button>
                        </div>
                    </div>
                </div>
                <div>
                    {`${comments.length} Comments`}
                </div>
                <div className="comment-box">
                    <div>
                        user icon goes here
                    </div>
                    <input>

                    </input>
                </div>
                <div className="video-comments">
                    {comments.map(comment => (
                        <span>{comment.comment}</span>
                    ))}
                </div>
            </div>

            <div className="recommended-videos">
                {videos.map(video => {
                    if (video.id !== +videoId) {
                    return <NavLink to={`/videos/${video.id}`}>
                                <div className="recommended-videos-card">
                                    <video src={video?.videoUrl}
                                        muted
                                        onMouseOver={event => event.target.play()}
                                        onMouseOut={event => event.target.pause()}/>
                                    <div className="recommended-videos-info">
                                        <div>title</div>
                                        <div>channel</div>
                                        <span>views createdAt</span>
                                    </div>
                                </div>
                            </NavLink>
                    }
                }
                )}
            </div>
        </div>
    )
}


export default VideoDetails
