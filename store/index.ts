import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";

import reducer from "./modules";

export const makeStore = () =>
  // store 생성
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
    devTools: process.env.NODE_ENV === "development",
  });

// redux 사용을 위한 wrapper 생성
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});
