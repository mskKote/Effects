/**
 * Тип эффекта
 */
export enum EEffects {
  default = "default",
  parallax = "parallax",
  blur = "blur",
  brightness = "brightness",
  saturate = "saturate",
  contrast = "contrast",
  grayscale = "grayscale",
  invert = "invert",
  hueRotate = "hueRotate",
  sepia = "sepia",
  opacity = "opacity",
}

export function getEEffectsByString(value: string): EEffects {
  return Object.keys(EEffects).includes(value)
    ? EEffects[value as EEffects]
    : EEffects.default;
}
/**
 * Представление эффекта
 */
export type Effect = {
  value: number;
  coords?: { X: number; Y: number };
  params?: any;
};

type IEffects = {
  [type in EEffects]?: Effect;
};

export default IEffects;
