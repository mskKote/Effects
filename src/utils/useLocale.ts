import React from "react";
import { useRouter } from "next/router";
import { ELanguages } from "../interfaces/IContentPage";
import config from "./config";

const useLocale = () => {
  const router = useRouter();
  const locale = router.locale ?? config.i18n.defaultLocale;
  const locales = router.locales ?? [
    router.locale ?? config.i18n.defaultLocale,
  ];

  const switchToLocale = React.useCallback(
    (locale: ELanguages | string) => {
      const path = router.asPath;
      return router.push(path, path, { locale });
    },
    [router]
  );

  return { locale, locales, switchToLocale };
};

export default useLocale;
