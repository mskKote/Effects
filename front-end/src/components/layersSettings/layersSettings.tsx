import React, { Dispatch, SetStateAction, useState } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import IContentPage from '../../interfaces/IContentPage'
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
    if (!result.destination) return
    const items = effects;
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateEffects(items)
    setContentPage({ layers: items })
  }

  function deleteLayer(pos: number) {
    const layers = contentPage.layers.filter((_, i) => i !== pos)
    setContentPage(x => ({ ...x, layers }))
  }
  function changeLayer(pos: number) {
    setCurrentLayer(pos)
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
                    onClick={() => changeLayer(i)}
                    className={`${styles.layerCard} ${i === currentLayer ? styles.layerActive : ""}`}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}>
                    <p>{x.content[0].url}</p>
                    <button onClick={() => deleteLayer(i)}>
                      🗑️
                    </button>
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