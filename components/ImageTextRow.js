import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

// TODO: should use `Pressable` API and make the background black when pressed
const ImageTextRow = (props) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={styles.container}
      onPress={props.onPress}
    >
      <View style={styles.hStack}>
        <Image
          style={styles.image}
          defaultSource={props.defaultImage}
          source={
            props.image == null ? props.defaultImage : { uri: props.image }
          }
        />
        <View style={styles.textVStack}>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.title}>
            {props.title}
          </Text>
          <Text numberOfLines={1} ellipsizeMode="tail" style={styles.subtitle}>
            {props.subtitle}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  hStack: {
    flexDirection: "row",
  },
  image: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },
  textVStack: {
    justifyContent: "center",
    flex: 1,
    paddingLeft: 12,
  },
  title: {
    fontSize: 16,
    color: "white",
    paddingBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: "#D3D3D3",
  },
});

export default ImageTextRow;
