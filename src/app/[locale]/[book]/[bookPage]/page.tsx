import React from "react";
import Layers from "@components/layers/Layers";
import styles from "@root/styles/Index.module.scss";
import cn from "classnames";
import { mockPage } from "@lib/mock";
import { localeToContentLang } from "@interfaces/IContentPage";
import { useLocale } from "next-intl";
import YMetrikaWrapper from "../../YMetrikaWrapper";

export default function BookPage({
  params,
}: {
  params: { book: string; bookPage: string };
}) {
  // TODO: SSR / SSG / ISR
  const contentPage = mockPage;
  const locale = useLocale();
  const lang = localeToContentLang(locale);

  console.log(`Книга ${params.book} страница ${params.bookPage}}`);
  return (
    <div className={cn(styles.showTime)}>
      <YMetrikaWrapper />
      <Layers
        key="layers"
        lang={lang}
        layers={contentPage.layers}
        isParallax={true}
        parallaxes={contentPage.layers
          .map((x) => x.effects.parallax?.value ?? 0)
          .join()}
      />
    </div>
  );
}
