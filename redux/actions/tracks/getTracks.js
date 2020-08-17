import { TrackActions } from "../../actionTypes";
import { getTracksForQuery } from "../../../spotify";
import { refreshAuthData } from "../auth";
import {
  getAuthData,
  getKeywordQuery,
  getTrackKeywords,
  getArtistKeywords,
} from "../../../utils";

const requestTracks = () => {
  return {
    type: TrackActions.GET_TRACKS_REQUEST,
  };
};

const getTracksSuccess = (tracks) => {
  return {
    type: TrackActions.GET_TRACKS_SUCCESS,
    payload: tracks,
  };
};

const getTracksFailure = () => {
  return {
    type: TrackActions.GET_TRACKS_FAILURE,
  };
};

export const getTracks = () => {
  return (dispatch) => {
    dispatch(refreshAuthData(_getTracks));
  };
};

const _getTracks = () => {
  return async (dispatch, getState) => {
    dispatch(requestTracks());
    try {
      const authData = getAuthData(getState());
      const trackName = getKeywordQuery(getTrackKeywords(getState()));
      const artistName = getKeywordQuery(getArtistKeywords(getState()));

      const tracks = await getTracksForQuery(authData, trackName, artistName);
      dispatch(getTracksSuccess(tracks));
    } catch (error) {
      console.error(error);
      dispatch(getTracksFailure());
    }
  };
};
