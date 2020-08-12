import { AsyncStorage } from "react-native";

export const setUserData = async (key, value) => {
  let jsonOfValue = await AsyncStorage.setItem(key, JSON.stringify(value));
  return jsonOfValue;
};
