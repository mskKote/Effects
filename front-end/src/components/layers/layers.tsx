import React, { useEffect, useRef } from 'react'
import IContentPage from '../../interfaces/IContentPage'
import Layer from '../layer/layer'
import Parallax from 'parallax-js'
import styles from './Layers.module.scss'


//TODO: добавить библиотеку параллакса

const Layers = ({ layers }: IContentPage) => {
  console.log(Parallax);
  const parallaxRef = useRef<HTMLElement>(null)
  useEffect(() => {
    let parallax = new Parallax(parallaxRef?.current)
    console.log(parallax);
  }, [parallaxRef])
  return (<main className={styles.layersContainer} ref={parallaxRef}>
    {layers.map((layer, i) => <Layer key={i} layer={layer} currentLanguage="ru_RU" />)}
  </main>)
}

export default Layers