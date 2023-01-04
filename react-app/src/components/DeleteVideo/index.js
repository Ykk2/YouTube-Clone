
import { deleteVideo } from "../../store/videos"
import { useDispatch } from "react-redux"



const DeleteVideo = ({setDeleting, id}) => {

    const dispatch = useDispatch()

    const deleteVideoConfirm = (e) => {
        e.preventDefault()
        dispatch(deleteVideo(id))
    }

    const cancelDelete = (e) => {
        e.preventDefault()
        setDeleting(false)
    }

    return (
        <>
        <div>Click Yes to confirm delete</div>
        <div>
            <button onClick={deleteVideoConfirm}>Yes</button>
            <button onClick={cancelDelete}>Cancel</button>
        </div>
        </>
    )
}

export default DeleteVideo
