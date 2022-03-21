import React, { DetailedHTMLProps, Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useState } from 'react'
import IContentPage from '../../interfaces/IContentPage'
import IEffect, { EEffects, getEEffectsByString } from '../../interfaces/IEffect'
import styles from './EffectsSettings.module.scss'


//*===================== Типы
type range = {
  title: string,
  options: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  dataList: Array<number>,
}
type rangeEffectTypes = {
  [name: string]: range
}
type Props = {
  contentPage: IContentPage,
  setContentPage: Dispatch<SetStateAction<IContentPage>>,
  currentLayer: number
}
//*==========================

/**
 * Все эффекты
 */
const allDefaultEffects: rangeEffectTypes = {
  "blur": {
    title: "Размытие",
    options: { min: 0, max: 15, step: 0.5, inputMode: "decimal", value: 0, name: "blur" },
    dataList: [0, 5, 10, 15],
  },
  "brightness": {
    title: "Яркость",
    options: { min: 0, max: 200, step: 10, inputMode: "numeric", value: 100, name: "brightness" },
    dataList: [0, 100, 200],
  },
  "saturate": {
    title: "Насыщенность",
    options: { min: 0, max: 200, step: 1, inputMode: "numeric", value: 100, name: "saturate" },
    dataList: [0, 100, 200],
  },
  "contrast": {
    title: "Контраст",
    options: { min: 0, max: 200, step: 10, inputMode: "numeric", value: 100, name: "contrast" },
    dataList: [0, 100, 200],
  },
  "grayscale": {
    title: "Серость",
    options: { min: 0, max: 100, step: 10, inputMode: "numeric", value: 0, name: "grayscale" },
    dataList: [0, 50, 100],
  },
  "invert": {
    title: "Инвертировать",
    options: { min: 0, max: 100, step: 10, inputMode: "numeric", value: 0, name: "invert" },
    dataList: [0, 50, 100],
  },
  "hueRotate": {
    title: "Повернуть палитру",
    options: { min: 0, max: 360, step: 5, inputMode: "numeric", value: 0, name: "hueRotate" },
    dataList: [0, 180, 360],
  },
  "sepia": {
    title: "Сепия",
    options: { min: 0, max: 100, step: 10, inputMode: "numeric", value: 0, name: "sepia" },
    dataList: [0, 50, 100],
  }
}

const EffectsSettings = ({ contentPage, setContentPage, currentLayer }: Props) => {
  //*===================== Вероятно, говнокод. Тут Redux помочь может
  /**
   * Функция отвечает за изменение useState, отвечающего за страницу.
   * Используется, чтобы применить эффекты
   * @param event Введённое значение. Изменяет 1 эффект
   */
  function editContentPage(event: React.ChangeEvent<HTMLInputElement>) {
    //TODO: setEffectsSettings
    console.group("editContentPage")
    const name = event.target.name;
    const value = +event.target.value;
    const effectType = getEEffectsByString(name)
    const _contentPage: IContentPage = JSON.parse(JSON.stringify(contentPage))
    const _effects = _contentPage.layers[currentLayer].effects
    let _effectWasFound = false

    // Просматриваем все эффекты
    for (let i = 0; i < _effects.length; i++) {
      if (_effects[i].type !== effectType) continue
      _effects[i].value = value
      _effectWasFound = true
    }
    // Если эффекта ещё нет
    if (!_effectWasFound)
      _effects.push({ type: effectType, value: value })
    console.log(_contentPage.layers[0].effects[0].value);

    setContentPage(_contentPage);
    console.groupEnd();
  }
  /**
   * Преобразует сохранённые значения в настройки
   * @param currentPageEffects настройки не по умолчанию 
   * @returns настройки для отрисовки
   */
  function createRangeEffects(currentPageEffects: IEffect[]): rangeEffectTypes {
    // console.groupCollapsed('createRangeEffects')
    const _effects: rangeEffectTypes = JSON.parse(JSON.stringify(allDefaultEffects))
    // console.log(_effects, currentPageEffects);

    for (const { type, value } of currentPageEffects) {
      if (!_effects[type]) continue
      _effects[type].options.value = value
    }

    // console.log(_effects['blur']?.options?.value);
    // console.groupEnd();
    return _effects
  }

  const currentPageEffects = contentPage.layers[currentLayer].effects
  const [effectsSettings, setEffectsSettings] = useState<rangeEffectTypes>()

  useEffect(() => {
    console.group('useEffect');
    console.log("currentLayer", currentLayer, currentPageEffects[0])
    setEffectsSettings(createRangeEffects(currentPageEffects))
    console.groupEnd();
  }, [currentLayer, contentPage])

  //*=================================================================

  function generateRange({ title, options, dataList }: range, key: number) {
    return <div className={styles.effectContainer} key={key}>
      <label className={styles.inputLabel} htmlFor={options.name}>
        {title} ({options.name})
      </label>
      <div className={styles.inputContainer}>
        <input list={`effect-${key}`} type="range" {...options} id={options.name} name={options.name} onInput={editContentPage} />
        <datalist id={`effect-${key}`} className={styles.optionsContainer}>
          {dataList.map((item, i) =>
            <option key={i} value={item}>{item}</option>)}
        </datalist>
      </div>
    </div>
  }

  /**
   * Создаёт эффект
   * @param param0 настройки эффекта
   * @param key key атрибут
   * @returns jsx
   */
  const rangeEffect = (param: rangeEffectTypes) => {
    const _effects = []

    // Получаем поля объекта
    for (const iterator of Object.keys(param)) {
      _effects.push(param[iterator])
    }

    return <>{_effects.map(generateRange)}</>
  }


  if (effectsSettings === undefined) return <aside></aside>

  return (<aside className={styles.effectsSettingsContainer}>
    <h1>Настройки&nbsp;эффектов</h1>
    <form>
      Эффекты к текущему слою

      <fieldset className={styles.step}>
        <h2>Шаг 1. Добавьте&nbsp;картинку</h2>
        <label htmlFor='layer-image' className={styles.layerImage}>
          Добавьте картинку на слой
        </label>
        <input id='layer-image' type="file" style={{ display: "none" }} />
        <small>MVP1: пока картинки стоит добавлять одинакового размера</small>
      </fieldset>

      <fieldset className={styles.step}>
        <h2>Шаг 2. Задайте&nbsp;
          <span className={styles.parallaxTerm} title='Движение слоя'>
            параллакс
          </span>
        </h2>
        <div className={styles.parallaxContainer}>
          <input type="range"
            min={-5} max={5} step={0.25}
            inputMode='decimal' name='parallax' id="parallax"
            value={currentPageEffects.find(({ type }) => type === EEffects.parallax)?.value ?? 0}
            onInput={editContentPage} />
          <datalist id="parallax" className={styles.optionsContainer}>
            <option value={-5}>-5</option>
            <option value={-2.5}>-2.5</option>
            <option value={0}>0</option>
            <option value={2.5}>2.5</option>
            <option value={5}>5</option>
          </datalist>
        </div>
      </fieldset>

      <fieldset className={styles.step}>
        <h2>Шаг 3. Попробуйте другие эффекты</h2>
        {rangeEffect(effectsSettings)}
      </fieldset>
    </form>
  </aside>)
}

export default EffectsSettings