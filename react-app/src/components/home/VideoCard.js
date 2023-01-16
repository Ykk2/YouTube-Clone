import { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getVideos } from "../../store/videos"
import SideBar from '../Sidebar/SideBar';
import NavBar from "../Navigation/NavBar";
import { NavLink } from "react-router-dom";
import { dateConverter, viewsConverter } from "../../store/helper";
import './home.css'


const VideoCard = ({video}) => {

    const [timerId, setTimerId] = useState()
    const [focus, setFocus] = useState(false)
    const [show, setShow] = useState(false)

    const controlPreview = (e) => {
        e.preventDefault()
        e.stopPropagation()
        const timer = setTimeout(() => { setShow(true)
                                         e.target.play()
                                         setFocus(true)

                                          }, 2000)
        setTimerId(timer)
    }

    const cancelPreview = (e) => {
        e.preventDefault()
        e.stopPropagation()
        // const ele = document.getElementById(`video${video.id}`)
        // ele?.setAttribute("style", "")
        e.target.pause()
        clearTimeout(timerId)
        setTimerId(false)
        setFocus(false)
        setShow(false)
    }

    // const setPosition = () => {
    //     const ele = document.getElementById(`video${video.id}`)
    //     const elepos = ele?.getBoundingClientRect()
    //     ele.style.position = 'absolute'
    //     ele.style.left = `${elepos.x}px`
    //     ele.style.top = `${elepos.y}px`
    // }

    return (
            <NavLink id={`video${video.id}`} to={`/videos/${video.id}`}>
                <div className={ focus ? "video-card-preview" : "video-card"} key={video.id}>
                    <video
                        onMouseOver={event => controlPreview(event)}
                        onMouseOut={event => cancelPreview(event) }
                    >
                        <source src={video.videoUrl} type="video/mp4" />
                    </video>
                    <div className="video-card-info">
                        <div id="video-card-info-left">

                        </div>
                        <div id="video-card-info-right">
                            <p>{video.title}</p>
                            <p>{video.user.username}</p>
                            <span>{viewsConverter(video.totalViews)} {dateConverter(video.createdAt)}</span>
                        </div>
                    </div>
                </div>
            </NavLink>
    )
}

export default VideoCard
