import { spotifyService } from "./";

export const createNewPlaylist = async (authData, name) => {
  const sp = await spotifyService(authData);
  const { id: userId } = await sp.getMe();
  const response = await sp.createPlaylist(userId, { name: name });
  if (response["error"] == null) {
    return {
      id: response["id"],
      name: response["name"],
      image:
        response["images"].length > 0 ? response["images"][0]["url"] : null,
      numOfTracks: response["tracks"]["total"],
    };
  } else {
    return null;
  }
};
