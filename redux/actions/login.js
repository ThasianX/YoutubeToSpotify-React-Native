import { getTokens } from "../../spotify/getTokens";
import { AuthActions } from "../actionTypes";

const logIn = () => {
  return {
    type: AuthActions.LOGIN_REQUEST,
  };
};

const logInSuccess = (loginData) => {
  return {
    type: AuthActions.LOGIN_SUCCESS,
    payload: loginData,
  };
};

export const login = () => {
  return async (dispatch) => {
    dispatch(logIn());
    try {
      let tokens = await getTokens();
      dispatch(logInSuccess({ ...tokens }));
    } catch (error) {
      console.error(error);
    }
  };
};
