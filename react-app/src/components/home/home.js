
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideos } from "../../store/videos"
import SideBar from '../Sidebar/SideBar';
import { NavLink } from "react-router-dom";
import './home.css'


const HomePage = () => {

    const dispatch = useDispatch()
    const videos = useSelector(state => Object.values(state.videos.videos))

    useEffect(() => {
        dispatch(getVideos())
    }, [dispatch])


    return (
        <div>
            <SideBar />
            <div className="main-page">
                {videos.map(video => (
                    <NavLink to={`/videos/${video.id}`}>
                        <div className="video-card" key={video.id}>
                            <video
                                onMouseOver={event => event.target.play()}
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
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default HomePage
