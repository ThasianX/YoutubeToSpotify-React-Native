import { spotifyService } from "./";

// TODO: should all checks to see if song already exists in playlist
export const addTrackToPlaylist = async (authData, trackURI, playlistId) => {
  const sp = await spotifyService(authData);
  return sp.addTracksToPlaylist(playlistId, [trackURI]);
};
