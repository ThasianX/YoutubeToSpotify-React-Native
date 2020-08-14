import { spotifyService } from "./";

export const getAllUserOwnedPlaylists = async (authData) => {
  const sp = await spotifyService(authData);
  const { id: userId } = await sp.getMe();
  const { items: playlists } = await sp.getUserPlaylists(userId, {
    limit: 50,
  });
  const userOwnedPlaylists = playlists
    .filter((playlist) => {
      return playlist["owner"]["id"] === userId.toString();
    })
    .map((playlist) => ({
      id: playlist["id"],
      name: playlist["name"],
      image:
        playlist["images"].length > 0 ? playlist["images"][0]["url"] : null,
      numOfTracks: playlist["tracks"]["total"],
    }));
  return userOwnedPlaylists;
};
