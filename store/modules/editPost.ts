import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPostJson } from "pages/blogs/post";

export interface EditPost extends IPostJson {
  id?: number;
}

const initialState: EditPost = {
  id: 1,
  title: "",
  markdown: "",
  tags: [""],
  description: "",
};

const editPostSlice = createSlice({
  name: "editPost",
  initialState,
  reducers: {
    setPostJson: (state, action: PayloadAction<EditPost>) => {
      const { id, markdown, tags, title, description } = action.payload;
      state.id = id;
      state.markdown = markdown;
      state.tags = tags;
      state.title = title;
      state.description = description;
    },
  },
});

export const { setPostJson } = editPostSlice.actions;
export default editPostSlice.reducer;
