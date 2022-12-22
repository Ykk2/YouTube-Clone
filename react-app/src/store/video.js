

const LOAD_VIDEOS = 'video/LOAD_VIDEOS';


const loadVideos = (videos) => ({
  type: LOAD_VIDEOS,
  data: videos
});



export const getVideos = () => async (dispatch) => {
  const response = await fetch('/api/videos');

  if (response.ok) {
    const data = await response.json();
    dispatch(loadVideos(data))
    return null;
  } else if (response.status < 500) {
    const data = await response.json();
    if (data.errors) {
      return data.errors;
    }
  } else {
    return ['An error occurred. Please try again.']
  }
}


const initialState = { videos: {}, video: {}}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_VIDEOS:
        const newState = initialState
        action.data.videos.forEach(video => {
            newState.videos[video.id] = video
        })
      return newState
    default:
      return state;
  }
}
