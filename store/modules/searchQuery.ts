import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: { query: string } = {
  query: "",
};

const searchQuerySlice = createSlice({
  name: "searchQuery",
  initialState,
  reducers: {
    setSearchQuery: (state, action: PayloadAction<{ query: string }>) => {
      const { query } = action.payload;
      state.query = query;
    },
  },
});

export const { setSearchQuery } = searchQuerySlice.actions;
export default searchQuerySlice.reducer;
