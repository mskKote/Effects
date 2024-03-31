import type { Meta, StoryObj } from "@storybook/react";
import LayersSettings from "./LayersSettings";
import { mockPage } from "../../utils/mock";
import { ELanguages } from "../../interfaces/IContentPage";
import { fn } from "@storybook/test";

const meta = {
  title: "Editor/LayersSettings",
  component: LayersSettings,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    layers: mockPage.layers,
    lang: ELanguages.ru_RU,
    currentLayer: 0,
    setContentPage: () => fn(),
    setCurrentLayer: () => fn(),
  },
  argTypes: {
    lang: {
      defaultValue: ELanguages.ru_RU,
      options: ELanguages,
      control: "select",
    },
    currentLayer: {
      options: [0, 1],
      controls: "radio",
    },
  },
} satisfies Meta<typeof LayersSettings>;

export default meta;
type Story = StoryObj<typeof meta>;

export const LayersSettingsStory: Story = {};
