import React from "react";
import { View, Text, Image, Animated, Easing, StyleSheet } from "react-native";

// TODO: Fix font size?

class TransientAlert extends React.Component {
  state = {
    opacity: new Animated.Value(0),
    scale: new Animated.Value(0),
    offset: new Animated.Value(0),
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();

    Animated.spring(this.state.scale, {
      toValue: 1,
      duration: 500,
      easing: Easing.inOut(Easing.bounce),
      useNativeDriver: true,
    }).start();

    setTimeout(() => {
      Animated.timing(this.state.offset, {
        toValue: 50,
        duration: 500,
        useNativeDriver: true,
      }).start();
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();

      setTimeout(() => {
        this.props.onEnded();
      }, 500);
    }, 2000);
  }

  render() {
    return (
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.alertContainer,
            {
              opacity: this.state.opacity,
              transform: [
                { translateY: this.state.offset },
                { scale: this.state.scale },
              ],
            },
          ]}
        >
          <Image style={styles.alertImage} source={this.props.image} />
          <Text style={styles.alertText}>{this.props.message}</Text>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    width: "100%",
    height: "100%",
    zIndex: 5,
  },
  alertContainer: {
    paddingTop: 24,
    paddingHorizontal: 12,
    paddingBottom: 20,
    zIndex: 5,
    width: 125,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    alignItems: "center",
    borderRadius: 8,
    overflow: "hidden",
  },
  alertImage: {
    width: 50,
    height: 50,
    marginBottom: 8,
    resizeMode: "contain",
    tintColor: "white",
  },
  alertText: {
    fontSize: 12,
    color: "white",
    textAlign: "center",
  },
});

export default TransientAlert;
