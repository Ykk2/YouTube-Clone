import { normalize } from "./helper"

const LOAD_VIDEOS = 'video/LOAD_VIDEOS'
const LOAD_VIDEO = 'video/LOAD_VIDEO'
const CREATE_VIDEO = 'video/CREATE_VIDEO'
const EDIT_VIDEO = 'video/EDIT_VIDEO'
const DELETE_VIDEO = 'video/DELETE_VIDEO'

const loadVideos = (videos) => ({
  type: LOAD_VIDEOS,
  data: videos
});

const loadVideo = (video) => ({
  type: LOAD_VIDEO,
  data: video
});

const createVideo = (video) => ({
  type: CREATE_VIDEO,
  data: video
});

const editVideo = (video) => ({
  type: EDIT_VIDEO,
  data: video
});

const removeVideo = (videoId) => ({
  type: DELETE_VIDEO,
  data: videoId
});


export const getVideos = () => async (dispatch) => {

  const response = await fetch('/api/videos');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadVideos(data))
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

export const getUserVideos = (userId) => async (dispatch) => {

  const response = await fetch(`/api/videos/${userId}`);

  if (response.ok) {
    const data = await response.json();
    dispatch(loadVideos(data))
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

export const getVideo = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}`);

  if (response.ok) {
    const data = await response.json()
    dispatch(loadVideo(data))
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

export const postVideo = (video) => async (dispatch) => {
  const response = await fetch('/api/videos/new', {
    method: "POST",
    body: video
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(createVideo(data))
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

export const putVideo = (video) => async (dispatch) => {
  const response = await fetch(`/api/videos${video.id}`, {
    method: "PUT",
    body: video
  });

  if (response.ok) {
    const data = await response.json()
    dispatch(editVideo(data))
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

export const deleteVideo = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos${videoId}`, {
    method: "DELETE"
  });

  if (response.ok) {
    dispatch(removeVideo(videoId))

  } else if (response.status < 500) {
    const data = await response.json()
    if (data.errors) {
      return data.errors
    }

  } else {
    return ['An error occurred. Please try again.']
  }
}


export default function reducer(state = { videos: {}, video: {} }, action) {

  switch (action.type) {
    case LOAD_VIDEOS: {
      const newState = { videos: {}, video: {} }
      newState.videos = normalize(action.data.videos)
      return newState
    }
    case LOAD_VIDEO: {
      const newState = { videos: {...state.videos}, video: {} }
      newState.video = action.data.video
      return newState
    }

    case CREATE_VIDEO: {
      const newState = { videos: {...state.videos}, video: {...state.video}}
      newState.videos[action.data.video.id] = action.data.video
      return newState
    }

    case EDIT_VIDEO: {
      const newState = { videos: {...state.videos}, video: {...state.video}}
      newState.videos[action.data.video.id] = action.data.video
      newState.video = action.data.video
    }
    /* falls through */
    case DELETE_VIDEO: {
      const newState = {videos: {...state.videos}, video: {...state.video}}
      delete newState.videos[action.data.videoId]
      return newState
    }

    default:
      return state;
  }
}
