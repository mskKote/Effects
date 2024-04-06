"use client";
import React from "react";
import styles from "@root/styles/Index.module.scss";
import cn from "classnames";
import { mockPage } from "@root/src/lib/mock";
import { notFound } from "next/navigation";
import Editor from "@components/editor/Editor";

import dynamic from "next/dynamic";

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
  const [isEdit, setIsEdit] = React.useState(true);

  if (!contentPage) notFound();

  return (
    <div
      className={cn(styles.editorContainer, {
        [styles.editorTime]: isEdit,
        [styles.showTime]: !isEdit,
      })}
    >
      <Sonner theme="system" duration={1000} position="top-right" />
      <button
        id="toggle-edit"
        style={{ display: "none" }}
        onClick={() => setIsEdit((x) => !x)}
      />
      <Editor page={contentPage} setContentPage={setContentPage} />
    </div>
  );
}
