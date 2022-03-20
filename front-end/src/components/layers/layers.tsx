import React from 'react'
import IContentPage from '../../interfaces/IContentPage'
import Layer from '../layer/layer'
import styles from './LayersSettings.module.scss'

type Props = {
  layers: IContentPage
}

const Layers = ({layers}: Props) => {
  return (<main>
    <Layer />
  </main>)
}

export default Layers