import { TrackActions } from "../../actionTypes";
import { getTracksForQuery } from "../../../spotify";
import { refreshAuthData } from "../auth";
import { getAuthData } from "../../../utils";

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

export const getTracks = (trackName, artistName) => {
  return async (dispatch, getState) => {
    dispatch(requestTracks());
    try {
      dispatch(refreshAuthData());

      const newAuthData = getAuthData(getState());
      const tracks = await getTracksForQuery(
        newAuthData,
        trackName,
        artistName
      );
      dispatch(getTracksSuccess(tracks));
    } catch (error) {
      console.error(error);
      dispatch(getTracksFailure());
    }
  };
};
