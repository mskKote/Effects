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
  sepia = "sepia"
}

export function getEEffectsByString(value: string): EEffects {
  switch (value) {
    case "parallax": return EEffects[value];
    case "blur": return EEffects[value];
    case "brightness": return EEffects[value];
    case "saturate": return EEffects[value];
    case "contrast": return EEffects[value];
    case "grayscale": return EEffects[value];
    case "invert": return EEffects[value];
    case "hueRotate": return EEffects[value];
    case "sepia": return EEffects[value];
    default: return EEffects.default;
  }
}
/**
 * Представление эффекта
 */
export default interface IEffect {
  type: EEffects
  value: number
  coords?: { X: number, Y: number }
  params?: any
}
