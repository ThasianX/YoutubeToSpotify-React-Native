import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import AddSongScreen from "./screens/AddSongScreen";
import AllPlaylistsScreen from "./screens/AllPlaylistsScreen";
import { refreshTokens } from "./spotify/refreshTokens";
import { getUserData } from "./utils/getUserData";

// TODO: Should probably use redux for storing the tokens and stuff
export default class App extends React.Component {
  async componentDidMount() {
    const tokenExpirationTime = await getUserData("expirationTime");
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await refreshTokens();
    } else {
      this.setState({ accessTokenAvailable: true });
    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <AddSongScreen track={track} />
        <StatusBar style="dark" />
      </View>
    );
  }
}

const track = {
  title: "Lean Wit Me",
  info: "209K Likes • 34,664,786 views",
  thumbnail: "http://i3.ytimg.com/vi/WsrVxz4pjGs/maxresdefault.jpg",
};
