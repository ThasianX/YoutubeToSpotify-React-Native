import { AsyncStorage } from "react-native";

export const setUserData = async (key, value) => {
  return AsyncStorage.setItem(key, value);
};
