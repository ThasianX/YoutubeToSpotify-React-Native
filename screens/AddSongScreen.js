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
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";

class AddSongScreen extends React.Component {
  state = {
    spotifyTracks: [],
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
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
            <TouchableOpacity style={styles.addTrackButton}>
              <Text style={styles.addTrackText}>ADD TO PLAYLIST</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.list}>
          {this.state.spotifyTracks.length > 0 &&
            this.state.spotifyTracks.map((track) => {
              return (
                <View
                  style={styles.playlistItem}
                  key={track.title + track.artist + track.album}
                >
                  <Text style={styles.playlistItemTitle}>{track.title}</Text>
                  <Text
                    style={styles.playlistItemMeta}
                  >{`${track.artist} • ${track.album}`}</Text>
                </View>
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
