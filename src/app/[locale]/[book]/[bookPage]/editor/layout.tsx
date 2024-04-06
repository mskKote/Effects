import React from "react";
import { NextIntlClientProvider, useLocale, useMessages } from "next-intl";

export default function Editorlayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = useLocale();
  const messages = useMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
