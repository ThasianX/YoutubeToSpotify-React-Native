import React from "react";
import {
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import * as Font from "expo-font";
import { AppLoading } from "expo";

export default class HomeScreen extends React.Component {
  state = {
    fontsLoaded: false,
  };

  render() {
    if (!this.state.fontsLoaded) {
      return (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => this.setState({ fontsLoaded: true })}
        />
      );
    }

    return (
      <View>
        <ScrollView contentContainerStyle={styles.container}>
          <LinearGradient
            colors={["#3f6b6b", "#121212"]}
            style={styles.header}
          />
          <FlatList style={styles.list} />
        </ScrollView>
        <View style={styles.playlistDetails}>
          <Image
            style={styles.playlistArt}
            source={{
              uri:
                "https://github.com/jamiemaison/hosted/blob/master/placeholder.jpg?raw=1",
            }}
          />
          <Text style={styles.playlistTitle}>Best of 2020</Text>
          <Text style={styles.playlistSubtitle}>
            {"100,000 LIKES • 2,000,000 VIEWS"}
          </Text>
          <TouchableOpacity style={styles.playlistButton}>
            <Text style={styles.playlistButtonText}>SHUFFLE PLAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const fetchFonts = () => {
  return Font.loadAsync({
    "montserrat-regular": require("../assets/Montserrat-Regular.ttf"),
    "montserrat-bold": require("../assets/Montserrat-Bold.ttf"),
  });
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    width: "100%",
    height: 500,
  },
  list: {
    width: "100%",
    height: 800,
    backgroundColor: "#121212",
  },
  playlistDetails: {
    width: "100%",
    height: 600,
    position: "absolute",
    top: 90,
    display: "flex",
    alignItems: "center",
  },
  playlistArt: {
    width: 180,
    height: 180,
  },
  playlistTitle: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: 30,
    marginTop: 50,
  },
  playlistSubtitle: {
    fontFamily: "montserrat-regular",
    color: "#b9bdbe",
    fontSize: 12,
    marginTop: 15,
    textTransform: "uppercase",
  },
  playlistButton: {
    backgroundColor: "#2ab759",
    width: 230,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    marginTop: 40,
  },
  playlistButtonText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#fff",
    letterSpacing: 2,
  },
});
