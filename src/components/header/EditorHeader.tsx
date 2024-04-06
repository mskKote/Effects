"use client";
import React from "react";
import Image from "next/legacy/image";
import Requests from "@root/src/lib/Requests";
import IContentPage from "@interfaces/IContentPage";
import styles from "./EditorHeader.module.scss";
import metrics from "@root/src/lib/metrics";
import { useTranslations } from "next-intl";

type Props = {
  contentPage: IContentPage;
};

const EditorHeader = ({ contentPage }: Props) => {
  const t = useTranslations("Editor");
  const defaultCopyText = t("copy");
  const [link, setLink] = React.useState("");
  const [copyText, setCopyText] = React.useState(defaultCopyText);

  async function publish() {
    metrics.publish();
    setCopyText(defaultCopyText);
    const result = await Requests.publishPage(contentPage);
    console.log("[EditorHeader] publish", result);
    setLink(`/?id=${result}`);
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(link);
    setCopyText(t("copied"));
    setTimeout(() => setCopyText(defaultCopyText), 1250);
  }

  return (
    <header className={styles.editorHeader}>
      {/* Publish */}
      <div className={styles.publishedUrlContainer}>
        <input
          className={styles.publishedUrl}
          value={link}
          placeholder={t("urlPlaceholder")}
          readOnly
        />
        <button
          className={styles.copyPublishedUrl}
          disabled={link.length === 0}
          onClick={copyToClipboard}
        >
          {copyText}
        </button>
      </div>

      <button className={styles.publish} onClick={publish}>
        <span>{t("publish")}</span>
        <svg width="15px" height="10px" viewBox="0 0 13 10">
          <path d="M1,5 L11,5" />
          <polyline points="8 1 12 5 8 9" />
        </svg>
      </button>

      {/* Profile */}
      <div className={styles.profileContainer}>
        <Image src="/user-icon.png" layout="fill" alt="profile" />
      </div>
    </header>
  );
};

export default EditorHeader;
