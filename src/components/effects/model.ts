import { EEffects } from "../../interfaces/IEffects";
import { RangeSettingProps } from "./RangeEffectSetting";

export type RangeEffectTypes = {
  [name: string]: RangeSettingProps;
};

export const allDefaultEffects: RangeEffectTypes = {
  [EEffects.blur]: {
    options: {
      min: 0,
      max: 15,
      step: 0.5,
      inputMode: "decimal",
      value: 0,
      name: "blur",
    },
    dataList: [0, 5, 10, 15],
  },
  [EEffects.brightness]: {
    options: {
      min: 0,
      max: 200,
      step: 10,
      inputMode: "numeric",
      value: 100,
      name: "brightness",
    },
    dataList: [0, 100, 200],
  },
  [EEffects.saturate]: {
    options: {
      min: 0,
      max: 200,
      step: 1,
      inputMode: "numeric",
      value: 100,
      name: "saturate",
    },
    dataList: [0, 100, 200],
  },
  [EEffects.contrast]: {
    options: {
      min: 0,
      max: 200,
      step: 10,
      inputMode: "numeric",
      value: 100,
      name: "contrast",
    },
    dataList: [0, 100, 200],
  },
  [EEffects.grayscale]: {
    options: {
      min: 0,
      max: 100,
      step: 10,
      inputMode: "numeric",
      value: 0,
      name: "grayscale",
    },
    dataList: [0, 50, 100],
  },
  [EEffects.invert]: {
    options: {
      min: 0,
      max: 100,
      step: 10,
      inputMode: "numeric",
      value: 0,
      name: "invert",
    },
    dataList: [0, 50, 100],
  },
  [EEffects.hueRotate]: {
    options: {
      min: 0,
      max: 360,
      step: 5,
      inputMode: "numeric",
      value: 0,
      name: "hueRotate",
    },
    dataList: [0, 180, 360],
  },
  [EEffects.sepia]: {
    options: {
      min: 0,
      max: 100,
      step: 10,
      inputMode: "numeric",
      value: 0,
      name: "sepia",
    },
    dataList: [0, 50, 100],
  },
  [EEffects.opacity]: {
    options: {
      min: 0,
      max: 100,
      step: 10,
      inputMode: "numeric",
      value: 100,
      name: "opacity",
    },
    dataList: [0, 50, 100],
  },
};

export default allDefaultEffects;
