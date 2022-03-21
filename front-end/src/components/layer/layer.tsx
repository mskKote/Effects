import Image from 'next/image'
import React from 'react'
import IEffect, { EEffects } from '../../interfaces/IEffect'
import ILayer from '../../interfaces/ILayer'
import styles from './Layer.module.scss'

interface Props {
  layer: ILayer
  currentLanguage: string
}

function getFilter(effects: IEffect[]): string {
  let filters: string[] = []
  for (const { type, value } of effects) {
    switch (type) {
      case EEffects.blur: filters.push(`blur(${value}px)`); break;
      case EEffects.brightness: filters.push(`brightness(${value}%)`); break;
      case EEffects.contrast: filters.push(`contrast(${value}%)`); break;
      case EEffects.grayscale: filters.push(`grayscale(${value}%)`); break;
      case EEffects.hueRotate: filters.push(`hueRotate(${value}deg)`); break;
      case EEffects.invert: filters.push(`invert(${value}%)`); break;
      case EEffects.saturate: filters.push(`saturate(${value}%)`); break;
      case EEffects.sepia: filters.push(`sepia(${value}%)`); break;
      default: break;
    }
  }
  return filters.join(" ")
}

const Layer = ({ layer, currentLanguage = "ru_RU" }: Props) => {
  const contentWithLanguage = layer.content.find(x => x.languages.includes(currentLanguage))
  console.log(contentWithLanguage?.url);
  return (<div className={styles.layerContainer} style={{ filter: getFilter(layer.effects) }}>
    {contentWithLanguage?.url &&
      <Image
        src={contentWithLanguage?.url}
        layout="fill"
      />}
  </div>)
}

export default Layer