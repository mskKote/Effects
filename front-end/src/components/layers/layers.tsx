import React, { useEffect, useRef } from 'react'
import IContentPage from '../../interfaces/IContentPage'
import Layer from '../layer/layer'
import Parallax from 'parallax-js'
import styles from './Layers.module.scss'


const Layers = ({ layers }: IContentPage) => {
  const parallaxRef = useRef<HTMLElement>(null)
  // console.log('Layers :>> ', layers[0].effects[0].value);

  useEffect(() => {
    new Parallax(parallaxRef?.current)
  }, [parallaxRef, layers[0].effects[0]])

  return (<main className={styles.layersContainer} ref={parallaxRef}>
    {layers.length === 0 ?
      <h1>Добавьте слоёв</h1> :
      layers.map((layer, i) =>
        <Layer key={i} layer={layer} currentLanguage="ru_RU" />)}
  </main>)
}

export default Layers