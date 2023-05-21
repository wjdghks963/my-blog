import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface TagInitialState{
  tag: string; isSelected: boolean
}

const initialState: TagInitialState = {
  tag: "all",
  isSelected: true,
};

const tagFilterSlice = createSlice({
  name: "tagFilter",
  initialState,
  reducers: {
    setFilterTag: (state, action: PayloadAction<{ tag: string }>) => {
      const { tag } = action.payload;
      state.tag = tag;
    },
    setSelected: (state, action: PayloadAction<{ isSelected: boolean }>) => {
      const { isSelected } = action.payload;
      state.isSelected = isSelected;
    },
  },

});

export const { setFilterTag } = tagFilterSlice.actions;
export default tagFilterSlice.reducer;
