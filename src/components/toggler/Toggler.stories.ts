import type { Meta, StoryObj } from "@storybook/react";
import Toggler from "./Toggler";
import { fn } from "@storybook/test";

const meta = {
  title: "Common/Toggler",
  component: Toggler,
  parameters: {
    layout: "centered",
  },
  args: {
    checked: true,
    onToggle: () => fn(),
  },
  argTypes: {
    checked: {
      defaultValue: true,
      options: [true, false],
      controls: "radio",
    },
  },
} satisfies Meta<typeof Toggler>;

export default meta;
type Story = StoryObj<typeof meta>;

export const TogglerStory: Story = {};
