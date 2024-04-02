import React from "react";
import styles from "./SentryFeedback.module.scss";
import * as Sentry from "@sentry/nextjs";
import { Trans, useTranslation } from "next-i18next";

const SentryFeedback = () => {
  const [feedback, setFeedback] = React.useState("");
  const { t } = useTranslation();

  return (
    <div className={styles.sentryContainer}>
      <textarea
        maxLength={1000}
        placeholder={t("editor:sentryPlaceholder")}
        value={feedback}
        onChange={(e) => setFeedback(e.target.value)}
      />
      <button
        type="button"
        disabled={feedback.length === 0}
        onClick={() => {
          Sentry.startSpan(
            {
              name: "Feedback Frontend Span",
              op: "feedback",
            },
            () => {
              throw new Error(
                `[Frontend feedback (${feedback.length})] ${feedback}`
              );
            }
          );
        }}
      >
        <Trans i18nKey="editor:sendFeedback" />
      </button>
    </div>
  );
};

export default SentryFeedback;
