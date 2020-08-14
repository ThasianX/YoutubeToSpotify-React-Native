import { PlaylistActions } from "../actionTypes";

const initialState = {
  playlists: [],
  isLoadingPlaylists: false,
};

export const playlistsReducer = (state = initialState, action) => {
  switch (action.type) {
    case PlaylistActions.GET_USER_PLAYLISTS_REQUEST:
      return {
        ...state,
        isLoadingPlaylists: true,
      };
    case PlaylistActions.GET_USER_PLAYLISTS_SUCCESS:
      return {
        ...state,
        playlists: action.payload,
        isLoadingPlaylists: false,
      };
    case PlaylistActions.GET_USER_PLAYLISTS_FAILURE:
      return {
        ...state,
        isLoadingPlaylists: false,
      };
    default:
      return state;
  }
};
