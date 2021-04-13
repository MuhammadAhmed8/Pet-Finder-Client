import { actions } from "../actions/user.actions";

// Initial State
const INITIAL_STATE = {
  userData: {},
  userFavourites: [],
  userAdoptions: [],
};

// User Reducer.
export default (state = INITIAL_STATE, { type, data }) => {
  switch (type) {
    case actions.SET_USER_DATA:
      return { ...state, userData: data };
    case actions.SET_USER_FAVOURITES:
      return { ...state, userFavourites: data };
    case actions.SET_USER_ADOPTIONS:
      return { ...state, userAdoptions: data };
    default:
      return state;
  }
};
