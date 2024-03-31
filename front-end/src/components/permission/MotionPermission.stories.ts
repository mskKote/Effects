import type { Meta, StoryObj } from "@storybook/react";
import MotionPermission from "./MotionPermission";
import { fn } from "@storybook/test";

const meta = {
  title: "Common/MotionPermission",
  component: MotionPermission,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    requestPermission: () => fn(),
  },
} satisfies Meta<typeof MotionPermission>;

export default meta;
type Story = StoryObj<typeof meta>;

export const MotionPermissionStory: Story = {};
