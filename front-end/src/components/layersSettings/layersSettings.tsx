import React, { Dispatch, SetStateAction, useState } from 'react'
import IContentPage from '../../interfaces/IContentPage'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import styles from './LayersSettings.module.scss'

type Props = {
  contentPage: IContentPage,
  setContentPage: Dispatch<SetStateAction<IContentPage>>,
  currentLayer: number,
  setCurrentLayer: Dispatch<SetStateAction<number>>
}

const LayersSettings = ({ contentPage, setContentPage, currentLayer, setCurrentLayer }: Props) => {
  const [effects, updateEffects] = useState(contentPage.layers);
  function handleOnDragEnd(result: DropResult) {
    const items = effects;
    const [reorderedItem] = items.splice(result.source.index, 1);
    if (!result.destination) return
    items.splice(result.destination.index, 0, reorderedItem);
    updateEffects(items)
    setContentPage({ layers: items })
  }
  return (<aside className={styles.layersSettingsContainer}>
    <h1>Настройки слоёв</h1>
    {/* Колонки */}
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/* 1 колонка */}
      <Droppable droppableId='layers'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {/* Карточки */}
            {effects.map((x, i) =>
              <Draggable key={i}
                index={i}
                draggableId={`${i}`}>
                {/* 1 карточка */}
                {(provided) =>
                  <div
                    // onClick={() => setCurrentLayer(i)}
                    className={`${styles.layerCard} ${i === currentLayer ? styles.layerActive : ""}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <p>{x.content[0].url}</p>
                  </div>}
              </Draggable>)}
            {provided.placeholder}
          </div>)}
      </Droppable>
    </DragDropContext>
    <button className={styles.addLayerBtn}>Добавить слой</button>
  </aside>)
}

export default LayersSettings