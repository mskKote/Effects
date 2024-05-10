import IBookPage, { ELanguages } from "@interfaces/IBookPage";
import { EEffects } from "@interfaces/IEffects";

export const mockPage: IBookPage = {
  layers: [
    {
      position: 0,
      content: {
        [ELanguages.ru]: { name: "Задний фонк", url: "/mock/p1.png" },
      },
      effects: {
        [EEffects.parallax]: { value: 0.5 },
        [EEffects.blur]: { value: 2.5 },
      },
    },
    {
      position: 1,
      content: {
        [ELanguages.ru]: { name: "Персонаж", url: "/mock/Scott-p1.png" },
      },
      effects: {
        [EEffects.parallax]: { value: 0.6 },
      },
    },
  ],
};
