"use client";
import React from "react";
import { EEffects, Effect, getEEffectsByString } from "@interfaces/IEffects";
import styles from "./LayerEffectsSettings.module.scss";
import allDefaultEffects, { RangeEffectTypes, parallaxDatalist } from "./model";
import RangeEffectSetting from "./RangeEffectSetting";
import { useTranslations } from "next-intl";
import { useAtomValue, useSetAtom } from "jotai";
import { isParallaxAtom, pageImmerAtom } from "@components/editor/Editor";
import { layerAtom } from "@components/layers/LayersSettings";

type EffectWithName = [string, Effect];

/**
 ** Responsible for the effects
 * Преобразует сохранённые значения в настройки
 * Берём дефолтную структуру и закидывает значения
 * Так мы храним в базе только НЕ дефолтные параметры
 * @param effects настройки НЕ по умолчанию
 * @returns настройки для отрисовки
 */
function createRangeEffects(effects: EffectWithName[]): RangeEffectTypes {
  //* Deep copy
  const _defaultEffects: RangeEffectTypes = JSON.parse(
    JSON.stringify(allDefaultEffects)
  );

  //* Insert effects to the model
  effects.forEach(([name, effect]) => {
    if (_defaultEffects[name])
      _defaultEffects[name].options.value = effect.value;
  });

  return _defaultEffects;
}

type Props = {
  effects: EffectWithName[];
};
const LayerEffectsSettings = ({ effects }: Props) => {
  const t = useTranslations("Editor");
  const isParallax = useAtomValue(isParallaxAtom);
  const currentLayer = useAtomValue(layerAtom);
  const setContentPage = useSetAtom(pageImmerAtom);

  const [effectsSettings, setEffectsSettings] =
    React.useState<RangeEffectTypes>(createRangeEffects(effects));

  React.useEffect(() => {
    setEffectsSettings(createRangeEffects(effects));
  }, [effects]);

  function editContentPage(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = +event.target.value;
    const effectType = getEEffectsByString(name);
    setContentPage((prev) => {
      prev.layers[currentLayer].effects[effectType] = { value };
    });
  }
  function addImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;
    const url = URL.createObjectURL(event.target.files[0]);
    setContentPage((prev) => {
      const x = prev.layers[currentLayer].content;
      if (!!x) prev.layers[currentLayer].content = { ...x, url };
    });
  }

  if (currentLayer < 0 || !effects)
    return (
      <aside className={styles.effectsSettingsContainer}>
        <h1>{t("effectsSettings")}</h1>
        <div className={styles.step}>
          <h2>{t("needLayers")}</h2>
          <p>{t("needLayersDesc")}</p>
        </div>
      </aside>
    );

  return (
    <aside className={styles.effectsSettingsContainer}>
      <h1>{t("effectsSettings")}</h1>
      <form>
        <fieldset className={styles.step}>
          <h2>
            {t("step")} 1. {t("step1Title")}
          </h2>
          <label htmlFor="layer-image" className={styles.layerImage}>
            {t("step1Label")}
          </label>
          <input
            type="file"
            id="layer-image"
            onChange={addImage}
            style={{ display: "none" }}
            accept={"image/*"}
          />
        </fieldset>
        <fieldset className={styles.step}>
          <label htmlFor="parallax">
            <h2>
              {t("step")} 2. {t("step2Title")}
              &nbsp;
              <span className={styles.parallaxTerm} title={t("parallaxDef")}>
                {t("parallaxName")}
              </span>
            </h2>
          </label>
          <div className={styles.parallaxContainer}>
            <input
              type="range"
              min={-5}
              max={5}
              step={0.25}
              inputMode="decimal"
              name="parallax"
              id="parallax"
              list="parallax-datalist"
              value={
                effects.find(([name]) => name === EEffects.parallax)?.[1]
                  .value ?? 0
              }
              onInput={editContentPage}
              className={styles.slider}
              disabled={!isParallax}
            />
            <datalist
              id="parallax-datalist"
              className={styles.optionsContainer}
            >
              {parallaxDatalist.map((x, i) => (
                <option value={x} key={i}>
                  {x}
                </option>
              ))}
            </datalist>
          </div>
        </fieldset>
        <fieldset className={styles.step}>
          <h2>
            {t("step")} 3. {t("step3Title")}
          </h2>
          {Object.values(effectsSettings).map((v) => (
            <RangeEffectSetting
              onChange={editContentPage}
              key={v.options.name}
              dataList={v.dataList}
              options={v.options}
            />
          ))}
        </fieldset>
      </form>
    </aside>
  );
};

export default LayerEffectsSettings;
