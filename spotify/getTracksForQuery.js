import { spotifyService } from "./";

export const getTracksForQuery = async (authData, trackName, artistName) => {
  const sp = await spotifyService(authData);

  const trackQuery = `track:${trackName}`;
  const artistQuery = artistName.length > 0 ? `artist:${artistName}` : "";
  const query = `${trackQuery} ${artistQuery}`;
  const tracks = await sp.searchTracks(query, { limit: 5 });

  return tracks["tracks"]["items"].map((track) => ({
    id: track["id"],
    name: track["name"],
    artists: track["artists"].map((artist) => artist["name"]).join(", "),
    image:
      track["album"]["images"].length > 0
        ? track["album"]["images"][0]["url"]
        : null,
    uri: track["uri"],
  }));
};
