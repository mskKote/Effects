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
  // const [layers, updateLayers] = useState(contentPage.layers);
  const { layers } = contentPage

  function handleOnDragEnd({ source, destination }: DropResult) {
    if (!destination) return
    const _layers = layers;
    //*==================== source ←→ destination
    const [reorderedItem] = _layers.splice(source.index, 1);
    _layers.splice(destination.index, 0, reorderedItem);
    // updateLayers(_layers)
    //*==================== Изменение текущего слоя при необходимости
    if (source.index === currentLayer) setCurrentLayer(destination.index)
    else if (destination.index === currentLayer) setCurrentLayer(source.index)
    //*==================== Меняет расположение слоёв на странице
    setContentPage(x => ({ ...x, layers: _layers }))
  }

  function deleteLayer(pos: number) {
    if (pos === currentLayer) setCurrentLayer(pos - 1)
    setContentPage(x => ({ ...x, layers: x.layers.filter((_, i) => i !== pos) }))
  }
  function changeLayer(pos: number) {
    setCurrentLayer(pos)
  }

  console.log(layers.length);

  return (<aside className={styles.layersSettingsContainer}>
    <h1>Настройки слоёв</h1>
    {/* Колонки */}
    <DragDropContext onDragEnd={handleOnDragEnd}>
      {/* 1 колонка */}
      <Droppable droppableId='layers'>
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {/* Карточки */}
            {layers.map(({ content }, i) =>
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
                    <p>{content.ru_RU?.url ?? "Слой"}</p>
                    <button onClick={() => deleteLayer(i)}>🗑️</button>
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