import React from "react";
import "../src/styles/globals.scss";
import type { Preview } from "@storybook/react";
import { IntlProvider } from "next-intl";
import configuration from "../src/lib/configuration";
import en from "../messages/en.json";
import de from "../messages/de.json";
import ru from "../messages/ru.json";
import { Provider } from "jotai";
import { useHydrateAtoms } from "jotai/utils";
import { pageImmerAtom } from "../src/components/editor/Editor";
import { mockPage } from "../src/lib/mock";

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

const HydrateAtoms = ({ initialValues, children }) => {
  useHydrateAtoms(initialValues);
  return children;
};

const withNextIntl = (Story, context) => {
  const { locale } = context.globals;
  //storybook-addon-jotai is incompatible with Storybook v8

  return (
    <IntlProvider locale={locale} messages={messages[locale]}>
      <Provider>
        <HydrateAtoms initialValues={[[pageImmerAtom, mockPage]]}>
          <Story />
        </HydrateAtoms>
      </Provider>
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
