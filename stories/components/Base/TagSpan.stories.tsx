import React from "react";
import TagSpan from "@components/Post/TagSpan";
import { ComponentMeta, ComponentStory, Story } from "@storybook/react";
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

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Base/TagSpan",
  component: TagSpan,
  argsType: {
    className: { description: "ss", control: { type: "text" } },
    tag: { description: "Data로 받은 태그 이름", control: { type: "text" } },
    clickOk: { control: { type: "boolean" } },
  },
  parameters: {
    docs: {
      description: {
        component: "Span으로 만든 Tag component",
      },
    },
  },
  decorators: [
    (Story: Story) => (
      <Mockstore tagState={[{ tag: "ss" }]}>
        <Story />
      </Mockstore>
    ),
  ],
} as ComponentMeta<typeof TagSpan>;

const Template: ComponentStory<typeof TagSpan> = (args) => (
  <TagSpan {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  tag: "이것은 태그 네임입니다.",
  tagName: "dk",
  className: "",
  clickOk: true,
};
