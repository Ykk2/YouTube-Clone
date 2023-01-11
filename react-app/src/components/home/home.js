import { useEffect, useSelector } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideos } from "../../store/videos"
import SideBar from '../Sidebar/SideBar';
import NavBar from "../Navigation/NavBar";
import VideoCard from "./videoCard";
import VideoPreview from "./videoPreview";
import './home.css'


const HomePage = () => {

    const dispatch = useDispatch()

    const videos = useSelector(state => Object.values(state.videos.videos))

    const [focused, setFocused] = (false)

    useEffect(() => {
        dispatch(getVideos())
    }, [dispatch])


    return (
        <div>
            <NavBar />
            <SideBar />
            <div className="main-page">
                {videos.map(video => (
                    focused ?
                    <VideoPreview setFocused={setFocused} video={video}/>
                    :
                    <VideoCard setFocused={setFocused} video={video}/>
                ))}
            </div>
        </div>
    )
}

export default HomePage
