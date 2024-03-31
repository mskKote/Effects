import ILayer from "./ILayer";

export enum ELanguages {
  en_EN = "en_EN",
  ru_RU = "ru_RU",
}

/**
 * Контент на странице
 */
export default interface IContentPage {
  layers: ILayer[];
  languages?: ELanguages[];
  author?: string;
  genre?: string[];
  tags?: string[];
  categories?: string[];
}
