/* eslint-disable react/no-unknown-property */
import Image from "next/legacy/image";
import React from "react";
import { ELanguages } from "@interfaces/IContentPage";
import IEffects, { EEffects } from "@interfaces/IEffects";
import ILayer from "@interfaces/ILayer";
import styles from "./Layer.module.scss";

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

const Layer = ({ num, layer, lang = ELanguages.ru }: Props) => {
  const content = layer.content[lang];
  const parallax = layer.effects[EEffects.parallax]?.value;
  const effects = getFilter(layer.effects);
  // TODO: при нажатии кнопки возвращать в исходное положение

  return (
    <div data-depth={parallax} className={styles.layerContainer}>
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
          <style jsx global>{`
            img.layer-${num} {
              filter: ${effects};
              user-select: none;
            }
          `}</style>
        </>
      )}
    </div>
  );
};

export default Layer;
