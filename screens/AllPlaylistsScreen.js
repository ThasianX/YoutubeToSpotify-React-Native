import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
  Platform,
} from "react-native";
import ImageTextRow from "../components/ImageTextRow";
import RoundedButton from "../components/RoundedButton";
import DialogAlert from "../components/DialogAlert";
import { connect } from "react-redux";
import {
  createPlaylist,
  addTrackToSpotifyPlaylist,
  hidePlaylists,
} from "../redux/actions";
import { emptyPlaylist } from "../utils";
import { BlurView } from "expo-blur";

const closedOffset = Dimensions.get("window").height;
const openOffset = 54;
const HEADER_HEIGHT = 60;

// TODO: add modal swipe to this
class AllPlaylistsScreen extends React.Component {
  state = {
    scrollY: new Animated.Value(
      // iOS has negative initial scroll value because content inset...
      Platform.OS === "ios" ? -HEADER_HEIGHT : 0
    ),
    modalOffset: new Animated.Value(closedOffset),
    isShowingNewPlaylistAlert: false,
  };

  componentDidMount() {
    this.toggleModal();
  }

  componentDidUpdate(prevProps) {
    if (this.props.show !== prevProps.show) {
      this.toggleModal(this.props.show);
    }
  }

  toggleModal = (show) => {
    if (show) {
      if (this.scrollView) {
        this.scrollView.scrollTo({ x: 0, y: -HEADER_HEIGHT, animated: false });
      }

      Animated.spring(this.state.modalOffset, {
        toValue: openOffset,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(this.state.modalOffset, {
        toValue: closedOffset,
        useNativeDriver: true,
      }).start();
    }
  };

  createNewPlaylist = (name) => {
    this.closeNewPlaylistAlert();
    this.props.createPlaylist(name);
  };

  showNewPlaylistAlert = () => {
    this.setState({
      isShowingNewPlaylistAlert: true,
    });
  };

  closeNewPlaylistAlert = () => {
    this.setState({
      isShowingNewPlaylistAlert: false,
    });
  };

  renderContent = () => {
    return (
      <View style={styles.content}>
        <ScrollView
          indicatorStyle={"white"}
          contentInset={{ top: HEADER_HEIGHT }}
          contentOffset={{
            y: -HEADER_HEIGHT,
          }}
          ref={(ref) => {
            this.scrollView = ref;
          }}
        >
          <View style={styles.scrollViewContent}>
            <View style={styles.showNewPlaylistButton}>
              <RoundedButton
                title={"NEW PLAYLIST"}
                onPress={this.showNewPlaylistAlert}
              />
            </View>
            {this.props.playlists.length > 0 &&
              this.props.playlists.map((playlist) => {
                return (
                  <ImageTextRow
                    key={playlist.id}
                    title={playlist.name}
                    subtitle={`${playlist.numOfTracks} ${
                      playlist.numOfTracks == 1 ? "song" : "songs"
                    }`}
                    defaultImage={emptyPlaylist}
                    image={playlist.image}
                    onPress={() => this.props.playlistSelected(playlist)}
                  />
                );
              })}
          </View>
        </ScrollView>
        <BlurView
          tint={"dark"}
          intensity={100}
          style={[StyleSheet.absoluteFill, styles.headerBackground]}
        >
          <View style={styles.center}>
            <View style={styles.leftAlignedCancelButton}>
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={this.props.onBack}
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
              >
                <Text style={styles.cancelButtonText}>{"Cancel"}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>{"Add to Playlist"}</Text>
          </View>
        </BlurView>
      </View>
    );
  };

  // TODO: Add blur effect to the header
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: this.state.modalOffset }] },
        ]}
      >
        {this.state.isShowingNewPlaylistAlert && (
          <DialogAlert
            initialInputText={
              this.props.track != null ? this.props.track.name : ""
            }
            submitInput={this.createNewPlaylist}
            closeDialog={this.closeNewPlaylistAlert}
          />
        )}
        {this.renderContent()}
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 2,
    backgroundColor: "#121212",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  headerBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "#191919",
    height: HEADER_HEIGHT,
  },
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  leftAlignedCancelButton: {
    position: "absolute",
    left: 20,
  },
  cancelButtonText: {
    fontSize: 13,
    color: "white",
  },
  headerText: {
    fontWeight: "700",
    fontSize: 16,
    color: "white",
  },
  scrollViewContent: {
    flex: 1,
    paddingBottom: openOffset + 50,
    paddingTop: Platform.OS !== "ios" ? HEADER_HEIGHT : 0,
  },
  showNewPlaylistButton: {
    alignSelf: "center",
    paddingVertical: 14,
  },
});

mapStateToProps = (state) => ({
  show: state.tracksReducer.isShowingPlaylists,
  playlists: state.playlistsReducer.playlists,
  track: state.tracksReducer.selectedSpotifyTrack,
});

mapDispatchToProps = (dispatch) => ({
  onBack: () => dispatch(hidePlaylists()),
  createPlaylist: (playlistName) => {
    dispatch(createPlaylist(playlistName));
  },
  playlistSelected: (playlist) => {
    dispatch(addTrackToSpotifyPlaylist(playlist));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(AllPlaylistsScreen);
