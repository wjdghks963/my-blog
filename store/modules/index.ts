import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import editPostReducer, { EditPost } from "./editPost";
import tagFilterReducer from "./tagFilter";

interface ReduxSliceState {
  editPostReducer: EditPost;
  tagFilterReducer: { tag: string };
}

const reducer = (
  state: any,
  action: AnyAction
): CombinedState<ReduxSliceState> => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  // slcie한 reducer 모듈을 결합한다.
  return combineReducers({
    editPostReducer,
    tagFilterReducer,
  })(state, action);
};

export default reducer;
