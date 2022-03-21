import React, { Dispatch, SetStateAction } from 'react'
import IContentPage from '../../interfaces/IContentPage'
import styles from './LayersSettings.module.scss'

type Props = {
  contentPage: IContentPage,
  currentLayer: number,
  setCurrentLayer: Dispatch<SetStateAction<number>>
}

const LayersSettings = ({ contentPage, currentLayer, setCurrentLayer }: Props) => {

  return (<aside className={styles.layersSettingsContainer}>
    <h1>Настройки слоёв</h1>
    <div>
      {contentPage.layers.map((x, i) =>
        <div key={i}
          onClick={() => setCurrentLayer(i)}
          className={`${styles.layerCard} ${i === currentLayer ? styles.layerActive : ""}`}
          children={x.content[0].url} />)}
    </div>
    <button className={styles.addLayerBtn}>Добавить слой</button>
  </aside>)
}

export default LayersSettings