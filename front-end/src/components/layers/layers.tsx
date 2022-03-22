import React, { useEffect, useRef } from 'react'
import IContentPage, { ELanguages } from '../../interfaces/IContentPage'
import { EEffects } from '../../interfaces/IEffects'
import Layer from '../layer/layer'
import Parallax from 'parallax-js'
import styles from './Layers.module.scss'

type Props = {
  contentPage: IContentPage
  currentLanguage: ELanguages
}

const Layers = ({ contentPage, currentLanguage }: Props) => {
  const { layers } = contentPage
  const parallaxRef = useRef<HTMLElement>(null)

  useEffect(() => {
    new Parallax(parallaxRef?.current)
  }, [parallaxRef, layers[0]?.effects[EEffects.parallax]])

  return (<main className={styles.layersContainer} ref={parallaxRef}>
    {layers.length === 0 ?
      <h1 className={styles.placeholder}>Добавьте слой</h1> :
      layers.map((layer, i) =>
        <Layer key={i} layer={layer} currentLanguage={currentLanguage} />)}
  </main>)
}

export default Layers