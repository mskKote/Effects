import type { Meta, StoryObj } from "@storybook/react";
import LoginForm from "./LoginForm";

const meta = {
  title: "Common/LoginForm",
  component: LoginForm,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof LoginForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoginFormStory: Story = {};
