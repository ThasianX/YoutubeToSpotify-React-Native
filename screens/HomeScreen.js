import React from "react";
import { View, Text } from "react-native";
import LoginScreen from "./LoginScreen";
import AddSongScreen from "./AddSongScreen";
import { connect } from "react-redux";

class HomeScreen extends React.Component {
  // TODO: refresh token if already logged in here? I'm thinking actually should do this elsewhere
  logIn = async () => {
    const tokenExpirationTime = await getUserData("expirationTime");
    if (!tokenExpirationTime || new Date().getTime() > tokenExpirationTime) {
      await refreshTokens();
    } else {
      this.setState({ accessTokenAvailable: true });
    }
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#121212",
          }}
        >
          <Text style={{ color: "white" }}>LOGGED IN</Text>
        </View>
      );
    }
    return <LoginScreen />;
  }
}

const track = {
  title: "Lean Wit Me",
  info: "209K Likes • 34,664,786 views",
  thumbnail: "http://i3.ytimg.com/vi/WsrVxz4pjGs/maxresdefault.jpg",
};

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.authReducer.isLoggedIn,
  };
};

export default connect(mapStateToProps, null)(HomeScreen);
