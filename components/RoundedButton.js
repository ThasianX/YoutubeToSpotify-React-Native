import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

// TODO: should use the `Pressable` modifier. `onPressIn` should scale down and lower opacity. `onPressUp` should restore normal state.
const RoundedButton = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.titleButton, { opacity: props.isDisabled ? 0.1 : 1 }]}
      onPress={props.onPress}
      disabled={props.isDisabled}
    >
      <View style={styles.container}>
        <Text style={styles.titleText}>{props.title.toUpperCase()}</Text>
        <Text
          numberOfLines={2}
          ellipsizeMode={"tail"}
          style={styles.subtitleText}
        >
          {props.subtitle}
        </Text>
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
    textAlign: "center",
    paddingHorizontal: 12,
  },
});

export default RoundedButton;
