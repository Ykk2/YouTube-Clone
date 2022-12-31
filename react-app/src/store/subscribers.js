import { normalize } from "./helper"

const ADD_SUBSCRIBER = 'subscribers/ADD_SUBSCRIBER'
const REMOVE_SUBSCRIBER = 'subscribers/REMOVE_SUBSCRIBER'


const addSubscriber = (userId) => ({
  type: ADD_SUBSCRIBER,
  data: videos
});

const removeSubscriber = (userId) => ({
  type: REMOVE_SUBSCRIBER,
  data: videoId
});



export const subscribe = (userId) => async (dispatch) => {
  const response = await fetch(`/api/subscriber/${userId}`, {
    methods: "POST"
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(addSubscriber(userId))
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

export const downvoteVideo = (videoId) => async (dispatch) => {
  const response = await fetch(`/api/videos/${videoId}/dislike`, {
    methods: "POST"
  })
  if (response.ok) {
    const data = await response.json()
    dispatch(downvote(videoId))
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
      const newState = { videos: { ...state.videos }, video: {} }
      newState.video = action.data.video
      return newState
    }

    case CREATE_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.videos[action.data.video.id] = action.data.video
      return newState
    }

    case EDIT_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.videos[action.data.video.id] = action.data.video
      newState.video = action.data.video
    }
    case DELETE_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      delete newState.videos[action.data.videoId]
      return newState
    }

    case UPVOTE_VIDEO: {
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.video.likes++
      return newState
    }

    /* falls through */
    case DOWNVOTE_VIDEO:
      const newState = { videos: { ...state.videos }, video: { ...state.video } }
      newState.video.likes--
      return newState

    default:
      return state;
  }
}
