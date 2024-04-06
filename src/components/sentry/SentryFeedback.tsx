"use client";
import React from "react";
import styles from "./SentryFeedback.module.scss";
import * as Sentry from "@sentry/nextjs";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

const SentryFeedback = () => {
  const [feedback, setFeedback] = React.useState("");
  const t = useTranslations("Editor");

  const sendFeedback = React.useCallback(async () => {
    const promise = new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log("[Sentry] send error");
        resolve();
      }, 500);
    });
    await toast.promise(promise, {
      success: t("sentrySendSuccess"),
      loading: t("sentrySendLoading"),
      error: t("sentrySendError"),
    });
  }, [t]);

  return (
    <div className={styles.sentryContainer}>
      <textarea
        maxLength={1000}
        placeholder={t("sentryPlaceholder")}
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
            async () => {
              try {
                throw new Error(
                  `[Frontend feedback (${feedback.length})] ${feedback}`
                );
              } catch (error) {
                await sendFeedback();
                throw error;
              }
            }
          );
        }}
      >
        {t("sendFeedback")}
      </button>
    </div>
  );
};

export default SentryFeedback;
