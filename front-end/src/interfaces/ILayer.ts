import { ELanguages } from "./IContentPage"
import IEffects from "./IEffects"

/**
 * Описание слоя на странице
 */
export default interface ILayer {
  content: { [languages in ELanguages]?: { url: string } }
  effects: IEffects
}