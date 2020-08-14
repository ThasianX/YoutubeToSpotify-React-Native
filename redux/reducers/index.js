import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { tracksReducer } from "./tracksReducer";
import { playlistsReducer } from "./playlistsReducer";

const rootReducer = combineReducers({
  authReducer,
  tracksReducer,
  playlistsReducer,
});

export default rootReducer;
