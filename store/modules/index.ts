import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";
import editPostReducer, { EditPost } from "./editPost";
import tagFilterReducer from "./tagFilter";
import searchQueryReducer from "./searchQuery";

interface ReduxSliceState {
  editPostReducer: EditPost;
  tagFilterReducer: { tag: string };
  searchQueryReducer: { query: string };
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
    searchQueryReducer,
  })(state, action);
};

export default reducer;
