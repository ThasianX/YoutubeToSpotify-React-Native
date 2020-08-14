import { createNewPlaylist } from "../../../spotify";
import { addTrackToSpotifyPlaylist } from "./";
import { getAuthData } from "../../../utils";

export const createPlaylist = (playlistName) => {
  return async (dispatch, getState) => {
    const response = createNewPlaylist(getAuthData(getState()), playlistName);

    if (response["error"] == null) {
      dispatch(addTrackToSpotifyPlaylist(response));
    }
  };
};
