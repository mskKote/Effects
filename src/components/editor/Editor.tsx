"use client";
import React from "react";
import LayerEffectsSettings from "@components/effects/LayerEffectsSettings";
import EditorHeader from "@components/header/EditorHeader";
import LayersSettings from "@components/layers/LayersSettings";
import IContentPage, { ELanguages } from "@interfaces/IContentPage";
import { EEffects, Effect } from "@interfaces/IEffects";
import Layers from "@components/layers/Layers";
import styles from "./Editor.module.scss";
import cn from "classnames";
import { atomWithToggle } from "@lib/store/atomWithToggle";
import { atom, useAtomValue } from "jotai";

export const isParallaxAtom = atomWithToggle(true);
export const isEditModeAtom = atomWithToggle(true);
export const contentLangAtom = atom(ELanguages.ru);

type Props = {
  page: IContentPage;
  setContentPage: React.Dispatch<React.SetStateAction<IContentPage>>;
};
function Editor({ page, setContentPage }: Props) {
  const isParallax = useAtomValue(isParallaxAtom);
  const isEditMode = useAtomValue(isEditModeAtom);
  const contentLang = useAtomValue(contentLangAtom);
  const [currentLayer, setCurrentLayer] = React.useState(0);

  function effectChangeHandler(effectType: EEffects, value: Effect) {
    setContentPage((prev) => {
      (prev.layers[currentLayer].effects[effectType] as Effect) = value;
      return { ...prev };
    });
  }
  function imageChangeHandler(url: string) {
    setContentPage((page) => {
      const x = page.layers[currentLayer].content[contentLang];
      if (!!x) page.layers[currentLayer].content[contentLang] = { ...x, url };
      return { ...page };
    });
  }

  return (
    <div
      className={cn(styles.editorTime, {
        [styles.editorShowTime]: !isEditMode,
      })}
    >
      <EditorHeader contentPage={page} />

      {isEditMode && (
        <LayerEffectsSettings
          effectsDeps={Object.values(page.layers[currentLayer]?.effects ?? {})}
          effects={page.layers[currentLayer]?.effects}
          onEffectChange={effectChangeHandler}
          onImageChange={imageChangeHandler}
          layersExists={currentLayer >= 0}
        />
      )}

      <Layers
        lang={contentLang}
        key="layers"
        layers={page.layers}
        isParallax={isParallax}
        parallaxes={page.layers
          .map((x) => x.effects.parallax?.value ?? 0)
          .join()}
      />

      {isEditMode && (
        <LayersSettings
          layers={page.layers}
          setContentPage={setContentPage}
          currentLayer={currentLayer}
          setCurrentLayer={setCurrentLayer}
        />
      )}
    </div>
  );
}

export default Editor;
