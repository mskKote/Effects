import React from "react";
import LayerEffectsSettings from "../effects/LayerEffectsSettings";
import EditorHeader from "../header/EditorHeader";
import LayersSettings from "../layers/LayersSettings";
import IContentPage, { ELanguages } from "../../interfaces/IContentPage";
import { EEffects, Effect } from "../../interfaces/IEffects";

type Props = {
  lang: ELanguages;
  page: IContentPage;
  setContentPage: React.Dispatch<React.SetStateAction<IContentPage>>;
};
function Editor({
  children,
  lang,
  page,
  setContentPage,
}: React.PropsWithChildren<Props>) {
  const [currentLayer, setCurrentLayer] = React.useState(0);

  function effectChangeHandler(effectType: EEffects, value: Effect) {
    setContentPage((prev) => {
      (prev.layers[currentLayer].effects[effectType] as Effect) = value;
      return { ...prev };
    });
  }

  function imageChangeHandler(url: string) {
    setContentPage((page) => {
      const x = page.layers[currentLayer].content[lang];
      if (!!x) page.layers[currentLayer].content[lang] = { ...x, url };
      return { ...page };
    });
  }
  return (
    <>
      <EditorHeader contentPage={page} />

      <LayerEffectsSettings
        effectsDeps={Object.values(page.layers[currentLayer]?.effects ?? {})}
        effects={page.layers[currentLayer]?.effects}
        onEffectChange={effectChangeHandler}
        onImageChange={imageChangeHandler}
        layersExists={currentLayer >= 0}
      />

      {children}

      <LayersSettings
        lang={lang}
        layers={page.layers}
        setContentPage={setContentPage}
        currentLayer={currentLayer}
        setCurrentLayer={setCurrentLayer}
      />
    </>
  );
}

export default Editor;
