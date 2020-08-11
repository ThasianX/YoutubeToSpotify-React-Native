import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";
import AddSongScreen from "./screens/AddSongScreen";
import AllPlaylistsScreen from "./screens/AllPlaylistsScreen";

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <AddSongScreen track={track} />
      <StatusBar style="dark" />
    </View>
  );
}

const track = {
  title: "Lean Wit Me",
  info: "209K Likes • 34,664,786 views",
  thumbnail: "http://i3.ytimg.com/vi/WsrVxz4pjGs/maxresdefault.jpg",
};
