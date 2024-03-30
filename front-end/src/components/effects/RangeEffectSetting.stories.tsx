import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import RangeEffectSetting from "./RangeEffectSetting";
import allDefaultEffects from "./model";
import { EEffects } from "../../interfaces/IEffects";

const RangeEffectSettingWithHooks = ({ type }: { type: EEffects }) => {
  const data = allDefaultEffects[type];
  const [_, setValue] = React.useState(Number(data?.options?.value));
  return (
    <RangeEffectSetting
      {...data}
      onChange={(e) => setValue(Number(e.target.value))}
    />
  );
};

const meta = {
  title: "Editor/RangeEffectSetting",
  component: RangeEffectSettingWithHooks,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      options: [
        EEffects.blur,
        EEffects.brightness,
        EEffects.saturate,
        EEffects.contrast,
        EEffects.grayscale,
        EEffects.invert,
        EEffects.hueRotate,
        EEffects.sepia,
        EEffects.opacity,
      ],
      control: { type: "radio" },
    },
  },
} satisfies Meta<typeof RangeEffectSettingWithHooks>;

export default meta;
type Story = StoryObj<typeof meta>;

export const BlurStory: Story = {
  args: {
    type: EEffects.blur,
  },
};
