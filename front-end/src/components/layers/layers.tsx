import React, { useEffect, useRef, useState } from "react";
import IContentPage, { ELanguages } from "../../interfaces/IContentPage";
import Layer from "./layer/layer";
import Parallax from "parallax-js";
import styles from "./Layers.module.scss";

type Props = {
  contentPage: IContentPage;
  currentLanguage: ELanguages;
};

const Layers = ({ contentPage, currentLanguage }: Props) => {
  const { layers } = contentPage;
  const parallaxRef = useRef<HTMLElement>(null);
  const [permission, setPermission] = useState(
    typeof (DeviceMotionEvent as any).requestPermission !== "function"
  );

  function requestMotionPermission() {
    try {
      console.log(
        "typeof",
        typeof (DeviceMotionEvent as any).requestPermission
      );
      if (typeof (DeviceMotionEvent as any).requestPermission === "function") {
        (DeviceMotionEvent as any)
          .requestPermission()
          .then((response: String) => {
            // if (response === 'granted') {
            // }
            setPermission(true);
            console.log(`response ${response}`);
          })
          .catch(console.error);
      } else {
        setPermission(true);
        console.log("DeviceMotionEvent", JSON.stringify(DeviceMotionEvent));
      }
    } catch (e) {
      console.error((e as Error).message);
    }
  }

  useEffect(() => {
    console.log("useEffect");
    new Parallax(parallaxRef?.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission, parallaxRef, layers.map((x) => x.effects.parallax?.value)]);

  return (
    <main className={styles.layersContainer} ref={parallaxRef}>
      {!permission ? (
        <button
          className={styles.permissionBtn}
          onClick={requestMotionPermission}
        >
          <code>IOS: требуется разрешение на гироскоп и акселерометр</code>
          <br />
          <br />
          <br />
          <b>Нажмите на экран, чтобы предоставить права ✔️🤏</b>
        </button>
      ) : layers.length === 0 ? (
        <h1 className={styles.placeholder}>Добавьте слой</h1>
      ) : (
        layers.map((layer, i) => (
          <Layer
            key={i}
            num={i}
            layer={layer}
            currentLanguage={currentLanguage}
          />
        ))
      )}
    </main>
  );
};

export default Layers;
