import { normalize } from "./helper"

const UPVOTE_VIDEO = 'video/LOAD_COMMENTS'
const DOWNVOTE_VIDEO = 'video/CREATE_COMMENT'

const upvoteVideo = (comments) => ({
    type: UPVOTE_VIDEO,
    data: comments
});

const createComment = (comment) => ({
    type: CREATE_COMMENT,
    data: comment
});

const editComment = (comment) => ({
    type: EDIT_COMMENT,
    data: comment
});

const removeComment = (commentId) => ({
    type: DELETE_COMMENT,
    data: commentId
});


export const getComments = (videoId) => async (dispatch) => {

    const response = await fetch(`/api/comments/${videoId}`);

    if (response.ok) {
        const data = await response.json();
        dispatch(loadComments(data))
        return null

    } else if (response.status < 500) {
        const data = await response.json();
        if (data.errors) {
            return data.errors;
        }

    } else {
        return ['An error occurred. Please try again.']
    }
}



export const postComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.videoId}`, {
        method: "POST",
        body: comment
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(createComment(data))
        return null

    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }

    } else {
        return ['An error occurred. Please try again.']
    }
}

export const putComment = (comment) => async (dispatch) => {
    const response = await fetch(`/api/comments/${comment.videoId}`, {
        method: "PUT",
        body: comment
    });

    if (response.ok) {
        const data = await response.json()
        dispatch(editComment(data))
        return null

    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }

    } else {
        return ['An error occurred. Please try again.']
    }
}

export const deleteComment = (commentId) => async (dispatch) => {
    const response = await fetch(`/api/comments/${commentId}`, {
        method: "DELETE"
    });

    if (response.ok) {
        dispatch(removeComment(commentId))

    } else if (response.status < 500) {
        const data = await response.json()
        if (data.errors) {
            return data.errors
        }

    } else {
        return ['An error occurred. Please try again.']
    }
}


export default function reducer(state = { comments: {} }, action) {

    switch (action.type) {
        case LOAD_COMMENTS: {
            const newState = { comments: {} }
            newState.comments = normalize(action.data.comments)
            return newState
        }

        case CREATE_COMMENT: {
            const newState = { comments: { ...state.comments } }
            newState.comments[action.data.comment.id] = action.data.comment
            return newState
        }

        case EDIT_VIDEO: {
            const newState = { comments: { ...state.comments } }
            newState.comments[action.data.comment.id] = action.data.comment
            return newState
        }
        /* falls through */
        case DELETE_VIDEO: {
            const newState = { comments: { ...state.comments } }
            delete newState.comments[action.data.commentId]
            return newState
        }

        default:
            return state;
    }
}
