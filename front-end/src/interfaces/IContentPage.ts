import ILayer from "./ILayer"

export enum ELanguages {
  en_EN = "en_EN",
  ru_RU = "ru_RU"
}

/**
 * Контент на странице
 */
export default interface IContentPage {
  layers: Array<ILayer>
  languages?: Array<ELanguages>
  author?: string
  genre?: Array<string>
  tags?: Array<string>
  categories?: Array<string>
}
