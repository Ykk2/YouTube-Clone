import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { useParams, NavLink } from "react-router-dom";
import { getComments, postComment, deleteComment, putComment } from "../../store/comments"
import { getVideo, getVideos } from "../../store/videos"
import NavBar from "../Navigation/NavBar";
import './videoDetails.css'


const VideoDetails = () => {

    const dispatch = useDispatch()

    const { videoId } = useParams()
    const videos = useSelector(state => Object.values(state.videos.videos))
    const video = useSelector(state => state.videos.video)
    const comments = useSelector(state => Object.values(state.comments.comments))

    const [focused, setFocused] = useState(false)
    const [comment, setComment] = useState("")
    const [commentSubmit, setCommentSubmit] = useState("")

    useEffect(() => {
        dispatch(getComments(videoId))
        dispatch(getVideos())
        dispatch(getVideo(videoId))
    }, [dispatch, videoId])

    useEffect(() => {
        if (comment.length <= 0) setCommentSubmit('comment-not-ready')
        else setCommentSubmit('comment-ready')
    }, [comment])


    const updateComment = (e) => {
        e.preventDefault()
        setComment(e.target.value)
        e.target.style.height = "10px"
        e.target.style.height = `${e.target.scrollHeight}px`

    }

    const handleCommentSubmit = (e) => {
        e.preventDefault()

        dispatch(postComment({comment}, videoId))
        setFocused(false)
    }

    const showOptions = () => {
        setFocused(true)
    }

    const hideOptions = () => {
        setFocused(false)
    }

    return (
        <>
            <NavBar />
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
                            circle
                        </div>
                        <div>
                            <textarea
                                type='text'
                                name='comment-box'
                                onChange={updateComment}
                                value={comment}
                                onFocus={showOptions}
                                placeholder="Add a comment..."
                                maxLength='1000'
                                />
                            { focused ?
                                <span>
                                    <button onClick={hideOptions}>Cancel</button>
                                    <button className={`${commentSubmit}`} onClick={handleCommentSubmit}>Comment</button>
                                </span>
                                :
                                null
                            }
                        </div>
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
                                        onMouseOut={event => event.target.pause()} />
                                    <div className="recommended-videos-info">
                                        <div>title</div>
                                        <div>channel</div>
                                        <span>views createdAt</span>
                                    </div>
                                </div>
                            </NavLink>
                        }
                        return null
                    }
                    )}
                </div>
            </div>
        </>
    )
}


export default VideoDetails
