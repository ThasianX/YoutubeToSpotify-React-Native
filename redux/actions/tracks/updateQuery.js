import { TrackActions } from "../../actionTypes";

export const updateQuery = (keywords) => ({
  type: TrackActions.UPDATE_QUERY,
  payload: keywords,
});
