import Image from 'next/image'
import React from 'react'
import { ELanguages } from '../../../interfaces/IContentPage'
import IEffects, { EEffects } from '../../../interfaces/IEffects'
import ILayer from '../../../interfaces/ILayer'
import styles from './Layer.module.scss'

interface Props {
  layer: ILayer
  currentLanguage: ELanguages
  num: number
}

function getFilter(effects: IEffects): string {
  let filters: string[] = []
  for (const key in effects) {
    if (!Object.prototype.hasOwnProperty.call(effects, key)) continue
    const value = effects[key as EEffects]?.value
    switch (key) {
      case EEffects.blur: filters.push(`${key}(${value}px)`); break;
      case EEffects.brightness: filters.push(`${key}(${value}%)`); break;
      case EEffects.contrast: filters.push(`${key}(${value}%)`); break;
      case EEffects.grayscale: filters.push(`${key}(${value}%)`); break;
      case EEffects.hueRotate: filters.push(`hue-rotate(${value}deg)`); break;
      case EEffects.invert: filters.push(`${key}(${value}%)`); break;
      case EEffects.saturate: filters.push(`${key}(${value}%)`); break;
      case EEffects.sepia: filters.push(`${key}(${value}%)`); break;
      case EEffects.opacity: filters.push(`${key}(${value}%)`); break;
      default: break;
    }
  }
  // console.log("Layer >>:", filters.join(" "));
  return filters.join(" ")
}

const Layer = ({ num, layer, currentLanguage = ELanguages.ru_RU }: Props) => {
  const contentWithLanguage = layer.content[currentLanguage]
  const parallax = layer.effects[EEffects.parallax]?.value
  // const effects = { filter: getFilter(layer.effects) }
  const effects = getFilter(layer.effects)

  return (<div data-depth={parallax} className={styles.layerContainer}>
    {contentWithLanguage?.url && <>
      <Image
        src={contentWithLanguage.url}
        layout="fill"
        loading={'eager'}
        className={`layer-${num}`}
        alt={contentWithLanguage.name}
        objectFit="contain"
      />
      <style jsx global>{`
        img.layer-${num} {
          filter: ${effects};
        }
      `}</style>

    </>}

  </div>)
}
{/* <img
    src={contentWithLanguage.url}
    alt={contentWithLanguage.name}
    className={styles.layerImage} */}
{/* style={{ objectFit: "contain", ...effects }} />} */ }

export default Layer