import React from "react";
import IContentPage from "../../interfaces/IContentPage";
import IEffects, {
  EEffects,
  Effect,
  getEEffectsByString,
} from "../../interfaces/IEffects";
import styles from "./EffectsSettings.module.scss";
import allDefaultEffects, { RangeEffectTypes } from "./model";
import RangeEffectSetting from "./RangeEffectSetting";

type Props = {
  contentPage: IContentPage;
  setContentPage: React.Dispatch<React.SetStateAction<IContentPage>>;
  currentLayer: number;
};

const EffectsSettings = ({
  contentPage,
  setContentPage,
  currentLayer,
}: Props) => {
  //* Отвечает за контент на странице
  const currentPageEffects = contentPage.layers[currentLayer]?.effects;
  const [effectsSettings, setEffectsSettings] =
    React.useState<RangeEffectTypes>(createRangeEffects(currentPageEffects));
  /**
   * Функция отвечает за изменение useState, отвечающего за страницу.
   * Используется, чтобы применить эффекты
   * @param event Введённое значение. Изменяет 1 эффект
   */
  function editContentPage(event: React.ChangeEvent<HTMLInputElement>) {
    // console.group("editContentPage")
    const name = event.target.name;
    const value = +event.target.value;
    const effectType = getEEffectsByString(name);
    const _contentPage: IContentPage = JSON.parse(JSON.stringify(contentPage));
    const _effect = _contentPage.layers[currentLayer].effects;

    // Установка значения
    if (_effect[effectType]) (_effect[effectType] as Effect).value = value;
    else _effect[effectType] = { value };

    setContentPage(_contentPage);
    // console.groupEnd();
  }
  function addImage(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || event.target.files.length === 0) return;
    const image = event.target.files[0];
    const imageUrl = URL.createObjectURL(image);
    // Изменяем текущий слой
    setContentPage((page) => ({
      ...page,
      layers: page.layers.map((layer, i) =>
        // Нахождение нужного слоя
        i !== currentLayer
          ? layer
          : // Установка значения
            {
              ...layer,
              content: {
                ...layer.content,
                ru_RU: {
                  name: layer.content.ru_RU?.name as string,
                  url: imageUrl,
                },
              },
            }
      ),
    }));
  }

  //* Отвечает за эффекты
  /**
   * Преобразует сохранённые значения в настройки
   * @param currentPageEffects настройки не по умолчанию
   * @returns настройки для отрисовки
   */
  function createRangeEffects(currentPageEffects: IEffects): RangeEffectTypes {
    // console.groupCollapsed('createRangeEffects')
    //* Deep copy
    const _defaultEffects: RangeEffectTypes = JSON.parse(
      JSON.stringify(allDefaultEffects)
    );

    //* Вставляет эффекты модель
    for (const key in currentPageEffects) {
      if (!Object.prototype.hasOwnProperty.call(currentPageEffects, key))
        continue;
      if (_defaultEffects[key])
        _defaultEffects[key].options.value =
          currentPageEffects[key as EEffects]?.value;
    }

    // console.groupEnd();
    return _defaultEffects;
  }

  //* useEffect срабатывает при изменение слоёв / страницы
  React.useEffect(() => {
    // console.group('useEffect');
    // console.log("currentLayer", currentLayer)
    setEffectsSettings(createRangeEffects(currentPageEffects));
    // console.groupEnd();
  }, [currentPageEffects]);

  // Слои отсутствуют
  if (currentLayer < 0 || !currentPageEffects)
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
      <h1>Настройки&nbsp;эффектов</h1>
      <form>
        <fieldset className={styles.step}>
          <h2>Шаг 1. Добавьте&nbsp;картинку</h2>
          <label htmlFor="layer-image" className={styles.layerImage}>
            Добавьте картинку на слой
          </label>
          <input
            type="file"
            id="layer-image"
            onChange={addImage}
            style={{ display: "none" }}
            accept={"image/*"}
          />
          <small>MVP1: пока картинки стоит добавлять одинакового размера</small>
        </fieldset>
        <fieldset className={styles.step}>
          <label htmlFor="parallax">
            <h2>
              Шаг 2. Задайте&nbsp;
              <span className={styles.parallaxTerm} title="Движение слоя">
                параллакс
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
              value={currentPageEffects[EEffects.parallax]?.value ?? 0}
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
          <h2>Шаг 3. Попробуйте другие эффекты</h2>
          {Object.values(effectsSettings).map((v) => (
            <RangeEffectSetting
              onChange={editContentPage}
              key={v.options.name}
              dataList={v.dataList}
              options={v.options}
              title={v.title}
            />
          ))}
        </fieldset>
      </form>
    </aside>
  );
};

export default EffectsSettings;
