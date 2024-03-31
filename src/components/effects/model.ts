import { EEffects } from "../../interfaces/IEffects";
import { RangeSettingProps } from "./RangeEffectSetting";

export type RangeEffectTypes = {
  [name: string]: RangeSettingProps;
};

export const allDefaultEffects: RangeEffectTypes = {
  [EEffects.blur]: {
    title: "Размытие",
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
    title: "Яркость",
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
    title: "Насыщенность",
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
    title: "Контраст",
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
    title: "Серость",
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
    title: "Инвертировать",
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
    title: "Повернуть палитру",
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
    title: "Сепия",
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
    title: "Прозрачность",
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
