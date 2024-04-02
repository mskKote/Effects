import type { Meta, StoryObj } from "@storybook/react";
import Layers from "./Layers";
import { mockPage } from "@utils/mock";
import { ELanguages } from "@interfaces/IContentPage";

const meta = {
  title: "Editor/Layers",
  component: Layers,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
  args: {
    layers: mockPage.layers,
    lang: ELanguages.ru,
    parallaxes: mockPage.layers
      .map((x) => x.effects.parallax?.value ?? 0)
      .join(),
    isParallax: true,
  },
  argTypes: {
    lang: {
      defaultValue: ELanguages.ru,
      options: ELanguages,
      control: "select",
    },
    isParallax: {
      defaultValue: true,
      type: "boolean",
    },
  },
} satisfies Meta<typeof Layers>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayersStory: Story = {
  render: (args) => <Layers {...args} />,
};
