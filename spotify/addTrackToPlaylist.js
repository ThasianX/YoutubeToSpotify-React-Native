import { spotifyService } from "./";

// TODO: should all checks to see if song already exists in playlist
export const addTrackToPlaylist = async (authData, trackURI, playlistId) => {
  const sp = await spotifyService(authData);
  const response = sp.addTracksToPlaylist(playlistId, [trackURI]);
  return response["error"] == null;
};
