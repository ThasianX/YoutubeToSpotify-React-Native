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

const screenHeight = Dimensions.get("window").height;

class AllPlaylistsScreen extends React.Component {
  state = {
    modalOffset: new Animated.Value(screenHeight),
    playlists: [],
  };

  componentDidMount() {
    this.toggleModal();
  }

  componentDidUpdate() {
    this.toggleModal();
  }

  toggleModal = () => {
    if (this.props.show == true) {
      Animated.spring(this.state.modalOffset, {
        toValue: 54,
      }).start();
    } else {
      Animated.spring(this.state.modalOffset, {
        toValue: screenHeight,
      }).start();
    }
  };

  componentDidMount() {
    this.setState({
      playlists: [
        {
          title: "2020",
          numOfSongs: 143,
          image:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          id: "58dGcVM5imekX0B4dtijvj",
        },
        {
          title: "2020",
          numOfSongs: 143,
          image:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          id: "58dGcVM5imerkqrqX0B4dtijvj",
        },
        {
          title: "2020",
          numOfSongs: 143,
          image:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          id: "58dGcVM5imekdqqX0B4dtijvj",
        },
        {
          title: "2020",
          numOfSongs: 143,
          image:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          id: "58dGgcVM5imeksX0B4dtijvj",
        },
        {
          title: "2020",
          numOfSongs: 143,
          image:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          id: "58ddGcVM5imekX0sB4dtijvj",
        },
        {
          title: "2020",
          numOfSongs: 143,
          image:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          id: "58sdGcVM5imekX0dB4dtijvj",
        },
        {
          title: "2020",
          numOfSongs: 143,
          image:
            "https://i.scdn.co/image/ab67616d00004851f7db43292a6a99b21b51d5b4",
          id: "58dssafGcVM5imeksX0B4dtijvj",
        },
      ],
    });
  }

  render() {
    return (
      <Animated.View
        style={[styles.container, { top: this.state.modalOffset }]}
      >
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
                    key={playlist.id}
                    title={playlist.title}
                    subtitle={`${playlist.numOfSongs} songs`}
                    image={playlist.image}
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