"use client";
import React from "react";
import LayerEffectsSettings from "@components/effects/LayerEffectsSettings";
import EditorHeader from "@components/header/EditorHeader";
import LayersSettings, { layerAtom } from "@components/layers/LayersSettings";
import IBookPage, { ELanguages } from "@interfaces/IBookPage";
import Layers from "@components/layers/Layers";
import styles from "./Editor.module.scss";
import cn from "classnames";
import { atomWithToggle } from "@lib/store/atomWithToggle";
import { atom, useAtomValue } from "jotai";
import { atomWithImmer } from "jotai-immer";
import { useHydrateAtoms } from "jotai/utils";
import dynamic from "next/dynamic";
import { DevTools as JotaiDevTools } from "jotai-devtools";
import configuration from "@lib/configuration";

const Sonner = dynamic(async () => {
  const { Toaster } = await import("sonner");
  return Toaster;
});

export const isParallaxAtom = atomWithToggle(true);
export const isEditModeAtom = atomWithToggle(true);
export const contentLangAtom = atom(ELanguages.ru);
const emptyPage: IBookPage = { layers: [] };
export const pageImmerAtom = atomWithImmer<IBookPage>(emptyPage);

type Props = {
  page: IBookPage;
};
function Editor({ page }: Props) {
  useHydrateAtoms([[pageImmerAtom, page]]);
  const isParallax = useAtomValue(isParallaxAtom);
  const isEditMode = useAtomValue(isEditModeAtom);
  const contentLang = useAtomValue(contentLangAtom);
  const currentLayer = useAtomValue(layerAtom);
  const contentPage = useAtomValue(pageImmerAtom);

  if (!configuration.production) {
    isParallaxAtom.debugLabel = "isParallaxAtom";
    isEditModeAtom.debugLabel = "isEditModeAtom";
    contentLangAtom.debugLabel = "contentLangAtom";
    layerAtom.debugLabel = "layerAtom";
    pageImmerAtom.debugLabel = "pageImmerAtom";
  }
  return (
    <div
      className={cn(styles.editorTime, {
        [styles.editorShowTime]: !isEditMode,
      })}
    >
      <JotaiDevTools />

      <Sonner theme="system" duration={1000} position="top-right" />

      <EditorHeader contentPage={contentPage} />

      {isEditMode && (
        <LayerEffectsSettings
          effects={Object.entries(
            contentPage.layers[currentLayer]?.effects ?? {}
          )}
        />
      )}

      <Layers
        lang={contentLang}
        key="layers"
        layers={contentPage.layers}
        isParallax={isParallax}
        parallaxes={contentPage.layers
          .map((x) => x.effects.parallax?.value ?? 0)
          .join()}
      />

      {isEditMode && <LayersSettings />}
    </div>
  );
}

export default Editor;
