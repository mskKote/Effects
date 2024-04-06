import { createLocalizedPathnamesNavigation } from "next-intl/navigation";
import configuration, { pathnames, localePrefix } from "./configuration";

export const { Link, redirect, usePathname, useRouter } =
  createLocalizedPathnamesNavigation({
    locales: configuration.i18n.locales,
    pathnames,
    localePrefix,
  });
