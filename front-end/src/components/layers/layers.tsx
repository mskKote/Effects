import React from 'react'
import IContentPage from '../../interfaces/IContentPage'
import Layer from '../layer/layer'
import styles from './Layers.module.scss'


//TODO: добавить библиотеку параллакса

const Layers = ({ layers }: IContentPage) => {
  return (<main className={styles.layersContainer}>
    {layers.map((layer, i) => <Layer key={i} layer={layer} currentLanguage="ru_RU" />)}
  </main>)
}

export default Layers