import React, { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd'
import IContentPage, { ELanguages } from '../../interfaces/IContentPage'
import ILayer from '../../interfaces/ILayer'
import styles from './LayersSettings.module.scss'

type Props = {
  contentPage: IContentPage,
  setContentPage: Dispatch<SetStateAction<IContentPage>>,
  currentLayer: number,
  setCurrentLayer: Dispatch<SetStateAction<number>>
}

const LayersSettings = ({ contentPage, setContentPage, currentLayer, setCurrentLayer }: Props) => {
  const { layers } = contentPage

  //*================================= Dnd
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
  //*================================= Взаимодействие со слоями
  function deleteLayer(pos: number) {
    if (pos <= currentLayer) setCurrentLayer(currentLayer - 1)
    setContentPage(x => ({ ...x, layers: x.layers.filter((_, i) => i !== pos) }))
  }
  function changeLayer(pos: number) {
    setCurrentLayer(pos)
  }
  function changeLayerName(event: ChangeEvent<HTMLInputElement>, pos: number) {
    const value = event.target.value
    const getContentLanguage = ({ content }: ILayer, language: ELanguages) => ({
      name: value,
      url: content[language]?.url as string
    })
    setContentPage(page => ({
      ...page, layers: page.layers.map((layer, i) =>
        // Нахождение нужного слоя  
        i !== pos ? layer :
          // Установка значения 
          ({
            ...layer, content: {
              ...layer.content,
              ru_RU: getContentLanguage(layer, ELanguages.ru_RU)
            }
          }))
    }))
  }
  function addLayer() {
    const newLayer: ILayer = {
      content: { ru_RU: { name: "", url: "/mock/Scott-p1.png" } },
      effects: { parallax: { value: 0 } }
    }
    setContentPage(x => ({ ...x, layers: [...x.layers, newLayer] }))
    setCurrentLayer(contentPage.layers.length)
  }


  return (<aside className={styles.layersSettingsWrapper}>
    <div className={styles.layersSettingsContainer}>
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
                      <input
                        value={content.ru_RU?.name}
                        onChange={(event) => changeLayerName(event, i)}
                        placeholder={"Введите название слоя..."}
                        className={styles.layerName}
                        autoFocus
                      />
                      <button
                        className={styles.deleteLayer}
                        onClick={(event) => {
                          event.stopPropagation();
                          deleteLayer(i);
                        }}>
                        🗑️
                      </button>
                    </div>}
                </Draggable>)}
              {provided.placeholder}
            </div>)}
        </Droppable>
      </DragDropContext>
      <button
        className={styles.addLayerBtn}
        onClick={addLayer}>
        Добавить слой
      </button>
    </div>
    <div className={styles.legalContainer}>
      <a target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1ARDFMZ8LzKIGQWZ3Mn3D1KsErW1b5Icxv6HzdkmVpZI/edit?usp=sharing">
        Оферта
      </a>
      <a target="_blank" rel="noreferrer" href="https://docs.google.com/document/d/1FeVVtyyHC1wWqx8_ve5b3FdyM-ADF8Flufx3D0EQ-9o/edit?usp=sharing">
        Политика обработки персональных данных
      </a>
    </div>
  </aside>)
}

export default LayersSettings