import { encode as btoa } from "base-64";
import { getAuthorizationCode } from "./getAuthorizationCode";
import { setUserData } from "../utils/setUserData";
import { getSpotifyCredentials } from "./getSpotifyCredentials";

export const getTokens = async () => {
  try {
    const authorizationCode = await getAuthorizationCode();
    console.log("auth" + authorizationCode);
    if (authorizationCode === "") {
      return;
    }
    const credentials = await getSpotifyCredentials();
    const credsB64 = btoa(
      `${credentials.clientId}:${credentials.clientSecret}`
    );
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${credentials.redirectUri}`,
    });
    const responseJson = await response.json();
    // destructure the response and rename the properties to be in camelCase to satisfy my linter ;)
    const {
      access_token: accessToken,
      refresh_token: refreshToken,
      expires_in: expiresIn,
    } = responseJson;

    const expirationTime = new Date().getTime() + expiresIn * 1000;
    await setUserData("accessToken", accessToken);
    await setUserData("refreshToken", refreshToken);
    await setUserData("expirationTime", expirationTime);
  } catch (err) {
    console.error(err);
  }
};
