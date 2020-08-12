import React, { PureComponent } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// https://github.com/joseestrella89/react-native-dialog-input/blob/master/index.js

// TODO: add the keyboard animation that spotify uses
class DialogAlert extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { inputModal: props.initValueTextInput, openning: true };
  }

  handleOnRequestClose = () => {
    this.props.closeDialog();
    this.setState({ inputModal: "" });
  };

  handleOnKeyPress = () => {
    this.setState({ openning: false });
  };

  handleOnChangeText = (inputModal) => {
    this.setState({ inputModal, openning: false });
  };

  handleOnCloseDialog = () => {
    this.props.closeDialog();
    this.setState({ inputModal: "", openning: true });
  };

  handleSubmit = () => {
    this.props.submitInput(this.state.inputModal);
    this.setState({ inputModal: "", openning: true });
  };

  isTextInputBlank = () => {
    return this.state.inputModal.length > 0;
  };

  render() {
    let value;
    if (!this.state.openning) {
      value = this.state.inputModal;
    } else {
      value = this.props.initValueTextInput
        ? this.props.initValueTextInput
        : "";
    }

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.props.isDialogVisible}
        onRequestClose={this.handleOnRequestClose}
      >
        <View style={[styles.container]}>
          <View style={styles.modal_container}>
            <View style={styles.modal_body}>
              <Text style={styles.title_modal}>{"Create New Playlist"}</Text>
              <Text style={styles.message_modal}>
                {"Enter a name for this new playlist"}
              </Text>
              <TextInput
                style={styles.input_container}
                autoCorrect={false}
                autoFocus={true}
                onKeyPress={this.handleOnKeyPress}
                underlineColorAndroid="transparent"
                onChangeText={this.handleOnChangeText}
                value={value}
              />
            </View>
            <View style={styles.btn_container}>
              <TouchableOpacity
                style={styles.touch_modal}
                onPress={this.handleOnCloseDialog}
              >
                <Text style={styles.btn_modal_left}>{"Cancel"}</Text>
              </TouchableOpacity>
              <View style={styles.divider_btn}></View>
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
          </View>
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
        minWidth: 240,
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
    fontSize: 15,
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
    fontSize: 11,
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
    fontSize: 12,
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
        maxHeight: 40,
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
    fontWeight: "600",
    ...Platform.select({
      ios: {
        fontSize: 15,
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
    ...Platform.select({
      ios: {
        fontSize: 15,
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
