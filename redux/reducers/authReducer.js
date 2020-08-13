import { AuthActions } from "../actionTypes";

const initialState = {
  isLoggingIn: false,
  loggedIn: false,
  accessToken: "",
  refreshToken: "",
  expirationTime: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AuthActions.LOGIN_REQUEST:
      return {
        ...state,
        isLoggingIn: true,
      };
    case AuthActions.LOGIN_SUCCESS:
      return {
        ...state,
        ...action.payload,
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
      };
    default:
      return state;
  }
};

export default authReducer;
