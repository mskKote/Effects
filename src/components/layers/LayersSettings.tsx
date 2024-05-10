"use client";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";
import IBookPage from "@interfaces/IBookPage";
import ILayer from "@interfaces/ILayer";
import styles from "./LayersSettings.module.scss";
import LayerCard from "./LayerCard";
import SentryFeedback from "@components/sentry/SentryFeedback";
import { useTranslations } from "next-intl";
import { atom, useAtom, useAtomValue, useSetAtom } from "jotai";
import { contentLangAtom, pageImmerAtom } from "@components/editor/Editor";

export const layerAtom = atom(0);

const LayersSettings = () => {
  const t = useTranslations("Editor");
  const lang = useAtomValue(contentLangAtom);
  const [currentLayer, setCurrentLayer] = useAtom(layerAtom);
  const [contentPage, setContentPage] = useAtom(pageImmerAtom);
  const { layers } = contentPage;

  //*================================= Dnd
  //#region Dnd
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => setLoading(false), []);
  if (loading) return <></>;

  function dragEndHandler({ source, destination }: DropResult) {
    if (!destination) return;
    //*==================== Изменение текущего слоя при необходимости
    if (source.index === currentLayer) setCurrentLayer(destination.index);
    else if (destination.index === currentLayer) setCurrentLayer(source.index);
    //*==================== source ←→ destination
    setContentPage((prev) => {
      // TODO: менять номера промежуточных слоёв между source и destination
      prev.layers[source.index].position = destination.index;
      prev.layers[destination.index].position = source.index;
    });
  }
  //#endregion
  //*================================= Взаимодействие со слоями
  //#region Layers interaction
  function deleteLayer(pos: number) {
    if (pos <= currentLayer) setCurrentLayer(currentLayer - 1);
    setContentPage((prev) => {
      prev.layers = prev.layers
        .filter((_, i) => i !== pos)
        .map((x, i) => ({ ...x, position: i }));
    });
  }
  function changeLayer(pos: number) {
    setCurrentLayer(pos);
  }
  function changeLayerNameHandler(name: string, pos: number) {
    setContentPage((prev) => {
      const x = prev.layers[pos].content[lang];
      if (x) prev.layers[pos].content[lang] = { name, url: x.url };
    });
  }
  function addLayer() {
    setContentPage((prev) => {
      const last = prev.layers.findLast((x) => x.position)?.position;
      prev.layers.push({
        position: last ? last + 1 : 0,
        content: { [lang]: { name: "", url: "/mock/Scott-p1.png" } },
        effects: { parallax: { value: 0 } },
      });
    });
    setCurrentLayer(layers.length - 1);
  }
  //#endregion

  return (
    <aside className={styles.layersSettingsWrapper}>
      <div className={styles.layersSettingsContainer}>
        <h1>{t("layersSettings")}</h1>
        {/* Колонки */}
        <DragDropContext onDragEnd={dragEndHandler}>
          {/* 1 колонка */}
          <Droppable droppableId="layers">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {/* Карточки */}
                {[...layers]
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
                            name={content[lang]?.name ?? ""}
                            onDeleteLayer={() => deleteLayer(i)}
                            onNameChange={(name) =>
                              changeLayerNameHandler(name, i)
                            }
                          />
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
          {t("addLayer")}
        </button>
      </div>
      <div className={styles.infoContainer}>
        <SentryFeedback />
      </div>
    </aside>
  );
};

export default LayersSettings;
