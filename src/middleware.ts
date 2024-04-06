import configuration from "@lib/configuration";
import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  localeDetection: true,
  localePrefix: "always",
  locales: configuration.i18n.locales,
  defaultLocale: configuration.i18n.defaultLocale,
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(de|en|ru)/:path*"],
};
