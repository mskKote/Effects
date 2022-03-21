import React, { DetailedHTMLProps, InputHTMLAttributes } from 'React'
import ILayer from '../../interfaces/ILayer'
import styles from './EffectsSettings.module.scss'


type rangeEffectType = {
  name: string,
  id: string,
  options: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  dataList: Array<number>,
}

const rangeEffects: rangeEffectType[] = [{
  name: "Размытие (blur)", id: "blur",
  options: { min: 0, max: 15, step: 0.5, inputMode: "decimal", defaultValue: 0 },
  dataList: [0, 5, 10, 15],
}, {
  name: "Яркость (brightness)", id: "brightness",
  options: { min: 0, max: 300, step: 30, inputMode: "numeric", defaultValue: 100 },
  dataList: [0, 100, 200, 300],
}, {
  name: "Насыщенность (saturate)", id: "saturate",
  options: { min: 0, max: 300, step: 1, inputMode: "numeric", defaultValue: 100 },
  dataList: [0, 150, 300],
}, {
  name: "Контраст (contrast)", id: "contrast",
  options: { min: 0, max: 300, step: 1, inputMode: "numeric", defaultValue: 100 },
  dataList: [0, 150, 300],
}, {
  name: "Серость (grayscale)", id: "grayscale",
  options: { min: 0, max: 100, step: 1, inputMode: "numeric", defaultValue: 0 },
  dataList: [0, 50, 100],
}, {
  name: "Инвертировать (invert)", id: "invert",
  options: { min: 0, max: 100, step: 1, inputMode: "numeric", defaultValue: 0 },
  dataList: [0, 50, 100],
}, {
  name: "Повернуть палитру (hue-rotate)", id: "hue-rotate",
  options: { min: 0, max: 360, step: 1, inputMode: "numeric", defaultValue: 0 },
  dataList: [0, 180, 360],
}, {
  name: "Сепия (sepia)", id: "sepia",
  options: { min: 0, max: 100, step: 1, inputMode: "numeric", defaultValue: 0 },
  dataList: [0, 50, 100],
},
]

/**
 * Создаёт эффект
 * @param param0 настройки эффекта
 * @param key key атрибут
 * @returns jsx
 */

const rangeEffect = ({ name, id, options, dataList }: rangeEffectType, key: number) =>
  <div className={styles.rangeEffect} key={key}>
    <label className={styles.inputLabel} htmlFor={id} />
    {name}
    <div className={styles.inputContainer}>
      <input list={`effect${key}`} type="range" {...options} id={id} />
      <datalist id={`effect${key}`} className={styles.optionsContainer}>
        {dataList.map((item, i) => {
          return (<option style={i===0 ? {textAlign: "left"} : i===1 ? {textAlign: "left"} : {textAlign: "right"}}className={`${styles.option}${i}`} key={i} value={item} className={styles.dataValues}>{item}</option>)
        })}
      </datalist>
    </div>
  </div>


const EffectsSettings = ({ effects }: ILayer) => {

  function createRangeEffects(rangeEffects: rangeEffectType[]) {
    return rangeEffects
  }

  return (<aside className={styles.effectsSettingsContainer}>
    <h1>Настройки слоёв</h1>
    <form>
      Эффекты, которые применяются к текущему слою

      <fieldset className={styles.step}>
        <h2>Шаг 1. Добавьте картинку</h2>
        <p>Добавьте картинки</p>
        <label htmlFor='layer-image' className={styles.layerImage}>
          Custom Upload
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
        <input type="range" min={-10} max={10} step={0.1} inputMode={'decimal'} defaultValue={0} />
      </fieldset>

      <fieldset className={styles.step}>
        <h2>Шаг 3. Попробуйте другие эффекты</h2>
        {createRangeEffects(rangeEffects).map(rangeEffect)}
      </fieldset>
    </form>
  </aside>)
}

export default EffectsSettings