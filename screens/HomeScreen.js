import React from "react";
import LoginScreen from "./LoginScreen";
import AddSongScreen from "./AddSongScreen";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  render() {
    if (this.props.isLoggedIn) {
      return <AddSongScreen />;
    }
    return <LoginScreen />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(HomeScreen);
