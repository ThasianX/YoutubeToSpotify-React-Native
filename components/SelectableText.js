import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

const SelectableText = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[
        styles.titleButton,
        {
          backgroundColor: props.queryWord.isSelected
            ? props.queryWord.color
            : "transparent",
        },
      ]}
      onPress={props.onPress}
    >
      <Text style={styles.titleText}>{props.queryWord.word}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  titleButton: {
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    margin: 4,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 13,
    color: "white",
    letterSpacing: 2,
  },
});

export default SelectableText;
