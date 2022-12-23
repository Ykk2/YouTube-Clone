
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideos } from "../../store/video"
import './home.css'


const HomePage = () => {

    const dispatch = useDispatch()
    const videos = useSelector(state => Object.values(state.video.videos))

    useEffect(() => {
        dispatch(getVideos())
    }, [dispatch])


    return (
        <div className="main-page">
            {videos.map(video => (
                <div className="video-card" key={video.id}>
                    <video
                        onMouseOver={event => setTimeout(event.target.play(), 2000)}
                        onMouseOut={event => event.target.pause()}
                        >
                        <source src={video.videoUrl} type="video/mp4" />
                    </video>
                    <div className="video-card-info">
                        <div id="video-card-info-left">
                            circle
                        </div>
                        <div id="video-card-info-right">
                            <p>{video.title}</p>
                            <p>{video.user.username}</p>
                            <span>{video.totalViews} views {video.createdAt}</span>
                        </div>
                    </div>
                </div>
            ))}
        </div>
)}

export default HomePage
