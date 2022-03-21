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
      case EEffects.blur: filters.push(`${type}(${value}px)`); break;
      case EEffects.brightness: filters.push(`${type}(${value}%)`); break;
      case EEffects.contrast: filters.push(`${type}(${value}%)`); break;
      case EEffects.grayscale: filters.push(`${type}(${value}%)`); break;
      case EEffects.hueRotate: filters.push(`hue-rotate(${value}deg)`); break;
      case EEffects.invert: filters.push(`${type}(${value}%)`); break;
      case EEffects.saturate: filters.push(`${type}(${value}%)`); break;
      case EEffects.sepia: filters.push(`${type}(${value}%)`); break;
      default: break;
    }
  }
  // console.log("Layer >>:", filters.join(" "));
  return filters.join(" ")
}

const Layer = ({ layer, currentLanguage = "ru_RU" }: Props) => {
  const contentWithLanguage = layer.content.find(x => x.languages.includes(currentLanguage))
  const parallax = layer.effects.find(({ type }) => type === EEffects.parallax)?.value
  const effects = { filter: getFilter(layer.effects) }

  return (<div data-depth={parallax} className={styles.layerContainer} style={effects}>
    {contentWithLanguage?.url &&
      <Image src={contentWithLanguage.url} layout="fill" />}
  </div>)
}

export default Layer