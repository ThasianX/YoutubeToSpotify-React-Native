import React from "react";
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  Animated,
} from "react-native";
import ImageTextRow from "../components/ImageTextRow";
import RoundedButton from "../components/RoundedButton";
import { getAllUserOwnedPlaylists } from "../spotify/getAllUserOwnedPlaylists";
import DialogAlert from "../components/DialogAlert";
import { createNewPlaylist } from "../spotify/createNewPlaylist";

const screenHeight = Dimensions.get("window").height;

// TODO: This screen should always fetch new playlists everytime it's displayed
// TODO: reset scroll state everytime this view is dismissed
class AllPlaylistsScreen extends React.Component {
  state = {
    modalOffset: new Animated.Value(screenHeight),
    playlists: [],
    showNewPlaylistAlert: false,
  };

  componentDidMount() {
    this.toggleModal();
  }

  async componentDidUpdate(prevProps) {
    if (this.props.show === prevProps.show) {
      return;
    }

    if (this.props.show) {
      await this.refreshPlaylists();
    }
    this.toggleModal(this.props.show);
  }

  toggleModal = (show) => {
    if (show) {
      Animated.spring(this.state.modalOffset, {
        toValue: 54,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.spring(this.state.modalOffset, {
        toValue: screenHeight,
        useNativeDriver: true,
      }).start();
    }
  };

  refreshPlaylists = async () => {
    const userOwnedPlaylists = await getAllUserOwnedPlaylists();
    // TODO: I think here would be a good place to call a callback to the addsongscreen for it to dim its opacity
    this.setState({
      playlists: userOwnedPlaylists,
    });
  };

  playlistSelected = async (playlist) => {
    this.props.onBack();
    this.props.onPlaylistSelected(playlist);
  };

  showNewPlaylistPopup = () => {
    this.setState({
      showNewPlaylistAlert: true,
    });
  };

  handleNewPlaylist = async (name) => {
    let response = await createNewPlaylist(name);
    this.props.onBack();
    if (response["error"] == null) {
      this.props.onPlaylistSelected(response);
    }
  };

  closeNewPlaylistAlert = () => {
    this.setState({
      showNewPlaylistAlert: false,
    });
  };

  // TODO: Add blur effect to the header
  // TODO: Scrollview can't fully scroll to bottom
  // TODO: once a playlist is clicked, it should call a calback in which the addsongscreen should add the song to the playlist
  render() {
    return (
      <Animated.View
        style={[
          styles.container,
          { transform: [{ translateY: this.state.modalOffset }] },
        ]}
      >
        {this.props.show && (
          <DialogAlert
            isDialogVisible={this.state.showNewPlaylistAlert}
            title={"Create New Playlist"}
            message={"Enter a name for this new playlist"}
            initValueTextInput={
              this.props.activeTrack != null ? this.props.activeTrack.title : ""
            }
            submitInput={this.handleNewPlaylist}
            closeDialog={this.closeNewPlaylistAlert}
          />
        )}
        <View style={styles.headerBackground}>
          <View style={styles.center}>
            <View style={styles.leftAlignedCancelButton}>
              <TouchableOpacity
                onPress={this.props.onBack}
                hitSlop={{ top: 20, left: 20, bottom: 20, right: 20 }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.headerText}>Add to Playlist</Text>
          </View>
        </View>
        <View style={styles.content}>
          <ScrollView style={{ backgroundColor: "#121212" }}>
            <View style={styles.showNewPlaylistButton}>
              <RoundedButton
                title={"NEW PLAYLIST"}
                onPress={this.showNewPlaylistPopup}
              />
            </View>
            {this.state.playlists.length > 0 &&
              this.state.playlists.map((playlist) => {
                return (
                  <ImageTextRow
                    key={playlist["id"]}
                    title={playlist["name"]}
                    subtitle={`${playlist["tracks"]["total"]} songs`}
                    image={
                      playlist["images"].length > 0
                        ? playlist["images"][0]["url"]
                        : null
                    }
                    onPress={() => this.playlistSelected(playlist)}
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
  },
  showNewPlaylistButton: {
    alignSelf: "center",
    paddingVertical: 24,
  },
});

export default AllPlaylistsScreen;
