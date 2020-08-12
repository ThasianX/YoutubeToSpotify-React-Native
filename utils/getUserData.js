import { AsyncStorage } from "react-native";

export const getUserData = async (key) => {
  const retrievedValue = await AsyncStorage.getItem(key);
  const value = JSON.parse(retrievedValue);
  return value;
};
