import type { Meta, StoryObj } from "@storybook/react";
import LayerEffectsSettings from "./LayerEffectsSettings";
import { mockPage } from "@root/src/lib/mock";
import { fn } from "@storybook/test";

const meta = {
  title: "Editor/LayerEffectsSettings",
  component: LayerEffectsSettings,
  parameters: {
    layout: "fullscreen",
  },
  args: {
    effectsDeps: Object.values(mockPage.layers[0]?.effects ?? {}),
    effects: mockPage.layers[0]?.effects,
    onEffectChange: () => fn(),
    onImageChange: () => fn(),
    layersExists: true,
  },
} satisfies Meta<typeof LayerEffectsSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayerEffectsSettingsStory: Story = {};
