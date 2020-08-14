import { spotifyService } from "./";

export const createNewPlaylist = async (authData, name) => {
  const sp = await spotifyService(authData);
  const { id: userId } = await sp.getMe();
  return sp.createPlaylist(userId, { name: name });
};
