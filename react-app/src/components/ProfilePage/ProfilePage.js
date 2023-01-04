import { NavLink } from "react-router-dom"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import SideBar from "../Sidebar/SideBar"
import { getUserVideos } from "../../store/videos"
import "./profilepage.css"

const ProfilePage = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const videos = useSelector(state => Object.values(state.videos.videos))

    useEffect(() => {
        dispatch(getUserVideos(user.id))
    }, [dispatch, user.id])

    const handleVideoEditClick = () => {

    }


    return (
        <div className="profile-page-main">
            <SideBar />
            <div className="profile-page-top">
                <div>icon goes here</div>
                <div className="profile-page-userinfo">
                    <div>{user.firstName} {user.lastName}</div>
                    <div>{`@${user.username}`}</div>
                    <div>{user.subscribers} subscribers</div>
                </div>
            </div>
            <div className="profile-page-options">
                <span>Home</span>
                <span>Channels</span>
            </div>
            <div className="my-video-container">
                {videos.map(video => (
                        <NavLink to={`/videos/${video.id}`}>
                            <div className="my-video-card" key={video.id}>
                                <video>
                                    <source src={video.videoUrl} type="video/mp4" />
                                </video>
                                <div className="my-video-card-info">
                                    <div className="my-video-card-info-left">
                                        <p>{video.title}</p>
                                        <span>{video.totalViews} views</span>
                                        <span>{video.createdAt}</span>
                                    </div>
                                    <div className="my-video-card-info-right">
                                        <button>Edit</button>
                                        <button>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </NavLink>
                    ))}
            </div>
        </div>
    )
}


export default ProfilePage
