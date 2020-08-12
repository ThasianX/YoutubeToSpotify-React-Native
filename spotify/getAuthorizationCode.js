import * as AuthSession from "expo-auth-session";
import { getSpotifyCredentials } from "./getSpotifyCredentials";

const scopesArr = [
  "playlist-read-private",
  "playlist-read-collaborative",
  "playlist-modify-public",
  "playlist-modify-private",
];
const scopes = scopesArr.join(" ");

export const getAuthorizationCode = async () => {
  let result;
  try {
    const credentials = await getSpotifyCredentials();
    result = await AuthSession.startAsync({
      authUrl:
        "https://accounts.spotify.com/authorize" +
        "?response_type=code" +
        "&client_id=" +
        credentials.clientId +
        (scopes ? "&scope=" + encodeURIComponent(scopes) : "") +
        "&redirect_uri=" +
        encodeURIComponent(credentials.redirectUri),
    });
  } catch (err) {
    console.error(err);
  }
  console.log(result);
  if (result.params["code"] === undefined) {
    return "";
  } else {
    return result.params["code"];
  }
};
