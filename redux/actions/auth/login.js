import { getTokens } from "../../../spotify";
import { AuthActions } from "../../actionTypes";

const requestLogin = () => {
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

const logInFailure = () => {
  return {
    type: AuthActions.LOGIN_FAILURE,
  };
};

export const login = () => {
  return async (dispatch) => {
    dispatch(requestLogin());
    try {
      let tokens = await getTokens();
      dispatch(logInSuccess({ ...tokens }));
    } catch (error) {
      dispatch(logInFailure());
    }
  };
};
