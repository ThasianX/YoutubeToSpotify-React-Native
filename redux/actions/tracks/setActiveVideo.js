import { TrackActions } from "../../actionTypes";
import { getYoutubeCredentials } from "../../../youtube";
import { nFormatter } from "../../../utils";

const setActiveVideoDetails = (videoDetails) => {
  return {
    type: TrackActions.SET_ACTIVE_VIDEO,
    payload: videoDetails,
  };
};

export const setActiveVideo = (videoId) => {
  return async (dispatch) => {
    const credentials = await getYoutubeCredentials();
    const response = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=snippet%2Cstatistics&id=${videoId}&key=${credentials.apiKey}`
    );
    const json = await response.json();
    const snippet = json["items"][0]["snippet"];
    const statistics = json["items"][0]["statistics"];

    dispatch(
      setActiveVideoDetails({
        title: snippet["title"],
        channelTitle: snippet["channelTitle"],
        info: `${nFormatter(
          Number(statistics["likeCount"])
        )} Likes • ${nFormatter(Number(statistics["viewCount"]))} views`,
        thumbnail: snippet["thumbnails"]["medium"]["url"],
      })
    );
  };
};
