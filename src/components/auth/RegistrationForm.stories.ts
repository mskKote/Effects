import type { Meta, StoryObj } from "@storybook/react";
import RegistrationForm from "./RegistrationForm";

const meta = {
  title: "Common/RegistrationForm",
  component: RegistrationForm,
  parameters: {
    layout: "centered",
  },
  args: {},
} satisfies Meta<typeof RegistrationForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const RegistrationFormStory: Story = {};
