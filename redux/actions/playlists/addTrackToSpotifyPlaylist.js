import { TrackActions } from "../../actionTypes";
import { addTrackToPlaylist } from "../../../spotify";
import {
  getAuthData,
  getSelectedTrack,
  checkmark,
  cross,
} from "../../../utils";

const showAlert = (alert) => ({
  type: TrackActions.ADD_TRACK_TO_PLAYLIST,
  payload: alert,
});

export const addTrackToSpotifyPlaylist = (playlist) => {
  return async (dispatch, getState) => {
    let success = await addTrackToPlaylist(
      getAuthData(getState()),
      getSelectedTrack(getState()).uri,
      playlist.id
    );

    let alert;
    if (success) {
      alert = {
        image: checkmark,
        message: `Added to ${playlist.name}.`,
      };
    } else {
      alert = {
        image: cross,
        message: `Failed adding to ${playlist.name}.`,
      };
    }

    dispatch(showAlert(alert));
  };
};
