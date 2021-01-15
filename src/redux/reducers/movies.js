import _ from "lodash";

import actionTypes from "../actionTypes";

const movieReducer = ($$state = [], action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.movies.UPDATE:
      return _.get(payload, "Search");
    case actionTypes.movies.SHOW:
    case actionTypes.movies.NEW:
      return payload;
    default:
      return $$state;
  }
};

export default movieReducer;
