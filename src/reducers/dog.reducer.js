import { actions } from "../actions/dog.actions";

// Initial State
const INITIAL_STATE = {
  dogData: [],
  dogCount: 0,
};

// User Reducer.
export default (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
    case actions.SET_DOG_DATA:
      return { ...state, dogData: data };
    case actions.SET_DOG_COUNT:
      return { ...state, dogCount: data };
    default:
      return state;
  }
};
