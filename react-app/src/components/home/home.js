import { useEffect  } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideos } from "../../store/videos"
import NavBar from "../Navigation/NavBar";
import VideoCard from "./VideoCard";
import './home.css'


const HomePage = () => {

    const dispatch = useDispatch()
    const videos = useSelector(state => Object.values(state.videos.videos))

    useEffect(() => {
        dispatch(getVideos())
    }, [dispatch])

    return (
        <div>
            <div className="main-page">
                {videos.map(video => (
                    <VideoCard video={video}/>
                ))}
            </div>
        </div>
    )
}

export default HomePage
