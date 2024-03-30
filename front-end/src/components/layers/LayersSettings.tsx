import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import IContentPage, { ELanguages } from "../../interfaces/IContentPage";
import ILayer from "../../interfaces/ILayer";
import styles from "./LayersSettings.module.scss";
import LayerCard from "./LayerCard";

type Props = {
  lang: ELanguages;
  layers: ILayer[];
  currentLayer: number;
  setContentPage: React.Dispatch<React.SetStateAction<IContentPage>>;
  setCurrentLayer: React.Dispatch<React.SetStateAction<number>>;
};

const LayersSettings = ({
  lang,
  layers,
  currentLayer,
  setContentPage,
  setCurrentLayer,
}: Props) => {
  //*================================= Dnd
  //#region
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => setLoading(false), []);
  if (loading) return <></>;

  function dragEndHandler({ source, destination }: DropResult) {
    if (!destination) return;
    //*==================== Изменение текущего слоя при необходимости
    if (source.index === currentLayer) setCurrentLayer(destination.index);
    else if (destination.index === currentLayer) setCurrentLayer(source.index);
    //*==================== source ←→ destination
    setContentPage((x) => {
      // TODO: менять номера промежуточных слоёв между source и destination
      x.layers[source.index].position = destination.index;
      x.layers[destination.index].position = source.index;
      return { ...x };
    });
  }
  //#endregion
  //*================================= Взаимодействие со слоями
  //#region Layers interaction
  function deleteLayer(pos: number) {
    if (pos <= currentLayer) setCurrentLayer(currentLayer - 1);
    setContentPage((x) => ({
      ...x,
      layers: x.layers
        .filter((_, i) => i !== pos)
        .map((x, i) => ({ ...x, position: i })),
    }));
  }
  function changeLayer(pos: number) {
    setCurrentLayer(pos);
  }
  function changeLayerNameHandler(name: string, pos: number) {
    setContentPage((page) => {
      const x = page.layers[pos].content[lang];
      if (x) page.layers[pos].content[lang] = { name, url: x.url };
      return { ...page };
    });
  }
  function addLayer() {
    setContentPage((x) => {
      const last = x.layers.findLast((x) => x.position)?.position;
      x.layers.push({
        position: last ? last + 1 : 0,
        content: { [lang]: { name: "", url: "/mock/Scott-p1.png" } },
        effects: { parallax: { value: 0 } },
      });
      return { ...x };
    });
    setCurrentLayer(layers.length - 1);
  }
  //#endregion

  return (
    <aside className={styles.layersSettingsWrapper}>
      <div className={styles.layersSettingsContainer}>
        <h1>Настройки слоёв</h1>
        {/* Колонки */}
        <DragDropContext onDragEnd={dragEndHandler}>
          {/* 1 колонка */}
          <Droppable droppableId="layers">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {/* Карточки */}
                {layers
                  .sort((a, b) => a.position - b.position)
                  .map(({ content, position }, i) => (
                    <Draggable key={position} index={i} draggableId={`${i}`}>
                      {(provided) => (
                        <div
                          onClick={() => changeLayer(i)}
                          className={`${styles.layerCard} ${
                            i === currentLayer ? styles.layerActive : ""
                          }`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <LayerCard
                            name={content.ru_RU?.name ?? ""}
                            onDeleteLayer={() => deleteLayer(i)}
                            onNameChange={(name) =>
                              changeLayerNameHandler(name, i)
                            }
                          />
                          {/* <input
                            value={content.ru_RU?.name}
                            onChange={(e) =>
                              changeLayerNameHandler(e.target.value, i)
                            }
                            placeholder={"Введите название слоя..."}
                            className={styles.layerName}
                            autoFocus
                          />
                          <button
                            className={styles.deleteLayer}
                            onClick={(event) => {
                              event.stopPropagation();
                              deleteLayer(i);
                            }}
                          >
                            🗑️
                          </button> */}
                        </div>
                      )}
                    </Draggable>
                  ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <button className={styles.addLayerBtn} onClick={addLayer}>
          Добавить слой
        </button>
      </div>
      <div className={styles.legalContainer}>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://docs.google.com/document/d/1ARDFMZ8LzKIGQWZ3Mn3D1KsErW1b5Icxv6HzdkmVpZI/edit?usp=sharing"
        >
          Оферта
        </a>
        <a
          target="_blank"
          rel="noreferrer"
          href="https://docs.google.com/document/d/1FeVVtyyHC1wWqx8_ve5b3FdyM-ADF8Flufx3D0EQ-9o/edit?usp=sharing"
        >
          Политика обработки персональных данных
        </a>
      </div>
    </aside>
  );
};

export default LayersSettings;
