import type { Meta, StoryObj } from "@storybook/react";
import Layer from "./Layer";
import { mockPage } from "@root/src/lib/mock";
import { ELanguages } from "@interfaces/IContentPage";

const meta = {
  title: "Editor/Layer",
  component: Layer,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    layer: mockPage.layers[1],
    lang: ELanguages.ru,
    num: 1,
  },
  argTypes: {
    lang: {
      defaultValue: ELanguages.ru,
      options: ELanguages,
      control: "select",
    },
  },
} satisfies Meta<typeof Layer>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayerStory: Story = {};
