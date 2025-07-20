import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";

import reducer from "@store/modules";

export const makeStore = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return configureStore({
    reducer,
    devTools: isDevelopment,
  });
};

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
