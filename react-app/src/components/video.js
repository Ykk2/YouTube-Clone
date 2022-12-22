
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideos } from "../store/video"



const TestingVideos = () => {

    const dispatch = useDispatch()
    const videos = useSelector(state => Object.values(state.video.videos))

    useEffect(() => {
        dispatch(getVideos())
    }, [dispatch])

    return (
        <>
        {videos.map(video => (
            <video controls width="250">
                <source src={video.videoUrl} type="video/mp4" />
            </video>

        ))}

        </>

)}

export default TestingVideos
