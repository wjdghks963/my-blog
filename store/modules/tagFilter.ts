import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { tag: string; isSelected: boolean } = {
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
  extraReducers: {
    ["searchQuery/setSelected"]: (state: any) => {
      state.isSelected = false;
    },
  },
});

export const { setFilterTag, setSelected } = tagFilterSlice.actions;
export default tagFilterSlice.reducer;
