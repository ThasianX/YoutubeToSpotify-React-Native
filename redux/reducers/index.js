import { combineReducers } from "redux";

import { authReducer } from "./authReducer";
import { tracksReducer } from "./tracksReducer";
import { playlistsReducer } from "./playlistsReducer";

const rootReducer = combineReducers({
  authReducer: authReducer,
  tracksReducer: tracksReducer,
  playlistsReducer: playlistsReducer,
});

export default rootReducer;
