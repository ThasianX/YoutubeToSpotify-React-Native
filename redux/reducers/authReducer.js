import { AuthActions } from "../actionTypes";

const initialState = {
  isLoggingIn: false,
  loggedIn: false,
  authData: {
    accessToken: "",
    refreshToken: "",
    expirationTime: "",
  },
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        authData: { ...action.payload },
        isLoggingIn: false,
        isLoggedIn: true,
      };
    case AuthActions.LOGIN_FAILURE:
      return {
        ...state,
        isLoggingIn: false,
      };
    case AuthActions.LOGOUT:
      return {
        ...state,
        isLoggedIn: false,
        authData: {
          accessToken: "",
          refreshToken: "",
          expirationTime: "",
        },
      };
    case AuthActions.DATA_REFRESH:
      return {
        ...state,
        authData: { ...action.payload },
      };
    default:
      return state;
  }
};
