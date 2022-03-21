import IEffect from "./IEffect"

/**
 * Описание слоя на странице
 */
export default interface ILayer {
  content: Array<{ languages: string, url: string }>
  effects: Array<IEffect>
}