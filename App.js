import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import { store, persistor } from "./redux/store";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
      <HomeScreen />
      {/* </PersistGate> */}
    </Provider>
  );
}
