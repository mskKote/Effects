/**
 * Тип эффекта
 */
export enum EEffects {
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

/**
 * Представление эффекта
 */
export default interface IEffect {
  type: EEffects
  value: string | number
  coords?: { X: number, Y: number }
  params?: any
}
