import Image from "next/legacy/image";
import React from "react";
import { ELanguages } from "@interfaces/IContentPage";
import IEffects, { EEffects } from "@interfaces/IEffects";
import ILayer from "@interfaces/ILayer";
import styles from "./Layer.module.scss";
import LayerStyle from "./LayerStyle";
import { useAppSelector } from "@lib/store";

interface Props {
  layer: ILayer;
  lang: ELanguages;
  num: number;
}

function getFilter(effects: IEffects): string {
  let filters: string[] = [];
  for (const key in effects) {
    if (!Object.prototype.hasOwnProperty.call(effects, key)) continue;
    const value = effects[key as EEffects]?.value;
    switch (key) {
      case EEffects.blur:
        filters.push(`${key}(${value}px)`);
        break;
      case EEffects.brightness:
        filters.push(`${key}(${value}%)`);
        break;
      case EEffects.contrast:
        filters.push(`${key}(${value}%)`);
        break;
      case EEffects.grayscale:
        filters.push(`${key}(${value}%)`);
        break;
      case EEffects.hueRotate:
        filters.push(`hue-rotate(${value}deg)`);
        break;
      case EEffects.invert:
        filters.push(`${key}(${value}%)`);
        break;
      case EEffects.saturate:
        filters.push(`${key}(${value}%)`);
        break;
      case EEffects.sepia:
        filters.push(`${key}(${value}%)`);
        break;
      case EEffects.opacity:
        filters.push(`${key}(${value}%)`);
        break;
      default:
        break;
    }
  }
  // console.log("Layer >>:", filters.join(" "));
  return filters.join(" ");
}

const Layer = ({ num, layer, lang }: Props) => {
  const content = layer.content[lang];
  const parallax = layer.effects[EEffects.parallax]?.value;
  const effects = getFilter(layer.effects);
  const ref = React.useRef<HTMLDivElement>(null);

  function handleClick() {
    if (ref.current) ref.current.style.transform = "none";
  }

  const isParallax = useAppSelector(({ editor }) => editor.isParallax);

  React.useEffect(() => handleClick(), [isParallax]);

  return (
    <div ref={ref} data-depth={parallax} className={styles.layerContainer}>
      {content?.url && (
        <>
          <Image
            draggable={false}
            src={content.url}
            layout="fill"
            loading={"eager"}
            className={`${styles.layerImage} layer-${num}`}
            alt={content.name}
          />
          <LayerStyle num={num} effects={effects} />
        </>
      )}
    </div>
  );
};

export default Layer;
