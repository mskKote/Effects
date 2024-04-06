import { useTranslations } from "next-intl";
import YMetrikaWrapper from "./YMetrikaWrapper";

export default function Main() {
  return (
    <div>
      <h1>Главная страница с произведениями</h1>

      {/* Yandex.Metrika counter */}
      <YMetrikaWrapper />
    </div>
  );
}
