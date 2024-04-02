import React from "react";
import "@root/styles/globals.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
import Loader from "@components/loader/Loader";
import { appWithTranslation } from "next-i18next";
import dynamic from "next/dynamic";

const Sonner = dynamic(async () => {
  const { Toaster } = await import("sonner");
  return Toaster;
});

function MyApp({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    const start = () => setLoading(true);
    const end = () => setLoading(false);
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };
  }, []);

  if (loading) return <Loader />;

  return (
    <>
      <Sonner theme="system" duration={1000} position="top-right" />
      <Component {...pageProps} />
    </>
  );
}

export default appWithTranslation(MyApp);
