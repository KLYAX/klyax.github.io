import { SET_FACILITIES } from "store/actionTypes/data";

const initialState = {
  facilities: [],
};

function reducer(state = initialState, { type, payload }) {
  switch (type) {
    case SET_FACILITIES: {
      return {
        ...state,
        facilities: payload,
      };
    }

    default:
      return state;
  }
}

export default reducer;
