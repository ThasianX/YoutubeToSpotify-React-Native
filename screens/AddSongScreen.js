import React from "react";
import {
  StyleSheet,
  ScrollView,
  FlatList,
  TouchableOpacity,
  Image,
  Text,
  View,
  Animated,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AllPlaylistsScreen from "./AllPlaylistsScreen";
import RoundedButton from "../components/RoundedButton";
import TransientAlert from "../components/TransientAlert";
import {
  getTracks,
  setActiveVideo,
  setSelectedTrack,
  resetAlert,
} from "../redux/actions";
import { connect } from "react-redux";
import ImageTextRow from "../components/ImageTextRow";
class AddSongScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(1),
    };
    this.props.setActiveVideo("");
  }

  componentDidMount() {
    this.props.getTracks(
      this.props.trackKeywords.join(" "),
      this.props.artistKeywords.join(" ")
    );
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isShowingPlaylists !== this.props.isShowingPlaylists) {
      Animated.spring(this.state.opacity, {
        toValue: this.props.isShowingPlaylists ? 0.5 : 1,
        useNativeDriver: true,
      }).start();
    }
  }

  // TODO: Reconfigure the search query view. Make it have like 2 different buttons(track and artist)
  // TODO: Maybe add some sort of indicator as its loading
  // TODO: Everything works but the transient alert isn't going away after it shows
  render() {
    return (
      <View style={[styles.container]}>
        <AllPlaylistsScreen />
        {this.props.alert && (
          <TransientAlert
            {...this.props.alert}
            onEnded={this.props.resetAlert}
          />
        )}
        <Animated.View style={[styles.header, { opacity: this.state.opacity }]}>
          <View style={styles.headerBackground}>
            <LinearGradient
              colors={["#3f6b6b", "#121212"]}
              style={styles.gradient}
            />
          </View>
          {this.props.videoDetails != null && (
            <View style={styles.headerOverlay}>
              <View style={styles.trackThumbnailContainer}>
                <Image
                  style={styles.trackThumbnail}
                  source={{ uri: this.props.videoDetails.thumbnail }}
                  resizeMode="cover"
                />
              </View>
              <Text style={styles.trackTitle}>
                {this.props.videoDetails.title}
              </Text>
              <Text style={styles.trackInfo}>
                {this.props.videoDetails.info}
              </Text>
              <RoundedButton title={"RECONFIGURE"} />
            </View>
          )}
        </Animated.View>
        <View style={styles.list}>
          {!this.props.isLoading &&
            this.props.spotifyTracks.map((track) => {
              return (
                <ImageTextRow
                  key={track["id"]}
                  image={
                    track["album"]["images"].length > 0
                      ? track["album"]["images"][0]["url"]
                      : null
                  }
                  title={track["name"]}
                  subtitle={`${track["artists"]
                    .map((artist) => artist["name"])
                    .join(", ")} • ${track["album"]["name"]}`}
                  onPress={() => this.props.setSelectedTrack(track)}
                />
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

const mapStateToProps = (state) => ({
  videoDetails: state.tracksReducer.videoDetails,
  isLoading: state.tracksReducer.isLoadingTracks,
  spotifyTracks: state.tracksReducer.spotifyTracks,
  trackKeywords: state.tracksReducer.trackKeywords,
  artistKeywords: state.tracksReducer.artistKeywords,
  isShowingPlaylists: state.tracksReducer.isShowingPlaylists,
  alert: state.tracksReducer.alert,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveVideo: (videoId) => {
    dispatch(setActiveVideo(videoId));
  },
  getTracks: (trackKeywords, artistKeywords) => {
    dispatch(getTracks(trackKeywords, artistKeywords));
  },
  setSelectedTrack: (track) => {
    dispatch(setSelectedTrack(track));
  },
  resetAlert: () => dispatch(resetAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongScreen);
