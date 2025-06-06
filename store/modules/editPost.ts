import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditPost } from "@types";

const initialState: EditPost = {
  id: 1,
  title: "",
  markdown: "",
  tags: [],
  description: "",
  category: [],
};

const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {
    setPostJson: (state, action: PayloadAction<EditPost>) => {
      const { id, markdown, tags, title, description, category } = action.payload;
      state.id = id;
      state.markdown = markdown;
      state.tags = tags;
      state.title = title;
      state.description = description;
      state.category = category;
    },
  },
});

export const { setPostJson } = editPostSlice.actions;
export default editPostSlice.reducer;
