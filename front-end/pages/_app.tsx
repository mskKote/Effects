import React from "react";
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Router from "next/router";
// import Loader from "../src/components/loader/Loader";

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

  if (loading) return <>LOADING...</>;

  return <Component {...pageProps} />;
}

export default MyApp;
