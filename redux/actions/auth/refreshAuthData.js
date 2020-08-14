import { AuthActions } from "../../actionTypes";
import { refreshTokens } from "../../../spotify";
import { getAuthData } from "../../../utils";

const refreshData = (authData) => {
  return {
    type: AuthActions.DATA_REFRESH,
    payload: authData,
  };
};

export const refreshAuthData = () => {
  return async (dispatch, getState) => {
    const authData = getAuthData(getState());
    const tokenExpirationTime = authData.expirationTime;

    if (new Date().getTime() > Number(tokenExpirationTime)) {
      let refreshedAuthData = await refreshTokens(authData);
      dispatch(refreshData(refreshedAuthData));
    }
  };
};
