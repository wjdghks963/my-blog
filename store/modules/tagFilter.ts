import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { tag: string } = {
  tag: "",
};

const tagFilterSlice = createSlice({
  name: "tagFilter",
  initialState,
  reducers: {
    setFilterTag: (state, action: PayloadAction<{ tag: string }>) => {
      const { tag } = action.payload;
      state.tag = tag;
    },
  },
});

export const { setFilterTag } = tagFilterSlice.actions;
export default tagFilterSlice.reducer;
