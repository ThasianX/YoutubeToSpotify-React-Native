import React from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
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

const closedOffset = Dimensions.get("window").height;
const openOffset = 54;

// TODO: reset scroll state everytime this view is dismissed
// TODO: add modal swipe to this
class AllPlaylistsScreen extends React.Component {
  state = {
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

  // TODO: Add blur effect to the header
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: this.state.modalOffset }] },
        ]}
      >
        <DialogAlert
          isDialogVisible={this.state.isShowingNewPlaylistAlert}
          initialInputText={
            this.props.track != null ? this.props.track.title : ""
          }
          submitInput={this.createNewPlaylist}
          closeDialog={this.closeNewPlaylistAlert}
        />
        <View style={styles.headerBackground}>
          <View style={styles.center}>
            <View style={styles.leftAlignedCancelButton}>
              <TouchableOpacity
                onPress={this.props.onBack}
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
              >
                <Text style={styles.cancelButtonText}>{"Cancel"}</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>{"Add to Playlist"}</Text>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView style={{ backgroundColor: "#121212" }}>
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
                    subtitle={`${playlist.numOfTracks} songs`}
                    image={playlist.image}
                    onPress={() => this.props.playlistSelected(playlist)}
                  />
                );
              })}
          </ScrollView>
        </View>
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
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    overflow: "hidden",
  },
  headerBackground: {
    backgroundColor: "#191919",
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  leftAlignedCancelButton: {
    position: "absolute",
    left: 20,
  },
  cancelButtonText: {
    fontSize: 12,
    color: "white",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 14,
    color: "white",
  },
  content: {
    flex: 12,
    backgroundColor: "#121212",
    paddingBottom: openOffset,
  },
  showNewPlaylistButton: {
    alignSelf: "center",
    paddingVertical: 24,
  },
});

mapStateToProps = (state) => ({
  show: state.tracksReducer.isShowingPlaylists,
  playlists: state.playlistsReducer.playlists,
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
