import { getValidSPObj } from "../spotify/getValidSPObj";

export const getAllUserOwnedPlaylists = async () => {
  const sp = await getValidSPObj();
  const { id: userId } = await sp.getMe();
  const { items: playlists } = await sp.getUserPlaylists(userId, {
    limit: 50,
  });
  let userOwnedPlaylists = playlists.filter((playlist) => {
    return playlist["owner"]["id"] === userId.toString();
  });
  return userOwnedPlaylists;
};
