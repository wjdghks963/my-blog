import { combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import postReducer from "./post";
import { persistReducer } from "redux-persist";

const storage = require("redux-persist/lib/storage").default;

const persistConfig = {
  key: "root",
  storage,
};

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
const persistedReducer = persistReducer(persistConfig, reducer);
export default persistedReducer;
