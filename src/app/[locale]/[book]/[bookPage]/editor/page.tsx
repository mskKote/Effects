import React from "react";
import styles from "@root/src/styles/Index.module.scss";
import cn from "classnames";
import { mockPage } from "@root/src/lib/mock";
import { notFound } from "next/navigation";
import Editor from "@components/editor/Editor";

export default async function BookPageEditor({
  params,
}: {
  params: { book: string; bookPage: string };
}) {
  const request = async (book: string, bookPage: string) => {
    console.log(`[BookPageEditor] get ${book}-${bookPage}`);
    return mockPage;
  };
  const contentPage = await request(params.book, params.bookPage);
  if (!contentPage) notFound();

  return (
    <div className={cn(styles.editorContainer, styles.editorTime)}>
      <Editor page={contentPage} />
    </div>
  );
}
