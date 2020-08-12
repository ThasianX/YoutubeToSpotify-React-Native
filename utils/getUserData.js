import { AsyncStorage } from "react-native";

// TODO: weird refresh error here when refreshing the access token when it's expired
export const getUserData = async (key) => {
  const retrievedValue = await AsyncStorage.getItem(key);
  const value = JSON.parse(retrievedValue);
  return value;
};
