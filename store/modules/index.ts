import { AnyAction, combineReducers } from "@reduxjs/toolkit";
import { EditPost } from "@types";
import { HYDRATE } from "next-redux-wrapper";

import editPostReducer from "./editPost";
import searchQueryReducer from "./searchQuery";
import tagFilterReducer from "./tagFilter";

export interface ReduxSliceState {
  editPostReducer: EditPost;
  tagFilterReducer: { tag: string; isSelected: boolean };
  searchQueryReducer: { query: string; isSelected: boolean };
}

const reducer = (state: any, action: AnyAction): ReduxSliceState => {
  if (action.type === HYDRATE) {
    return {
      ...state,
      ...action.payload,
    };
  }

  return combineReducers({
    editPostReducer,
    tagFilterReducer,
    searchQueryReducer,
  })(state, action);
};

export default reducer;
