import React from "react";
import IEffects, {
  EEffects,
  Effect,
  getEEffectsByString,
} from "../../interfaces/IEffects";
import styles from "./LayerEffectsSettings.module.scss";
import allDefaultEffects, { RangeEffectTypes } from "./model";
import RangeEffectSetting from "./RangeEffectSetting";
import { Trans, useTranslation } from "next-i18next";

//* Отвечает за эффекты
/**
 * Преобразует сохранённые значения в настройки
 * Берём дефолтную структуру и закидывает значения
 * Так мы храним в базе только НЕ дефолтные параметры
 * @param effects настройки НЕ по умолчанию
 * @returns настройки для отрисовки
 */
function createRangeEffects(effects: IEffects): RangeEffectTypes {
  //* Deep copy
  const _defaultEffects: RangeEffectTypes = JSON.parse(
    JSON.stringify(allDefaultEffects)
  );

  //* Вставить эффекты в модель
  for (const key in effects) {
    if (!Object.prototype.hasOwnProperty.call(effects, key)) continue;
    if (_defaultEffects[key])
      _defaultEffects[key].options.value = effects[key as EEffects]?.value;
  }

  return _defaultEffects;
}

type Props = {
  effects: IEffects;
  onEffectChange: (effectType: EEffects, value: Effect) => void;
  onImageChange: (url: string) => void;
  layersExists: boolean; //TODO: удалить как-то
  effectsDeps: Effect[]; //TODO: удалить. Переделать всё в массивы
};
const LayerEffectsSettings = ({
  effects,
  effectsDeps,
  onEffectChange,
  onImageChange,
  layersExists,
}: Props) => {
  const { t } = useTranslation();

  //* Отвечает за контент на странице
  const [effectsSettings, setEffectsSettings] =
    React.useState<RangeEffectTypes>(createRangeEffects(effects));

  /**
   * Функция отвечает за изменение useState, отвечающего за страницу.
   * Используется, чтобы применить эффекты
   * @param event Введённое значение. Изменяет 1 эффект
   */
  function editContentPage(event: React.ChangeEvent<HTMLInputElement>) {
    const name = event.target.name;
    const value = +event.target.value;
    const effectType = getEEffectsByString(name);
    onEffectChange(effectType, { value });
  }
  function addImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;
    const img = URL.createObjectURL(event.target.files[0]);
    onImageChange(img);
  }

  React.useEffect(() => {
    setEffectsSettings(createRangeEffects(effects));
  }, [effects, effectsDeps]);

  // Слои отсутствуют
  if (!layersExists || !effects)
    return (
      <aside className={styles.effectsSettingsContainer}>
        <h1>Настройки&nbsp;эффектов</h1>
        <div className={styles.step}>
          <h2>Создаёте слой</h2>
          <p>Эффект прикрепляются к определённому слою</p>
        </div>
      </aside>
    );

  return (
    <aside className={styles.effectsSettingsContainer}>
      <h1>
        <Trans i18nKey="editor:effectsSettings" />
      </h1>
      <form>
        <fieldset className={styles.step}>
          <h2>
            <Trans i18nKey="editor:step" /> 1.{" "}
            <Trans i18nKey="editor:step1Title" />
          </h2>
          <label htmlFor="layer-image" className={styles.layerImage}>
            <Trans i18nKey="editor:step1Label" />
          </label>
          <input
            type="file"
            id="layer-image"
            onChange={addImage}
            style={{ display: "none" }}
            accept={"image/*"}
          />
          <small>
            <Trans i18nKey="editor:step1MVPNote" />
          </small>
        </fieldset>
        <fieldset className={styles.step}>
          <label htmlFor="parallax">
            <h2>
              <Trans i18nKey="editor:step" /> 2.{" "}
              <Trans i18nKey="editor:step2Title" />
              &nbsp;
              <span className={styles.parallaxTerm} title={t("editor:parallaxDef")}>
                <Trans i18nKey="editor:parallaxName" />
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
              value={effects[EEffects.parallax]?.value ?? 0}
              onInput={editContentPage}
            />
            <datalist
              id="parallax-datalist"
              className={styles.optionsContainer}
            >
              {[-5, -2.5, 0, 2.5, 5].map((x, i) => (
                <option value={x} key={i}>
                  {x}
                </option>
              ))}
            </datalist>
          </div>
        </fieldset>
        <fieldset className={styles.step}>
          <h2>
            <Trans i18nKey="editor:step" /> 3.{" "}
            <Trans i18nKey="editor:step3Title" />
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
