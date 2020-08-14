import { TrackActions } from "../actionTypes";

const initialState = {
  videoDetails: null,
  spotifyTracks: [],
  isLoadingTracks: false,
  selectedSpotifyTrack: null,
  isShowingPlaylists: false,
  alert: null,
  trackKeywords: ["Lean", "Wit", "Me"],
  artistKeywords: ["Juice", "WRLD"],
};

export const tracksReducer = (state = initialState, action) => {
  switch (action.type) {
    case TrackActions.GET_TRACKS_REQUEST:
      return {
        ...state,
        isLoadingTracks: true,
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
      return {
        ...state,
        videoDetails: action.payload,
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
    default:
      return state;
  }
};
