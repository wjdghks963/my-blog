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
};

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostJson: (state, action: PayloadAction<EditPost>) => {
      const { id, markdown, tags, title } = action.payload;
      state.id = id;
      state.markdown = markdown;
      state.tags = tags;
      state.title = title;
    },
  },
});

export const { setPostJson } = postSlice.actions;
export default postSlice.reducer;
