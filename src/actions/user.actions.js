// action types.
export const actions = {
  SET_USER_DATA: "SET_USER_DATA",
  SET_USER_FAVOURITES: "SET_USER_FAVOURITES",
  SET_USER_ADOPTIONS: "SET_USER_ADOPTIONS",
};

// set complete user data to redux.
export const setUserData = (data) => ({
  type: actions.SET_USER_DATA,
  data,
});

export const setUserFavourites = (data) => ({
  type: actions.SET_USER_FAVOURITES,
  data,
});

export const setUserAdoptions = (data) => ({
  type: actions.SET_USER_ADOPTIONS,
  data,
});
