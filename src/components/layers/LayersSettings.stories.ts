import type { Meta, StoryObj } from "@storybook/react";
import LayersSettings from "./LayersSettings";
import { mockPage } from "@root/src/lib/mock";
import { fn } from "@storybook/test";

const meta = {
  title: "Editor/LayersSettings",
  component: LayersSettings,
  parameters: {
    layout: "centered",
  },
  args: {
    layers: mockPage.layers,
    currentLayer: 0,
    setContentPage: () => fn(),
    setCurrentLayer: () => fn(),
  },
  argTypes: {
    currentLayer: {
      options: [0, 1],
      controls: "radio",
    },
  },
} satisfies Meta<typeof LayersSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayersSettingsStory: Story = {};
