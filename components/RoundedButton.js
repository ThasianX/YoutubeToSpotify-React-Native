import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// TODO: should use the `Pressable` modifier. `onPressIn` should scale down and lower opacity. `onPressUp` should restore normal state.
const RoundedButton = (props) => {
  return (
    <TouchableOpacity style={styles.titleButton} onPress={props.onPress}>
      <View style={styles.container}>
        <Text style={styles.titleText}>{props.title}</Text>
        <Text style={styles.subtitleText}>{props.subtitle}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleButton: {
    backgroundColor: "#1db953",
    borderRadius: 100,
    width: 230,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    margin: 4,
  },
  container: {
    alignItems: "center",
    justifyContent: "space-around",
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
    letterSpacing: 2,
  },
  subtitleText: {
    fontSize: 10,
    color: "white",
  },
});

export default RoundedButton;
