import _ from "lodash";

import actionTypes from "../actionTypes";

const initialState = {
  movies: [],
};

export default ($$state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case actionTypes.movies.SHOW:
      return { movies: payload.movies };
    default:
      return $$state;
  }
};
