import { SET_FACILITIES } from "store/actionTypes/data";

export const setFacilities = (facilities) => ({
  type: SET_FACILITIES,
  payload: facilities,
});
