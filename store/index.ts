import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";

import reducer from "./modules";

export const makeStore = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return configureStore({
    reducer,
    middleware: (getDefaultMiddleware) =>
      isDevelopment
        ? getDefaultMiddleware({ serializableCheck: false }).concat(logger) // 개발 환경에만 logger 추가
        : getDefaultMiddleware({ serializableCheck: false }),
    devTools: isDevelopment, // Redux DevTools는 개발 환경에서만 활성화
  });
};

// redux 사용을 위한 wrapper 생성
export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development", // 디버그 모드도 개발 환경에서만 활성화
});
