import React from 'react'
import IContentPage from '../../interfaces/IContentPage'
import styles from './LayersSettings.module.scss'


const LayersSettings = ({ layers }: IContentPage) => {
  return (<aside className={styles.layersSettingsContainer}>
    <h1>Настройки слоёв</h1>
    <div>
      {layers.map((x, key) =>
        <div key={key}
          className={styles.layerCard}
          children={x.content[0].url} />)}
    </div>
    <button className={styles.addLayerBtn}>Добавить слой</button>
  </aside>)
}

export default LayersSettings