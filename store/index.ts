import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import reducer from "./modules";

const makeStore = () =>
  // store 생성
  configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }),
    devTools: process.env.NODE_ENV !== "production",
  });
// .concat(logger)

// redux 사용을 위한 wrapper 생성
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV !== "production",
});
