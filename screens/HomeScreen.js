import React from "react";
import LoginScreen from "./LoginScreen";
import AddSongScreen from "./AddSongScreen";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  // TODO: refresh token if already logged in here? I'm thinking actually should do this elsewhere
  logIn = async () => {
    const tokenExpirationTime = await getUserData("expirationTime");
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await refreshTokens();
    }
  };

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
