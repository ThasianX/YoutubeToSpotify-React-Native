import { TrackActions } from "../actionTypes";

const initialState = {
  videoDetails: null,
  spotifyTracks: [],
  isLoadingTracks: false,
  selectedSpotifyTrack: null,
  isShowingPlaylists: false,
  alert: null,
  selectedQuery: "track",
  trackKeywords: [],
  artistKeywords: [],
};

const parseKeywords = (videoDetails) => {
  const videoTitleKeywords = videoDetails.title.match(/\w+/g).map((word) => ({
    word: word,
    isSelected: false,
    color: "#e52d27",
  }));
  const channelTitleKeywords = videoDetails.channelTitle
    .match(/\w+/g)
    .map((word) => ({
      word: word,
      isSelected: false,
      color: "#b31217",
    }));
  return [videoTitleKeywords, channelTitleKeywords];
};

export const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TrackActions.GET_TRACKS_REQUEST:
      return {
        ...state,
        isLoadingTracks: true,
        selectedQuery: null,
      };
    case TrackActions.GET_TRACKS_SUCCESS:
      return {
        ...state,
        spotifyTracks: action.payload,
        isLoadingTracks: false,
      };
    case TrackActions.GET_TRACKS_FAILURE:
      return {
        ...state,
        isLoadingTracks: false,
      };
    case TrackActions.SHOW_PLAYLISTS:
      return {
        ...state,
        isShowingPlaylists: true,
        selectedSpotifyTrack: action.payload,
      };
    case TrackActions.HIDE_PLAYLISTS:
      return {
        ...state,
        isShowingPlaylists: false,
        selectedSpotifyTrack: null,
      };
    case TrackActions.SET_ACTIVE_VIDEO:
      const initialKeywords = parseKeywords(action.payload);
      return {
        ...state,
        videoDetails: action.payload,
        selectedQuery: "track",
        trackKeywords: initialKeywords,
        artistKeywords: initialKeywords,
      };
    case TrackActions.ADD_TRACK_TO_PLAYLIST:
      return {
        ...state,
        alert: action.payload,
        isShowingPlaylists: false,
        selectedSpotifyTrack: null,
      };
    case TrackActions.RESET_ALERT:
      return {
        ...state,
        alert: null,
      };
    case TrackActions.START_QUERY:
      return {
        ...state,
        selectedQuery: action.payload,
      };
    case TrackActions.UPDATE_QUERY:
      if (state.selectedQuery == "track") {
        return {
          ...state,
          trackKeywords: action.payload,
        };
      } else {
        return {
          ...state,
          artistKeywords: action.payload,
        };
      }
    default:
      return state;
  }
};
