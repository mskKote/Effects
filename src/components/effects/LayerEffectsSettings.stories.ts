import type { Meta, StoryObj } from "@storybook/react";
import LayerEffectsSettings from "./LayerEffectsSettings";
import { mockPage } from "@root/src/lib/mock";

const meta = {
  title: "Editor/LayerEffectsSettings",
  component: LayerEffectsSettings,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    effects: Object.entries(mockPage.layers[0]?.effects ?? {}),
  },
} satisfies Meta<typeof LayerEffectsSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayerEffectsSettingsStory: Story = {};
