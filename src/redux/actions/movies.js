import _ from "lodash";
import createAction from "./base";
import actionTypes from "../actionTypes";
import request from "../../util/request";

export const fetchMoviesByTitle = (title) => {
  return createAction(actionTypes.movies.SHOW, request.get(`?t=${title}`));
};

export const fetchMoviesByTitleAndYear = (title, year) => {
  return createAction(
    actionTypes.movies.SHOW,
    request.get(`?t=${title}&y=${year}`)
  );
};
