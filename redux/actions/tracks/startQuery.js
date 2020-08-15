import { TrackActions } from "../../actionTypes";

export const startQuery = (queryType) => ({
  type: TrackActions.START_QUERY,
  payload: queryType,
});
