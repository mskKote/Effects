import ILayer from "./ILayer"

/**
 * Контент на странице
 */
export default interface IContentPage {
  layers: Array<ILayer>
  languages?: Array<string>
  author?: string
  genre?: Array<string>
  tags?: Array<string>
  categories?: Array<string>
}
