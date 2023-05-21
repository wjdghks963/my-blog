import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { query: string; isSelected: boolean } = {
  query: "",
  isSelected: false,
};

const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<{ query: string }>) => {
      const { query } = action.payload;
      state.query = query;
    },
    setSelected: (state, action: PayloadAction<{ isSelected: boolean }>) => {
      const { isSelected } = action.payload;
      state.isSelected = isSelected;
    },
  },

});

export const { setSearchQuery, setSelected } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
