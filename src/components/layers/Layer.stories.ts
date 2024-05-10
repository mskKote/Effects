import type { Meta, StoryObj } from "@storybook/react";
import Layer from "./Layer";
import { mockPage } from "@root/src/lib/mock";

const meta = {
  title: "Editor/Layer",
  component: Layer,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    layer: mockPage.layers[1],
    num: 1,
  },
  argTypes: {},
} satisfies Meta<typeof Layer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayerStory: Story = {};
