import React from "react";
import IContentPage from "../../interfaces/IContentPage";
import IEffects, {
  EEffects,
  effect,
  getEEffectsByString,
} from "../../interfaces/IEffects";
import styles from "./EffectsSettings.module.scss";

//#region Types
type range = {
  title: string;
  options: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  dataList: number[];
};
type rangeEffectTypes = {
  [name: string]: range;
};
type Props = {
  contentPage: IContentPage;
  setContentPage: React.Dispatch<React.SetStateAction<IContentPage>>;
  currentLayer: number;
};
//#endregion

/**
 * Все эффекты
 * TODO: вынести в конфиг
 */
const allDefaultEffects: rangeEffectTypes = {
  [EEffects.blur]: {
    title: "Размытие",
    options: {
      min: 0,
      max: 15,
      step: 0.5,
      inputMode: "decimal",
      value: 0,
      name: "blur",
    },
    dataList: [0, 5, 10, 15],
  },
  [EEffects.brightness]: {
    title: "Яркость",
    options: {
      min: 0,
      max: 200,
      step: 10,
      inputMode: "numeric",
      value: 100,
      name: "brightness",
    },
    dataList: [0, 100, 200],
  },
  [EEffects.saturate]: {
    title: "Насыщенность",
    options: {
      min: 0,
      max: 200,
      step: 1,
      inputMode: "numeric",
      value: 100,
      name: "saturate",
    },
    dataList: [0, 100, 200],
  },
  [EEffects.contrast]: {
    title: "Контраст",
    options: {
      min: 0,
      max: 200,
      step: 10,
      inputMode: "numeric",
      value: 100,
      name: "contrast",
    },
    dataList: [0, 100, 200],
  },
  [EEffects.grayscale]: {
    title: "Серость",
    options: {
      min: 0,
      max: 100,
      step: 10,
      inputMode: "numeric",
      value: 0,
      name: "grayscale",
    },
    dataList: [0, 50, 100],
  },
  [EEffects.invert]: {
    title: "Инвертировать",
    options: {
      min: 0,
      max: 100,
      step: 10,
      inputMode: "numeric",
      value: 0,
      name: "invert",
    },
    dataList: [0, 50, 100],
  },
  [EEffects.hueRotate]: {
    title: "Повернуть палитру",
    options: {
      min: 0,
      max: 360,
      step: 5,
      inputMode: "numeric",
      value: 0,
      name: "hueRotate",
    },
    dataList: [0, 180, 360],
  },
  [EEffects.sepia]: {
    title: "Сепия",
    options: {
      min: 0,
      max: 100,
      step: 10,
      inputMode: "numeric",
      value: 0,
      name: "sepia",
    },
    dataList: [0, 50, 100],
  },
  [EEffects.opacity]: {
    title: "Прозрачность",
    options: {
      min: 0,
      max: 100,
      step: 10,
      inputMode: "numeric",
      value: 100,
      name: "opacity",
    },
    dataList: [0, 50, 100],
  },
};

const EffectsSettings = ({
  contentPage,
  setContentPage,
  currentLayer,
}: Props) => {
  //* Отвечает за контент на странице
  const currentPageEffects = contentPage.layers[currentLayer]?.effects;
  const [effectsSettings, setEffectsSettings] =
    React.useState<rangeEffectTypes>();
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
    if (_effect[effectType]) (_effect[effectType] as effect).value = value;
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
  function createRangeEffects(currentPageEffects: IEffects): rangeEffectTypes {
    // console.groupCollapsed('createRangeEffects')
    const _defaultEffects: rangeEffectTypes = JSON.parse(
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
  /**
   * Визуализирует 1 эффект
   */
  function generateRange({ title, options, dataList }: range, key: number) {
    return (
      <div className={styles.effectContainer} key={key}>
        <label className={styles.inputLabel} htmlFor={options.name}>
          {title} ({options.name})
        </label>

        <div className={styles.inputContainer}>
          <input
            list={`effect-${key}`}
            type="range"
            {...options}
            id={options.name}
            name={options.name}
            onChange={editContentPage}
          />
          <datalist id={`effect-${key}`} className={styles.optionsContainer}>
            {dataList.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </datalist>
        </div>
      </div>
    );
  }
  /**
   * Создаёт эффект
   * @param param0 настройки эффекта
   * @param key key атрибут
   * @returns jsx
   */
  const rangeEffect = (param: rangeEffectTypes) =>
    Object.keys(param)
      .map((x) => param[x])
      .map(generateRange);

  //* useEffect срабатывает при изменение слоёв / страницы
  React.useEffect(() => {
    // console.group('useEffect');
    // console.log("currentLayer", currentLayer)
    setEffectsSettings(createRangeEffects(currentPageEffects));
    // console.groupEnd();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentLayer, contentPage]);

  // Пока слои не созданы в useEffect
  if (effectsSettings === undefined) return <aside />;

  // Слои отсутствуют
  if (currentLayer <= -1 || currentPageEffects === undefined)
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
        Эффекты к текущему слою
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
          <h2>
            Шаг 2. Задайте&nbsp;
            <span className={styles.parallaxTerm} title="Движение слоя">
              параллакс
            </span>
          </h2>
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
          {rangeEffect(effectsSettings)}
        </fieldset>
      </form>
    </aside>
  );
};

export default EffectsSettings;
