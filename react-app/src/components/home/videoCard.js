import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { NavLink } from "react-router-dom";
import { dateConverter, viewsConverter } from "../../store/helper";


export const VideoCard = ({video, setFocused}) => {




    return (
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
