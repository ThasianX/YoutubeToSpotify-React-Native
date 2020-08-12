import SpotifyWebAPI from "spotify-web-api-js";
import { getUserData } from "../utils/getUserData";
import { refreshTokens } from "./refreshTokens";

export const getValidSPObj = async () => {
  const tokenExpirationTime = await getUserData("expirationTime");
  if (new Date().getTime() > Number(tokenExpirationTime)) {
    // access token has expired, so we need to use the refresh token
    await refreshTokens();
  }
  let accessToken = await getUserData("accessToken");
  console.log("new access token: " + accessToken);
  var sp = new SpotifyWebAPI();
  sp.setAccessToken(accessToken);
  return sp;
};
