import { Pathnames } from "next-intl/navigation";

const locales = ["en", "de", "ru"] as const;
const defaultLocale = locales[0];

/**
 * Full config of the website
 */
const configuration = {
  i18n: {
    locales,
    defaultLocale,
  },
  firebase: {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  },
  production: process.env.NODE_ENV === "production",
  faunaSecret: process.env.FAUNA_SECRET as string,
  yandexMetrika: Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA),
  sentryDSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
};

export const pathnames = {
  "/": "/",
  "/pathnames": {
    en: "/editor",
    de: "/editor",
    ru: "/редактор",
  },

  "/registration": {
    en: "/registration",
    de: "/anmeldung",
    ru: "/регистрация",
  },

  "/login": {
    en: "/login",
    de: "/login",
    ru: "/логин",
  },
} satisfies Pathnames<typeof configuration.i18n.locales>;

export type AppPathnames = keyof typeof pathnames;

// Use the default: `always`
export const localePrefix = undefined;

export default configuration;
