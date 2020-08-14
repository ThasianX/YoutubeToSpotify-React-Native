import { createNewPlaylist } from "../../../spotify";
import { addTrackToSpotifyPlaylist } from "./";
import { getAuthData } from "../../../utils";

export const createPlaylist = (playlistName) => {
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
