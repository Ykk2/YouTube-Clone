import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Modal } from "../../context/Modal"
import SideBar from "../Sidebar/SideBar"
import { getUserVideos } from "../../store/videos"
import EditVideo from "../EditVideo"
import DeleteVideo from "../DeleteVideo"
import "./profilepage.css"

const ProfilePage = () => {

    const dispatch = useDispatch()

    const user = useSelector(state => state.session.user)
    const videos = useSelector(state => Object.values(state.videos.videos))

    const [editting, setEditting] = useState(false)
    const [deleting, setDeleting] = useState(false)


    useEffect(() => {
        dispatch(getUserVideos(user.id))
    }, [dispatch, user.id])

    const handleVideoEditClick = (e) => {
        e.preventDefault()
        setEditting(true)

    }

    const handleVideoDeleteClick = (e) => {
        e.preventDefault()
        setDeleting(true)

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
                    <div className="my-video-card-container">
                        <div className="my-video-card-top">
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
                                    </div>
                                </div>
                            </NavLink>
                        </div>
                        <div className="my-video-card-bottom">
                            <button onClick={handleVideoEditClick}>Edit</button>
                            <button onClick={handleVideoDeleteClick}>Delete</button>
                        </div>
                        {
                            editting &&
                            <Modal onClose={() => setEditting(false)}>
                                <EditVideo setEditting={setEditting} video={video}/>
                            </Modal>
                        }
                        {
                            deleting &&
                            <Modal onClose={() => setDeleting(false)}>
                                <DeleteVideo setDeleting={setDeleting} id={video.id}/>
                            </Modal>
                        }
                    </div>
                    ))}
            </div>
        </div>
    )
}


export default ProfilePage