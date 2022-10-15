import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import postReducer from "./post";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  // slcie한 reducer 모듈을 결합한다.
  return combineReducers({
    postReducer,
  })(state, action);
};

export default reducer;
