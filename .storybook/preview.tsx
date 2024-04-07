import React from "react";
import "@root/styles/globals.scss";
import type { Preview } from "@storybook/react";
import { IntlProvider } from "next-intl";
import StoreProvider from "../src/app/StoreProvider";
import configuration from "../src/lib/configuration";
import en from "../messages/en.json";
import de from "../messages/de.json";
import ru from "../messages/ru.json";

const messages = { en, de, ru };

const preview: Preview = {
  parameters: {
    nextjs: { appDirectory: true },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

const withNextIntl = (Story, context) => {
  const { locale } = context.globals;

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <StoreProvider>
        <Story />
      </StoreProvider>
    </IntlProvider>
  );
};

export const decorators = [withNextIntl];

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    defaultValue: configuration.i18n.defaultLocale,
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", right: "🇺🇸", title: "English" },
        { value: "de", right: "🇩🇪", title: "Deutsch" },
        { value: "ru", right: "🇷🇺", title: "Russian" },
      ],
      showName: true,
      dynamicTitle: true,
    },
  },
};

export default preview;
