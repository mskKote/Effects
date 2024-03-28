import { ELanguages } from "./IContentPage";
import IEffects from "./IEffects";

/**
 * Описание слоя на странице
 */
export default interface ILayer {
  position: number;
  content: { [languages in ELanguages]?: { name: string; url: string } };
  effects: IEffects;
}
