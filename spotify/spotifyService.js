import SpotifyWebAPI from "spotify-web-api-js";

const sp = new SpotifyWebAPI();

export const spotifyService = async (authData) => {
  sp.setAccessToken(authData.accessToken);
  return sp;
};
