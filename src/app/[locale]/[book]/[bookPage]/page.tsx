import React from "react";
import Layers from "@components/layers/Layers";
import styles from "@root/src/styles/Index.module.scss";
import cn from "classnames";
import { mockPage } from "@lib/mock";
import YMetrikaWrapper from "../../YMetrikaWrapper";
import { notFound } from "next/navigation";

export default async function BookPage({
  params,
}: {
  params: { book: string; bookPage: string };
}) {
  // TODO: SSR / ISR
  const request = async (book: string, bookPage: string) => {
    console.log(`[BookPageEditor] get ${book}-${bookPage}`);
    return mockPage;
  };
  const contentPage = await request(params.book, params.bookPage);
  if (!contentPage) notFound();

  console.log(`Книга ${params.book} страница ${params.bookPage}}`);
  return (
    <div className={cn(styles.showTime)}>
      <YMetrikaWrapper />
      <Layers
        key="layers"
        layers={contentPage.layers}
        isParallax={true}
        parallaxes={contentPage.layers
          .map((x) => x.effects.parallax?.value ?? 0)
          .join()}
      />
    </div>
  );
}
