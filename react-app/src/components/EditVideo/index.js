
import { useState } from "react"
import { putVideo } from "../../store/videos"
import { useDispatch } from "react-redux"
import '../EditVideo/editvideo.css'



const EditVideo = ({ setEditting, video }) => {

    const [title, setTitle] = useState(`${video.title}`)
    const [description, setDescription] = useState(`${video.description}`)

    const dispatch = useDispatch()

    const updateTitle = (e) => {
        setTitle(e.target.value);
    };

    const updateDescription = (e) => {
        setDescription(e.target.value)
    }

    const submitEditClick = (e) => {
        const data = e.target.value
        dispatch(putVideo(data))
    }

    return (
        <div className="video-form-editting">
            <div className="video-card-editting">
                <video controls>
                    <source src={video.videoUrl} type="video/mp4" />
                </video>
                <div>{title}</div>
                <div>{description}</div>
            </div>
            <form className="edit-video-form" onSubmit={submitEditClick}>
                <div>
                    <label>Title</label>
                    <textarea
                        type='text'
                        name='title'
                        onChange={updateTitle}
                        value={title}
                        maxLength={255}
                    ></textarea>
                </div>
                <div>
                    <label>Description</label>
                    <textarea
                        type='text'
                        name='description'
                        onChange={updateDescription}
                        value={description}
                        maxLength={255}
                    ></textarea>
                </div>
                <button>cancel</button>
                <button type='submit'>save</button>
            </form>
        </div>
    )
}

export default EditVideo
