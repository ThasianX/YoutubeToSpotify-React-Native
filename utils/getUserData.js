import { AsyncStorage } from "react-native";

export const getUserData = async (key) => {
  return AsyncStorage.getItem(key);
};
