import { i18n } from "../../next-i18next.config";

/**
 * Full config of the website
 */
const configuration = {
  i18n: {
    ...i18n,
    NAMESPACES: ["common", "editor"],
  },
  production: process.env.NODE_ENV === "production",
  faunaSecret: process.env.FAUNA_SECRET as string,
  yandexMetrika: Number(process.env.NEXT_PUBLIC_YANDEX_METRIKA),
  sentryDSN: process.env.NEXT_PUBLIC_SENTRY_DSN,
};

export default configuration;
