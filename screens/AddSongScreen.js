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
import { getKeywordQuery, emptyTrack } from "../utils";

const windowHeight = Dimensions.get("window").height;

class AddSongScreen extends React.Component {
  state = {
    opacity: new Animated.Value(0.2),
    scrollEnabled: false,
  };

  componentDidMount() {
    this.props.setActiveVideo("axRAL0BXNvw");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.videoDetails !== this.props.videoDetails) {
      Animated.spring(this.state.opacity, {
        toValue: 1,
        useNativeDriver: true,
      }).start();
    } else if (prevProps.isShowingPlaylists !== this.props.isShowingPlaylists) {
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

  spotifyTrackRows = () => {
    return this.props.spotifyTracks.map((track) => {
      return (
        <ImageTextRow
          key={track.id}
          image={track.image}
          title={track.name}
          subtitle={track.artists}
          defaultImage={emptyTrack}
          onPress={() => this.props.setSelectedTrack(track)}
        />
      );
    });
  };

  emptySpotifyTracksView = () => {
    let trackQuery = getKeywordQuery(this.props.trackKeywords);
    return (
      <View style={styles.emptyStateContainer}>
        <Text style={styles.emptyStateHeaderText}>{"Couldn't find"}</Text>
        <Text style={styles.emptyStateSearchText}>{`"${trackQuery}"`}</Text>
        <Text style={styles.emptyStateTipsText}>
          {"Try searching again using a different set of keywords."}
        </Text>
      </View>
    );
  };

  onContentSizeChange = (contentWidth, contentHeight) => {
    this.setState({ scrollEnabled: contentHeight > (windowHeight * 5) / 11 });
  };

  render() {
    return (
      <View style={styles.container}>
        <AllPlaylistsScreen />
        {this.props.alert && (
          <TransientAlert
            {...this.props.alert}
            onEnded={this.props.resetAlert}
          />
        )}
        <Animated.View style={{ flex: 1, opacity: this.state.opacity }}>
          <View style={styles.header}>
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
          </View>
          <View style={styles.list}>
            <ScrollView
              contentContainerStyle={styles.scrollView}
              showsVerticalScrollIndicator={false}
              scrollEnabled={this.state.scrollEnabled}
              onContentSizeChange={this.onContentSizeChange}
            >
              {(this.props.selectedQuery != null && <QuerySelection />) ||
                (!this.props.isLoading &&
                  (this.props.spotifyTracks.length > 0
                    ? this.spotifyTrackRows()
                    : this.emptySpotifyTracksView()))}
            </ScrollView>
          </View>
        </Animated.View>
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
    flex: 6,
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
    flex: 5,
    backgroundColor: "#121212",
  },
  scrollView: {
    paddingBottom: 50,
  },
  emptyStateContainer: {
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
    width: "75%",
  },
  emptyStateHeaderText: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  emptyStateSearchText: {
    fontSize: 16,
    fontWeight: "600",
    paddingHorizontal: 24,
    color: "white",
    textAlign: "center",
    paddingBottom: 16,
  },
  emptyStateTipsText: {
    fontSize: 12,
    color: "gray",
    textAlign: "center",
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
