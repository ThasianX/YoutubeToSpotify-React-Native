import React from "react";
import {
  StyleSheet,
  Image,
  Text,
  View,
  Animated,
  ScrollView,
  Dimensions,
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
  startQuery,
} from "../redux/actions";
import { connect } from "react-redux";
import ImageTextRow from "../components/ImageTextRow";
import QuerySelection from "../components/QuerySelection";
import { getKeywordQuery } from "../utils";

const screenHeight = Dimensions.get("window").height;
class AddSongScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(1),
    };
    this.props.setActiveVideo("axRAL0BXNvw");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.isShowingPlaylists !== this.props.isShowingPlaylists) {
      Animated.spring(this.state.opacity, {
        toValue: this.props.isShowingPlaylists ? 0.5 : 1,
        useNativeDriver: true,
      }).start();
    }
  }

  queryPressed = (queryType) => {
    if (queryType === this.props.selectedQuery) {
      this.props.finalizeQuery();
    } else {
      this.props.startQuery(queryType);
    }
  };

  queryTitle = (queryType) => {
    return this.props.selectedQuery === queryType ? "done" : queryType;
  };

  joinedQueryString = (keywords) => {
    const queryString = getKeywordQuery(keywords);
    return queryString !== "" ? queryString : "Configure";
  };

  isQueryDisabled = (queryType) => {
    if (this.props.selectedQuery == null) {
      return false;
    }
    return this.props.selectedQuery !== queryType;
  };

  // TODO: Maybe add some sort of indicator as its loading
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
              <Text
                style={styles.trackTitle}
                numberOfLines={2}
                ellipsizeMode={"tail"}
              >
                {this.props.videoDetails.title}
              </Text>
              <Text style={styles.trackInfo}>
                {this.props.videoDetails.info}
              </Text>
              <RoundedButton
                title={this.queryTitle("track")}
                subtitle={this.joinedQueryString(this.props.trackKeywords)}
                isDisabled={this.isQueryDisabled("track")}
                onPress={() => this.queryPressed("track")}
              />
              <RoundedButton
                title={this.queryTitle("artist")}
                subtitle={this.joinedQueryString(this.props.artistKeywords)}
                isDisabled={this.isQueryDisabled("artist")}
                onPress={() => this.queryPressed("artist")}
              />
            </View>
          )}
        </Animated.View>
        <View style={styles.list}>
          <ScrollView showsVerticalScrollIndicator={false}>
            {(this.props.selectedQuery != null && <QuerySelection />) ||
              (!this.props.isLoading &&
                // TODO: add empty state
                this.props.spotifyTracks.map((track) => {
                  return (
                    <ImageTextRow
                      key={track.id}
                      image={track.image}
                      title={track.name}
                      subtitle={track.artists}
                      onPress={() => this.props.setSelectedTrack(track)}
                    />
                  );
                }))}
          </ScrollView>
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
    flex: 1.2,
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
    fontSize: 20,
    paddingTop: 20,
    paddingHorizontal: 16,
    textAlign: "center",
  },
  trackInfo: {
    color: "#b9bdbe",
    fontSize: 12,
    paddingTop: 10,
    paddingBottom: 20,
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
  selectedQuery: state.tracksReducer.selectedQuery,
});

const mapDispatchToProps = (dispatch) => ({
  setActiveVideo: (videoId) => {
    dispatch(setActiveVideo(videoId));
  },
  setSelectedTrack: (track) => {
    dispatch(setSelectedTrack(track));
  },
  resetAlert: () => dispatch(resetAlert()),
  startQuery: (queryType) => dispatch(startQuery(queryType)),
  finalizeQuery: () => dispatch(getTracks()),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddSongScreen);
