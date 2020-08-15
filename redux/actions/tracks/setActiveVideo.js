import { TrackActions } from "../../actionTypes";

const setActiveVideoDetails = (videoDetails) => {
  return {
    type: TrackActions.SET_ACTIVE_VIDEO,
    payload: videoDetails,
  };
};

export const setActiveVideo = (videoId) => {
  return setActiveVideoDetails(mockVideoDetails);
};

const mockVideoDetails = {
  title: "Lean Wit Me",
  channelTitle: "Juice WRLD",
  info: "209K Likes • 34,664,786 views",
  thumbnail: "http://i3.ytimg.com/vi/WsrVxz4pjGs/maxresdefault.jpg",
};
