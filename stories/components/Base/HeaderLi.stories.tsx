import { HeaderLi } from "@components/Base/HeaderLi";
import { ComponentStory } from "@storybook/react";

import "@styles/globals.css";
import { useRouter } from "next/router";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/HeaderLi",
  component: "HeaderLi",
  argTypes: {
    name: { control: { type: "text" } },
    router: { control: { type: "text" } },
  },
};

const Template: ComponentStory<typeof HeaderLi> = (args) => (
  <HeaderLi {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  name: "dd",
};
