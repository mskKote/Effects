import IEffects from "./IEffects";

/**
 * Описание слоя на странице
 */
export default interface ILayer {
  position: number;
  content: { name: string; url: string };
  effects: IEffects;
}
