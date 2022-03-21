import React, { Dispatch, SetStateAction } from 'React'
import IContentPage from '../../interfaces/IContentPage'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import styles from './LayersSettings.module.scss'

type Props = {
  contentPage: IContentPage,
  currentLayer: number,
  setCurrentLayer: Dispatch<SetStateAction<number>>
}

const LayersSettings = ({ contentPage, currentLayer, setCurrentLayer }: Props) => {

  return (<aside className={styles.layersSettingsContainer}>
    <h1>Настройки слоёв</h1>
    {/* Колонки */}
    <DragDropContext onDragEnd={console.log}>
      {/* 1 колонка */}
      <Droppable droppableId='layers'>
        {({ droppableProps, innerRef }) => <div ref={innerRef} {...droppableProps}>
          {/* Карточки */}
          {contentPage.layers.map((x, i) =>
            <Draggable key={i}
              index={i}
              draggableId={`${i}`}>
              {/* 1 карточка */}
              {({ draggableProps, innerRef, dragHandleProps }) =>
                <div
                  // onClick={() => setCurrentLayer(i)}
                  className={`${styles.layerCard} ${i === currentLayer ? styles.layerActive : ""}`}
                  ref={innerRef}
                  {...draggableProps}
                  {...dragHandleProps}>
                  <p>{x.content[0].url}</p>
                </div>}
            </Draggable>)}
        </div>}
      </Droppable>
    </DragDropContext>
    <button className={styles.addLayerBtn}>Добавить слой</button>
  </aside>)
}

export default LayersSettings