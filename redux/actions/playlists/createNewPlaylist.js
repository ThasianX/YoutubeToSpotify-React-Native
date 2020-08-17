import { createNewPlaylist } from "../../../spotify";
import { addTrackToSpotifyPlaylist } from "./";
import { getAuthData } from "../../../utils";
import { refreshAuthData } from "../auth";

export const createPlaylist = (playlistName) => {
  return (dispatch) => {
    dispatch(refreshAuthData(() => _createPlaylist(playlistName)));
  };
};

const _createPlaylist = (playlistName) => {
  return async (dispatch, getState) => {
    const newPlaylist = await createNewPlaylist(
      getAuthData(getState()),
      playlistName
    );

    if (newPlaylist != null) {
      dispatch(addTrackToSpotifyPlaylist(newPlaylist));
    }
  };
};
