import { HeaderLi } from "@components/Base/HeaderLi";
import { ComponentStory } from "@storybook/react";

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  title: "Components/HeaderLi",
  component: "HeaderLi",
  argTypes: {
    name: { control: { type: "text" } },
    router: { control: { type: "text" } },
  },
  decorators: [
    (Story) => (
      <div className="flex flex-row gap-4">
        <Story />
      </div>
    ),
  ],
};

const Template: ComponentStory<typeof HeaderLi> = (args) => (
  <HeaderLi {...args} />
);

export const Normal = Template.bind({});
Normal.args = {
  name: "HOME",
  routerFn: () => "/",
};
