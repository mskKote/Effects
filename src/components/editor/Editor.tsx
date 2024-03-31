import React from "react";
import LayerEffectsSettings from "../effects/LayerEffectsSettings";
import EditorHeader from "../header/EditorHeader";
import LayersSettings from "../layers/LayersSettings";
import IContentPage, { ELanguages } from "../../interfaces/IContentPage";
import { EEffects, Effect } from "../../interfaces/IEffects";
import Layers from "../layers/Layers";

type Props = {
  lang: ELanguages;
  page: IContentPage;
  setContentPage: React.Dispatch<React.SetStateAction<IContentPage>>;
};
function Editor({ lang, page, setContentPage }: Props) {
  const [currentLayer, setCurrentLayer] = React.useState(0);
  const [isParallax, setIsParallax] = React.useState(
    page.layers.some((x) => x.effects.parallax?.value !== 0)
  );

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
      <button
        id="toggle-parallax"
        style={{ display: "none" }}
        onClick={() => setIsParallax((x) => !x)}
      />

      <EditorHeader contentPage={page} />

      <LayerEffectsSettings
        effectsDeps={Object.values(page.layers[currentLayer]?.effects ?? {})}
        effects={page.layers[currentLayer]?.effects}
        onEffectChange={effectChangeHandler}
        onImageChange={imageChangeHandler}
        layersExists={currentLayer >= 0}
      />

      <Layers
        lang={lang}
        key="layers"
        layers={page.layers}
        isParallax={isParallax}
        parallaxes={page.layers
          .map((x) => x.effects.parallax?.value ?? 0)
          .join()}
      />

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
