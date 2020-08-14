import { spotifyService } from "./";

export const getTracksForQuery = async (authData, trackName, artistName) => {
  const sp = await spotifyService(authData);

  const trackQuery = `track:${trackName}`;
  const artistQuery = artistName.length > 0 ? `artist:${artistName}` : "";
  const query = `${trackQuery} ${artistQuery}`;
  return sp.searchTracks(query, { limit: 5 });
};
