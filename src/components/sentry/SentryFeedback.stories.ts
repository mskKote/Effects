import type { Meta, StoryObj } from "@storybook/react";
import SentryFeedback from "./SentryFeedback";
import { fn } from "@storybook/test";

const meta = {
  title: "Common/SentryFeedback",
  component: SentryFeedback,
  parameters: {
    layout: "centered",
  },
  args: {
    requestPermission: () => fn(),
  },
} satisfies Meta<typeof SentryFeedback>;

export default meta;
type Story = StoryObj<typeof meta>;

export const SentryFeedbackStory: Story = {};
