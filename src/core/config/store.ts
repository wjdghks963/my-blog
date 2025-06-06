import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import logger from "redux-logger";

// import reducer from "./modules"; // 이 경로는 실제 모듈 위치에 맞게 조정 필요 (예: "@store/modules" 또는 상대경로)
// 우선은 Provider.tsx에서 직접 사용하지 않는 reducer import는 주석 처리하고, AppStore, makeStore 위주로 구성합니다.
// 실제 reducer 위치를 확인 후 수정해야 합니다.
// 일단은 원래 파일의 reducer를 그대로 가져온다고 가정하고, 추후 경로 수정이 필요할 수 있음을 인지합니다.
import reducer from "@store/modules";

// `store/index.ts` 기준 `store/modules`를 가리키도록 임시 경로 설정

export const makeStore = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return configureStore({
    reducer, // reducer가 올바르게 참조되어야 함
    middleware: (getDefaultMiddleware) =>
      isDevelopment
        ? getDefaultMiddleware({ serializableCheck: false }).concat(logger)
        : getDefaultMiddleware({ serializableCheck: false }),
    devTools: isDevelopment,
  });
};

export const wrapper = createWrapper(makeStore, {
  debug: process.env.NODE_ENV === "development",
});

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
