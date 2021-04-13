// action types.
export const actions = {
  SET_DOG_DATA: "SET_DOG_DATA",
  SET_DOG_COUNT: "SET_DOG_COUNT",
};

// set complete data to redux.
export const setDogData = (data) => ({
  type: actions.SET_DOG_DATA,
  data,
});

export const setDogCount = (data) => ({
  type: actions.SET_DOG_COUNT,
  data,
});
