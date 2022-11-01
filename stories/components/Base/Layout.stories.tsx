import Layout from "@components/Base/Layout";
import { ComponentStory } from "@storybook/react";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/Layout",
  component: "Layout",
};

const Template: ComponentStory<typeof Layout> = (args) => <Layout {...args} />;

export const Normal = Template.bind({});
Normal.args = {
  footer: false,
  className: "",
  children: <div>sadds</div>,
};
