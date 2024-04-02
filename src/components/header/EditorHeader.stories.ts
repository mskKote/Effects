import type { Meta, StoryObj } from "@storybook/react";
import EditorHeader from "./EditorHeader";
import { mockPage } from "@utils/mock";

const meta = {
  title: "Editor/Header",
  component: EditorHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    contentPage: mockPage,
  },
} satisfies Meta<typeof EditorHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HeaderStory: Story = {};
