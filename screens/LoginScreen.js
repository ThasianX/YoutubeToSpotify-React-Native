import React from "react";
import { View, StyleSheet } from "react-native";
import RoundedButton from "../components/RoundedButton";
import { connect } from "react-redux";
import { login } from "../redux/actions";

class LoginScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RoundedButton title={"LOG IN"} onPress={this.props.logIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#121212",
  },
});

const mapDispatchToProps = (dispatch) => ({
  logIn: () => {
    dispatch(login());
  },
});

export default connect(null, mapDispatchToProps)(LoginScreen);
