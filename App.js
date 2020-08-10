import { StatusBar } from "expo-status-bar";
import React from "react";
import { View } from "react-native";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <View>
      <HomeScreen />
      <StatusBar style="light" />
    </View>
  );
}
