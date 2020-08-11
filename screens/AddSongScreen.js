import React from "react";
import {
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  Button,
  Linking,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AllPlaylistsScreen from "./AllPlaylistsScreen";
import RoundedButton from "../components/RoundedButton";

class AddSongScreen extends React.Component {
  state = {
    spotifyTracks: [],
    activeTrack: null,
    showPlaylistsScreen: false,
    opacity: new Animated.Value(1),
  };

  componentDidMount() {
    this.setState({
      spotifyTracks: [
        {
          title: "Lean Wit Me",
          artist: "Juice WRLD",
          album: "Goodbye & Good Riddance",
          albumImage:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          link: "https://open.spotify.com/track/3oDkdAySo1VQQG0ptV7uwa",
          uri: "spotify:track:3oDkdAySo1VQQG0ptV7uwa",
        },
        {
          title: "Lean Wit Me",
          artist: "Juice WRLD",
          album: "Hip Hop Love",
          albumImage:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          link: "https://open.spotify.com/track/3oDkdAySo1VQQG0ptV7uwa",
          uri: "spotify:track:3oDkdAySo1VQQG0ptV7uwa",
        },
        {
          title: "Lean Wit Me - Instrumental",
          artist: "Molotov Cocktail Piano",
          album: "MCP Performs Juice WRLD",
          albumImage:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          link: "https://open.spotify.com/track/3oDkdAySo1VQQG0ptV7uwa",
          uri: "spotify:track:3oDkdAySo1VQQG0ptV7uwa",
        },
        {
          title: "Lean Wit Me(Remix)",
          artist: "Jayrole",
          album: "Just the Beginning",
          albumImage:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          link: "https://open.spotify.com/track/3oDkdAySo1VQQG0ptV7uwa",
          uri: "spotify:track:3oDkdAySo1VQQG0ptV7uwa",
        },
      ],
    });
  }

  setActiveTrack = (track) => {
    this.setState({
      showPlaylistsScreen: true,
      activeTrack: track,
    });
    Animated.spring(this.state.opacity, {
      toValue: 0.5,
    }).start();
  };

  hidePlaylistsScreen = () => {
    this.setState({
      showPlaylistsScreen: false,
      activeTrack: null,
    });
    Animated.spring(this.state.opacity, {
      toValue: 1,
    }).start();
  };

  // TOOD: Reconfigure the search query
  render() {
    return (
      <View style={[styles.container]}>
        <AllPlaylistsScreen
          track={this.state.activeTrack}
          show={this.state.showPlaylistsScreen}
          onBack={this.hidePlaylistsScreen}
        />
        <Animated.View style={[styles.header, { opacity: this.state.opacity }]}>
          <View style={styles.headerBackground}>
            <LinearGradient
              colors={["#3f6b6b", "#121212"]}
              style={styles.gradient}
            />
          </View>
          <View style={styles.headerOverlay}>
            <View style={styles.trackThumbnailContainer}>
              <Image
                style={styles.trackThumbnail}
                source={{ uri: this.props.track.thumbnail }}
                resizeMode="cover"
              />
            </View>
            <Text style={styles.trackTitle}>{this.props.track.title}</Text>
            <Text style={styles.trackInfo}>{this.props.track.info}</Text>
            <RoundedButton title={"RECONFIGURE"} />
          </View>
        </Animated.View>
        <View style={styles.list}>
          {this.state.spotifyTracks.length > 0 &&
            this.state.spotifyTracks.map((track) => {
              return (
                <TouchableOpacity
                  key={track.title + track.artist + track.album}
                  onPress={() => this.setActiveTrack(track)}
                >
                  <View style={styles.playlistItem}>
                    <Text style={styles.playlistItemTitle}>{track.title}</Text>
                    <Text
                      style={styles.playlistItemMeta}
                    >{`${track.artist} • ${track.album}`}</Text>
                  </View>
                </TouchableOpacity>
              );
            })}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    flex: 1,
  },
  headerBackground: {
    width: "100%",
    height: "100%",
    position: "absolute",
    left: 0,
    top: 0,
  },
  gradient: {
    flex: 1,
  },
  headerOverlay: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  trackThumbnailContainer: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 11,
    },
    shadowOpacity: 0.57,
    shadowRadius: 15.19,

    elevation: 23,
  },
  trackThumbnail: {
    width: 148,
    height: 148,
  },
  trackTitle: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
    paddingTop: 20,
  },
  trackInfo: {
    color: "#b9bdbe",
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 30,
  },
  addTrackButton: {
    backgroundColor: "#2ab759",
    width: 230,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 100,
  },
  addTrackText: {
    fontWeight: "bold",
    fontSize: 12,
    color: "#fff",
    letterSpacing: 2,
  },
  list: {
    flex: 1,
    backgroundColor: "#121212",
  },
  playlistItem: {
    marginLeft: 25,
    marginBottom: 25,
  },
  playlistItemTitle: {
    fontSize: 18,
    color: "#fff",
  },
  playlistItemMeta: {
    color: "#b9bdbe",
    fontSize: 15,
  },
});

export default AddSongScreen;
