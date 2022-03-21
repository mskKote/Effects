import React, { useEffect, useRef } from 'react'
import IContentPage from '../../interfaces/IContentPage'
import Layer from '../layer/layer'
import Parallax from 'parallax-js'
import styles from './Layers.module.scss'


const Layers = ({ layers }: IContentPage) => {
  const parallaxRef = useRef<HTMLElement>(null)
  console.log('Layers :>> ', layers[0].effects[1].value);

  useEffect(() => {
    new Parallax(parallaxRef?.current)
  }, [parallaxRef])

  return (<main className={styles.layersContainer} ref={parallaxRef}>
    {layers.map((layer, i) => <Layer key={i} layer={layer} currentLanguage="ru_RU" />)}
  </main>)
}

export default Layers