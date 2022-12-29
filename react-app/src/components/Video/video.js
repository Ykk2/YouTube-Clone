import { useSelector, useDispatch } from "react-redux"
import { useEffect } from "react"
import { getComments } from "../../store/comments"
import { getVideo } from "../../store/video"


const VideoDetails = ({videoId}) => {

    const dispatch = useDispatch()

    const videos = useSelector(state => state.video.videos)
    const video = useSelector(state => state.video.video)


    const comments = useSelector(state => state.comments)

    useEffect(() => {
        dispatch(getComments())
        dispatch(getVideo)
    }, [dispatch])


    return(
        <>
            <div className="main-content">
                <div className="main-video">

                </div>
                <div className="video-info">
                    <div id="video-title">

                    </div>
                    <div id="channel-info">
                        <div id="channel-info-left">
                            <div id="channel-info-left-left">
                                <div>
                                    icon
                                </div>
                                <div>
                                    <span>channel name</span>
                                    <span>subcriber number</span>
                                </div>
                            </div>
                            <button>
                                Subscribe
                            </button>
                        </div>
                        <div id="channel-info-right">
                            <button>Upvote</button>
                            <span>Upvote number</span>
                            <button>Downvote</button>
                            <button>Download</button>
                        </div>
                    </div>
                    <div>
                        Number of comments
                    </div>
                    <div className="comment-box">
                        <div>
                            user icon goes here
                        </div>
                        <input>

                        </input>
                    </div>
                </div>
            </div>
            <div className="recommended-videos">

            </div>
            <div className="video-comments">

            </div>
        </>
    )
}


export default VideoDetails
