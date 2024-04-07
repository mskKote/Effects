"use client";
import React from "react";
import styles from "@root/styles/Index.module.scss";
import cn from "classnames";
import { mockPage } from "@root/src/lib/mock";
import { notFound } from "next/navigation";
import dynamic from "next/dynamic";
import Editor from "@components/editor/Editor";
import StoreProvider from "@root/src/app/StoreProvider";

const Sonner = dynamic(async () => {
  const { Toaster } = await import("sonner");
  return Toaster;
});

export default function BookPageEditor({
  params,
}: {
  params: { book: string; bookPage: string };
}) {
  const [contentPage, setContentPage] = React.useState(mockPage);

  if (!contentPage) notFound();

  return (
    <div className={cn(styles.editorContainer, styles.editorTime)}>
      <Sonner theme="system" duration={1000} position="top-right" />
      <StoreProvider>
        <Editor page={contentPage} setContentPage={setContentPage} />
      </StoreProvider>
    </div>
  );
}
