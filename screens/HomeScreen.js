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
    currentScrollPos: 0,
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
        <ScrollView
          bounces={false}
          contentContainerStyle={styles.container}
          scrollEventThrottle={16}
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.y;
            console.log(offset);
            this.setState({ currentScrollPos: offset });
          }}
        >
          <LinearGradient
            colors={["#3f6b6b", "#121212"]}
            style={styles.header}
          />
          <FlatList
            style={styles.list}
            data={[
              {
                key: "0",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "1",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "2",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "3",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "4",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "5",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "6",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "7",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "8",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
              {
                key: "9",
                title: "Title",
                artist: "Artist",
                album: "Album",
              },
            ]}
            renderItem={({ item }) => (
              <View style={styles.playlistItem}>
                <Text style={styles.playlistItemTitle}>{item.title}</Text>
                <Text
                  style={styles.playlistItemMeta}
                >{`${item.artist} • ${item.album}`}</Text>
              </View>
            )}
          />
        </ScrollView>
        <View
          style={{
            ...styles.playlistDetails,
          }}
          pointerEvents="none"
        >
          <Image
            style={this.calculateArtSize()}
            source={{
              uri:
                "https://github.com/jamiemaison/hosted/blob/master/placeholder.jpg?raw=1",
            }}
          />
          <Text
            style={{ ...styles.playlistTitle, top: this.calculateTitlePos() }}
          >
            Best of 2020
          </Text>
          <Text
            style={{
              ...styles.playlistSubtitle,
              top: this.calculateSubtitlePos(),
            }}
          >
            {"100,000 LIKES • 2,000,000 VIEWS"}
          </Text>
          <TouchableOpacity
            style={{
              ...styles.playlistButton,
              top: this.calculateButtonPos(),
            }}
          >
            <Text style={styles.playlistButtonText}>SHUFFLE PLAY</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  calculateTitlePos = () => {
    return -this.state.currentScrollPos;
  };

  calculateSubtitlePos = () => {
    return -this.state.currentScrollPos;
  };

  calculateButtonPos = () => {
    return 250 - this.state.currentScrollPos;
  };

  calculateArtSize = () => {
    return {
      width: 148 - this.state.currentScrollPos / 10,
      height: 148 - this.state.currentScrollPos / 10,
      opacity: 1 - this.state.currentScrollPos / 350,
    };
  };
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
    height: 450,
  },
  list: {
    width: "100%",
    height: 800,
    backgroundColor: "#121212",
  },
  playlistDetails: {
    width: "100%",
    position: "absolute",
    top: 90,
    display: "flex",
    alignItems: "center",
  },
  playlistTitle: {
    fontFamily: "montserrat-bold",
    color: "#fff",
    fontSize: 30,
    marginTop: 20,
  },
  playlistSubtitle: {
    fontFamily: "montserrat-regular",
    color: "#b9bdbe",
    fontSize: 12,
    marginTop: 15,
  },
  playlistButton: {
    backgroundColor: "#2ab759",
    width: 230,
    height: 50,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
    position: "absolute",
  },
  playlistButtonText: {
    fontFamily: "montserrat-bold",
    fontSize: 12,
    color: "#fff",
    letterSpacing: 2,
  },
  playlistItem: {
    marginLeft: 25,
    marginBottom: 25,
  },
  playlistItemTitle: {
    fontFamily: "montserrat-bold",
    fontSize: 18,
    color: "#fff",
  },
  playlistItemMeta: {
    fontFamily: "montserrat-regular",
    color: "#b9bdbe",
    fontSize: 15,
  },
});
