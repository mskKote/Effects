import React from "react";
import { ELanguages } from "@interfaces/IContentPage";
import Layer from "./Layer";
import Parallax from "parallax-js";
import styles from "./Layers.module.scss";
import { useMotionPermission } from "@utils/useMotionPermission";
import MotionPermission from "@components/permission/MotionPermission";
import ILayer from "@interfaces/ILayer";

type Props = {
  layers: ILayer[];
  lang: ELanguages;
  parallaxes: string;
  isParallax: boolean;
};
const Layers = ({ layers, lang, parallaxes, isParallax = true }: Props) => {
  const [parallaxScene, setParallaxScene] = React.useState<Parallax>();
  const parallaxRef = React.useRef<HTMLElement>(null);
  const { permission, requestPermission } = useMotionPermission();

  React.useEffect(() => {
    if (permission && parallaxRef?.current && isParallax) {
      try {
        // console.log("[useEffect] parallaxRef", parallaxRef.current);
        const newParallax = new Parallax(parallaxRef.current);
        // console.log("[useEffect] after creation of parallax", newParallax);
        setParallaxScene(newParallax);
      } catch (error) {
        console.log("[useEffect] ERROR", error);
      }
    }
    return () => {
      try {
        // console.log("[useEffect unmount] parallax destroy ", parallaxScene);
        if (parallaxScene) parallaxScene?.destroy();
      } catch (error) {
        console.log("[useEffect unmount] ERROR", error);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [permission, parallaxRef, parallaxes]);

  React.useEffect(() => {
    try {
      isParallax && parallaxScene
        ? parallaxScene?.enable()
        : parallaxScene?.disable();
    } catch (error) {
      console.log("[useEffect ENABLE/DISABLE]", error);
    }
  }, [isParallax, parallaxScene]);

  if (!permission)
    return <MotionPermission requestPermission={requestPermission} />;

  return (
    <div className={styles.layersContainerWrapper}>
      <main className={styles.layersContainer} ref={parallaxRef}>
        {layers.length === 0 ? (
          <h1 className={styles.placeholder}>Добавьте слой</h1>
        ) : (
          layers
            .sort((a, b) => a.position - b.position)
            .map((layer, i) => (
              <Layer key={i} num={i} layer={layer} lang={lang} />
            ))
        )}
      </main>
    </div>
  );
};

export default Layers;
