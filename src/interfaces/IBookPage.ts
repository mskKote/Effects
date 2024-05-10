import ILayer from "./ILayer";

export enum ELanguages {
  en = "en",
  ru = "ru",
  de = "de",
}

// TODO: продумать логику переключения языка в произведениях
// по умолчанию ставить язык человека, но менять это по кнопке -> нужен параметр извне
export function localeToContentLang(locale: string): ELanguages {
  switch (locale) {
    default:
      return ELanguages.ru;
  }
}

/**
 * Контент на странице
 */
export default interface IBookPage {
  layers: ILayer[];
  languages?: ELanguages[];
}

// TODO: убрать языки из слоёв
// TODO: Сделать взаимодействие с языком на уровне произведения
