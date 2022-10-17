import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import editPostReducer from "./editPost";

const reducer = (state, action) => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  // slcie한 reducer 모듈을 결합한다.
  return combineReducers({
    editPostReducer,
  })(state, action);
};

export default reducer;
