import MiniPost from "@components/Post/MiniPost";
import { ComponentStory, Story } from "@storybook/react";
import { Provider } from "react-redux";
import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";

const Mockstore = ({
  tagState,
  children,
}: {
  tagState: any;
  children: any;
}) => (
  <Provider
    store={configureStore({
      reducer: {
        taskbox: createSlice({
          name: "tagFilter",
          initialState: tagState,
          reducers: {
            setFilterTag: (state, action: PayloadAction<{ tag: string }>) => {
              const { tag } = action.payload;
              state.tag = tag;
            },
          },
        }).reducer,
      },
    })}
  >
    {children}
  </Provider>
);

export interface MiniPostProps {
  children: React.ReactNode;
  /** 제목 */
  title: string;
  /** 요약 */
  description: string;
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  name: "Component/Blog/MiniPost",
  component: "MiniPost",
  argsType: {
    title: {
      name: "title",
      type: { name: "string", required: true },
      controls: { type: "text" },
    },
  },
  decorators: [
    (Story: Story) => (
      <Mockstore tagState={[{ tag: "ss" }]}>
        <Story />
      </Mockstore>
    ),
  ],
};
const Template: ComponentStory<typeof MiniPost> = (args) => (
  <MiniPost {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  data: {
    id: 1,
    title: "post title",
    content: "post djdjoasjdoasjdosadjoajsdojas",
    description: "post에 대한 간략 내용",
    tags: [{ id: 1, tag: "dsds" }],
    views: 1212,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};
