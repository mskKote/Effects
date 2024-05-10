import type { Meta, StoryObj } from "@storybook/react";
import Layers from "./Layers";
import { mockPage } from "@root/src/lib/mock";

const meta = {
  title: "Editor/Layers",
  component: Layers,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    layers: mockPage.layers,
    parallaxes: mockPage.layers
      .map((x) => x.effects.parallax?.value ?? 0)
      .join(),
    isParallax: true,
  },
  argTypes: {
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
