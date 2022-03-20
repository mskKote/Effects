import React from 'react'
import styles from './LayersSettings.module.scss'


type Props = {
}

const LayersSettings = ({ }: Props) => {
  return (<aside className={styles.layersSettingsContainer}>
    <h1>Настройки слоёв</h1>
    <div>слои с Drag-n-drop</div>
    <button>Добавить слой</button>
  </aside>)
}

export default LayersSettings