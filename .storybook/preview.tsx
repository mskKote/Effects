import React, { Suspense } from "react";
import type { Preview } from "@storybook/react";
import "@root/styles/globals.scss";

import i18n from "i18next";
import { I18nextProvider, initReactI18next } from "react-i18next";
import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";
import configuration from "../src/utils/configuration";
import Loader from "../src/components/loader/Loader";

i18n
  .use(Backend) // lazy loads translations from /public/locales
  .use(LanguageDetector) // detect user language
  .use(initReactI18next)
  .init({
    ns: configuration.i18n.NAMESPACES,
    fallbackLng: "en",
    debug: true,
    interpolation: {
      escapeValue: false,
    },
  });

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};
// Wrap your stories in the I18nextProvider component
const withI18next = (Story, context) => {
  const { locale } = context.globals;

  // When the locale global changes
  // Set the new locale in i18n
  React.useEffect(() => void i18n.changeLanguage(locale), [locale]);

  return (
    <Suspense fallback={<Loader />}>
      <I18nextProvider i18n={i18n}>
        <Story />
      </I18nextProvider>
    </Suspense>
  );
};

export const decorators = [withI18next];

export const globalTypes = {
  locale: {
    name: "Locale",
    description: "Internationalization locale",
    toolbar: {
      icon: "globe",
      items: [
        { value: "en", title: "English" },
        { value: "de", title: "Deutsch" },
        { value: "ru", title: "Russian" },
      ],
      showName: true,
    },
  },
};

export default preview;
