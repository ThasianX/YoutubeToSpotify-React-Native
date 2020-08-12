import { getValidSPObj } from "../spotify/getValidSPObj";

// TODO: should all checks to see if song already exists in playlist
export const addTrackToPlaylist = async (trackURI, playlistId) => {
  const sp = await getValidSPObj();
  let obj = await sp.addTracksToPlaylist(playlistId, [trackURI]);
  console.log(obj);
};
