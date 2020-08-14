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
      console.log(`old auth data: ${getAuthData(getState())}`);
      dispatch(refreshAuthData());

      const newAuthData = getAuthData(getState());
      console.log(`new auth data: ${newAuthData}`);
      const response = await getTracksForQuery(
        newAuthData,
        trackName,
        artistName
      );
      dispatch(getTracksSuccess(response["tracks"]["items"]));
    } catch (error) {
      console.error(error);
      dispatch(getTracksFailure());
    }
  };
};
