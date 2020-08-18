import * as AuthSession from "expo-auth-session";
import { getSpotifyCredentials } from "./";

const scopesArr = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
];
const scopes = scopesArr.join(" ");

export const getAuthorizationCode = async () => {
  const credentials = await getSpotifyCredentials();
  const result = await AuthSession.startAsync({
    authUrl:
      "https://accounts.spotify.com/authorize" +
      "?response_type=code" +
      "&client_id=" +
      credentials.clientId +
      (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
      "&redirect_uri=" +
      encodeURIComponent(credentials.redirectUri),
    returnUrl: "youtubetospotify://redirect",
  });

  if (result["type"] === "success") {
    return result.params["code"];
  } else {
    throw `Error occurred while getting authorization code`;
  }
};
