import type { Meta, StoryObj } from "@storybook/react";
import Loader from "./Loader";

const meta = {
  title: "Common/Loader",
  component: Loader,
  args: {},
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: "fullscreen",
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LoaderStory: Story = {};
