import { encode as btoa } from "base-64";
import { getTokens, getSpotifyCredentials } from "./";

export const refreshTokens = async (authData) => {
  try {
    const credentials = await getSpotifyCredentials();
    const credsB64 = btoa(
      `${credentials.clientId}:${credentials.clientSecret}`
    );
    const refreshToken = authData.refreshToken;
    const response = await fetch("https://accounts.spotify.com/api/token", {
      method: "POST",
      headers: {
        Authorization: `Basic ${credsB64}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    });
    const responseJson = await response.json();

    let newTokens;
    if (responseJson.error) {
      newTokens = await getTokens();
    } else {
      const {
        access_token: newAccessToken,
        refresh_token: newRefreshToken,
        expires_in: expiresIn,
      } = responseJson;

      const expirationTime = new Date().getTime() + expiresIn * 1000;
      newTokens = {
        accessToken: newAccessToken,
        refreshToken: newRefreshToken || refreshToken,
        expirationTime: expirationTime,
      };
    }
  } catch (error) {
    // TODO: improve this catch logic
    console.error(`Error occurred while refreshing tokens: ${error}`);
  }

  return newTokens;
};
