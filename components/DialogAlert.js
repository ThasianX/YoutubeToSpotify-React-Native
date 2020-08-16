import React from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Animated,
} from "react-native";

// https://github.com/joseestrella89/react-native-dialog-input/blob/master/index.js

const entranceOffset = 50;
const stationaryOffset = 0;
const entranceScale = 1.3;
const stationaryScale = 1;
const animationDuration = 250;

class DialogAlert extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputText: this.props.initialInputText,
      opacity: new Animated.Value(0),
      scale: new Animated.Value(entranceScale),
      offset: new Animated.Value(entranceOffset),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.offset, {
      toValue: stationaryOffset,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
    Animated.timing(this.state.scale, {
      toValue: stationaryScale,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
  }

  handleOnChangeText = (text) => {
    this.setState({ inputText: text });
  };

  handleOnCloseDialog = () => {
    this.closeDialog(() => this.props.closeDialog());
  };

  handleSubmit = () => {
    this.closeDialog(() => this.props.submitInput(this.state.inputText));
  };

  closeDialog = (action) => {
    Animated.timing(this.state.opacity, {
      toValue: 0,
      duration: animationDuration,
      useNativeDriver: true,
    }).start();
    action();
  };

  isTextInputBlank = () => {
    return this.state.inputText.length > 0;
  };

  render() {
    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        onRequestClose={this.handleOnRequestClose}
      >
        <View style={styles.container}>
          <Animated.View
            style={[
              styles.modal_container,
              {
                opacity: this.state.opacity,
                transform: [
                  { scale: this.state.scale },
                  { translateY: this.state.offset },
                ],
              },
            ]}
          >
            <View style={styles.modal_body}>
              <Text style={styles.title_modal}>{"Create New Playlist"}</Text>
              <Text style={styles.message_modal}>
                {"Enter a name for this new playlist"}
              </Text>
              <TextInput
                style={styles.input_container}
                autoCorrect={false}
                autoFocus={true}
                underlineColorAndroid="transparent"
                onChangeText={this.handleOnChangeText}
                value={this.state.inputText}
              />
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.touch_modal}
                onPress={this.handleOnCloseDialog}
              >
                <Text style={styles.btn_modal_left}>{"Cancel"}</Text>
              </TouchableOpacity>
              <View style={styles.divider_btn} />
              <TouchableOpacity
                style={[styles.touch_modal]}
                disabled={!this.isTextInputBlank()}
                onPress={this.handleSubmit}
              >
                <Text
                  style={[
                    styles.btn_modal_right,
                    {
                      color: this.isTextInputBlank() ? "#408AE2" : "gray",
                    },
                  ]}
                >
                  {"Create"}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 150,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modal_container: {
    marginLeft: 30,
    marginRight: 30,
    ...Platform.select({
      ios: {
        backgroundColor: "#242225",
        borderRadius: 10,
        width: 260,
        height: 160,
      },
      android: {
        backgroundColor: "#242225",
        elevation: 24,
        minWidth: 280,
        borderRadius: 5,
      },
    }),
  },
  modal_body: {
    ...Platform.select({
      ios: {
        padding: 10,
      },
      android: {
        padding: 24,
      },
    }),
  },
  title_modal: {
    fontWeight: "600",
    color: "white",
    fontSize: 17,
    ...Platform.select({
      ios: {
        marginTop: 10,
        textAlign: "center",
        marginBottom: 5,
      },
      android: {
        textAlign: "left",
      },
    }),
  },
  message_modal: {
    fontSize: 13,
    color: "white",
    ...Platform.select({
      ios: {
        textAlign: "center",
        marginBottom: 10,
      },
      android: {
        textAlign: "left",
        marginTop: 20,
      },
    }),
  },
  input_container: {
    textAlign: "left",
    fontSize: 13,
    color: "white",
    ...Platform.select({
      ios: {
        backgroundColor: "#1e1c21",
        borderRadius: 5,
        paddingTop: 5,
        borderWidth: 1,
        borderColor: "#3B393D",
        paddingBottom: 5,
        paddingLeft: 10,
        marginTop: 10,
      },
      android: {
        marginTop: 8,
        borderBottomWidth: 2,
        borderColor: "#3B393D",
      },
    }),
  },
  btn_container: {
    flex: 1,
    flexDirection: "row",
    ...Platform.select({
      ios: {
        justifyContent: "center",
        borderTopWidth: 1,
        borderColor: "#3B393D",
      },
      android: {
        alignSelf: "flex-end",
        maxHeight: 52,
        paddingTop: 8,
        paddingBottom: 8,
      },
    }),
  },
  divider_btn: {
    ...Platform.select({
      ios: {
        width: 1,
        backgroundColor: "#353237",
      },
      android: {
        width: 0,
      },
    }),
  },
  touch_modal: {
    justifyContent: "center",
    alignItems: "center",
    ...Platform.select({
      ios: {
        flex: 1,
      },
      android: {
        paddingRight: 8,
        minWidth: 64,
        height: 36,
      },
    }),
  },
  btn_modal_left: {
    fontWeight: "bold",
    ...Platform.select({
      ios: {
        fontSize: 16,
        color: "#408AE2",
        textAlign: "center",
      },
      android: {
        textAlign: "right",
        color: "#009688",
        padding: 8,
      },
    }),
  },
  btn_modal_right: {
    fontWeight: "500",
    ...Platform.select({
      ios: {
        fontSize: 16,
        textAlign: "center",
      },
      android: {
        textAlign: "right",
        color: "#009688",
        padding: 8,
      },
    }),
  },
});

export default DialogAlert;
