import { getValidSPObj } from "../spotify/getValidSPObj";

export const createNewPlaylist = async (name) => {
  const sp = await getValidSPObj();
  const { id: userId } = await sp.getMe();
  return sp.createPlaylist(userId, { name: name });
};
