import React from "react";
import Image from "next/legacy/image";
import Requests from "../../utils/Requests";
import IContentPage from "../../interfaces/IContentPage";
import styles from "./EditorHeader.module.scss";
import metrics from "../../utils/metrics";
import { Trans, useTranslation } from "next-i18next";

type Props = {
  contentPage: IContentPage;
};

const EditorHeader = ({ contentPage }: Props) => {
  const { t } = useTranslation();
  const defaultCopyText = t("editor:copy");
  const [link, setLink] = React.useState("");
  const [copyText, setCopyText] = React.useState(defaultCopyText);

  async function publish() {
    metrics.publish();
    setCopyText(defaultCopyText);
    const result = await Requests.publishPage(contentPage);
    console.log("publish", result);
    setLink(`/?id=${result}`);
  }
  function copyToClipboard() {
    navigator.clipboard.writeText(link);
    setCopyText(t("editor:copied"));
    setTimeout(() => setCopyText(defaultCopyText), 1250);
  }

  return (
    <header className={styles.editorHeader}>
      {/* Publish */}
      <div className={styles.publishedUrlContainer}>
        <input
          className={styles.publishedUrl}
          value={link}
          placeholder={t("editor:urlPlaceholder")}
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
        <span>
          <Trans i18nKey="editor:publish" />
        </span>
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
