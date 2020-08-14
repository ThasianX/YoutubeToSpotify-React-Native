import { getAllUserOwnedPlaylists } from "../../../spotify";
import { getAuthData } from "../../../utils";
import { TrackActions, PlaylistActions } from "../../actionTypes";
import { refreshAuthData } from "../auth";

const requestUserPlaylists = () => ({
  type: PlaylistActions.GET_USER_PLAYLISTS_REQUEST,
});

const getUserPlaylistsSuccess = (playlists) => ({
  type: PlaylistActions.GET_USER_PLAYLISTS_SUCCESS,
  payload: playlists,
});

const getUserPlaylistsFailure = () => ({
  type: PlaylistActions.GET_USER_PLAYLISTS_FAILURE,
});

const showPlaylists = (selectedTrack) => ({
  type: TrackActions.SHOW_PLAYLISTS,
  payload: selectedTrack,
});

export const setSelectedTrack = (track) => {
  return async (dispatch, getState) => {
    try {
      dispatch(requestUserPlaylists());

      const userOwnedPlaylists = await getAllUserOwnedPlaylists(
        getAuthData(getState())
      );
      dispatch(getUserPlaylistsSuccess(userOwnedPlaylists));
    } catch (error) {
      console.error(error);
      dispatch(getUserPlaylistsFailure());
    }

    dispatch(showPlaylists(track));
  };
};
