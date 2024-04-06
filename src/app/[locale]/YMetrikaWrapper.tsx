"use client";
import { YMInitializer } from "react-yandex-metrika";
import configuration from "@lib/configuration";

const YMetrikaWrapper = () => {
  if (!configuration.production) return <></>;

  return (
    <YMInitializer
      version="2"
      accounts={[configuration.yandexMetrika]}
      options={{
        clickmap: true,
        trackLinks: true,
        accurateTrackBounce: true,
        webvisor: true,
        trackHash: true,
      }}
    />
  );
};

export default YMetrikaWrapper;
