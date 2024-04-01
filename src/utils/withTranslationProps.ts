import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import config from "./config";

type Options = {
  locale: string | undefined;
  locales: string[];
  localeNamespaces: string[];
};
const DEFAULT_OPTIONS: Options = {
  locale: config.i18n.defaultLocale,
  locales: config.i18n.locales,
  localeNamespaces: config.i18n.NAMESPACES,
};

/**
 * @name withTranslationProps
 * @param options
 * @description SSR props pipe for i18n
 */
export async function withTranslationProps(options?: Partial<Options>) {
  const { localeNamespaces, locale, locales } = mergeOptions(options);
  const translation = await serverSideTranslations(
    locale,
    localeNamespaces,
    null,
    locales
  );
  return { props: { ...translation } };
}

function mergeOptions(options?: Partial<Options>) {
  return {
    locale: options?.locale ?? (DEFAULT_OPTIONS.locale as string),
    locales: [...(options?.locales ?? []), ...DEFAULT_OPTIONS.locales],
    localeNamespaces: [
      ...(options?.localeNamespaces ?? []),
      ...DEFAULT_OPTIONS.localeNamespaces,
    ],
  };
}
