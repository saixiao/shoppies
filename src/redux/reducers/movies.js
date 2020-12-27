import _ from "lodash";

import actionTypes from "../actionTypes";

const initialState = {
  movies: [],
};

export default ($$state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.movies.UPDATE:
      return _.get(payload, "Search");
    case actionTypes.movies.SHOW:
    default:
      return $$state;
  }
};
