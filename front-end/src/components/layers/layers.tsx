import React from 'react'
import IContentPage from '../../interfaces/IContentPage'
import Layer from '../layer/layer'
import styles from './Layers.module.scss'

type Props = {
  layers: IContentPage,
}

//TODO: добавить библиотеку параллакса

const Layers = ({ layers }: Props) => {
  return (<main className={styles.layersContainer}>
    Тут должны быть слои

    <Layer />
  </main>)
}

export default Layers