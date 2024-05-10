"use client";
import React from "react";
import Layer from "./Layer";
import Parallax from "parallax-js";
import styles from "./Layers.module.scss";
import { useMotionPermission } from "@lib/hooks/useMotionPermission";
import MotionPermission from "@components/permission/MotionPermission";
import ILayer from "@interfaces/ILayer";

type Props = {
  layers: ILayer[];
  parallaxes: string;
  isParallax: boolean;
};
const Layers = ({ layers, parallaxes, isParallax = true }: Props) => {
  const [parallaxScene, setParallaxScene] = React.useState<Parallax>();
  const parallaxRef = React.useRef<HTMLElement>(null);
  const { permission, requestPermission } = useMotionPermission();

  React.useEffect(() => {
    if (permission && parallaxRef?.current && isParallax) {
      try {
        const newParallax = new Parallax(parallaxRef.current);
        setParallaxScene(newParallax);
      } catch (error) {
        console.log("[useEffect] ERROR", error);
      }
    }
    return () => {
      try {
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
        {[...layers]
          .sort((a, b) => a.position - b.position)
          .map((layer, i) => (
            <Layer key={i} num={i} layer={layer} />
          ))}
      </main>
    </div>
  );
};

export default Layers;
