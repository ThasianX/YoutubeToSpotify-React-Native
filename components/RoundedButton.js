import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";

// TODO: should use the `Pressable` modifier. `onPressIn` should scale down and lower opacity. `onPressUp` should restore normal state.
const RoundedButton = (props) => {
  return (
    <TouchableOpacity style={styles.titleButton} onPress={props.onPress}>
      <Text style={styles.titleButtonText}>{props.title}</Text>
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
  },
  titleButtonText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "white",
    letterSpacing: 2,
  },
});

export default RoundedButton;
