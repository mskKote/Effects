import React, { DetailedHTMLProps, InputHTMLAttributes } from 'React'
import ILayer from '../../interfaces/ILayer'
import { useFormWithValidation } from '../../utils/useFormWithValidation'
import styles from './EffectsSettings.module.scss'


type rangeEffectType = {
  title: string,
  name: string,
  options: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
  dataList: Array<number>,
}

const rangeEffects: rangeEffectType[] = [{
  title: "Размытие", name: "blur",
  options: { min: 0, max: 15, step: 0.5, inputMode: "decimal", defaultValue: 0 },
  dataList: [0, 5, 10, 15],
}, {
  title: "Яркость", name: "brightness",
  options: { min: 0, max: 200, step: 10, inputMode: "numeric", defaultValue: 100 },
  dataList: [0, 100, 200],
}, {
  title: "Насыщенность", name: "saturate",
  options: { min: 0, max: 200, step: 1, inputMode: "numeric", defaultValue: 100 },
  dataList: [0, 100, 200],
}, {
  title: "Контраст", name: "contrast",
  options: { min: 0, max: 200, step: 10, inputMode: "numeric", defaultValue: 100 },
  dataList: [0, 100, 200],
}, {
  title: "Серость", name: "grayscale",
  options: { min: 0, max: 100, step: 10, inputMode: "numeric", defaultValue: 0 },
  dataList: [0, 50, 100],
}, {
  title: "Инвертировать", name: "invert",
  options: { min: 0, max: 100, step: 10, inputMode: "numeric", defaultValue: 0 },
  dataList: [0, 50, 100],
}, {
  title: "Повернуть палитру", name: "hue-rotate",
  options: { min: 0, max: 360, step: 1, inputMode: "numeric", defaultValue: 0 },
  dataList: [0, 180, 360],
}, {
  title: "Сепия", name: "sepia",
  options: { min: 0, max: 100, step: 10, inputMode: "numeric", defaultValue: 0 },
  dataList: [0, 50, 100],
},
]

const EffectsSettings = ({ effects }: ILayer) => {
  const { values, handleChange, errors, isValid, resetForm } = useFormWithValidation()

  /**
   * Создаёт эффект
   * @param param0 настройки эффекта
   * @param key key атрибут
   * @returns jsx
   */
  const rangeEffect = ({ title, name, options, dataList }: rangeEffectType, key: number) =>
    <div className={styles.effectContainer} key={key}>
      <label className={styles.inputLabel} htmlFor={name}>
        {title}
      </label>
      <div className={styles.inputContainer}>
        <input list={`effect-${key}`} type="range" {...options} id={name} name={name} onChange={handleChange} />
        <datalist id={`effect-${key}`} className={styles.optionsContainer}>
          {dataList.map((item, i) =>
            <option key={i} value={item}>{item}</option>)}
        </datalist>
      </div>
    </div>

  function createRangeEffects(rangeEffects: rangeEffectType[]) {
    for (const iterator of rangeEffects) {

    }
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
        <div className={styles.parallaxContainer}>
          <input type="range" min={-10} max={10} step={0.1} inputMode='decimal' defaultValue={0} id="parallax" />
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
        {createRangeEffects(rangeEffects).map(rangeEffect)}
      </fieldset>
    </form>
  </aside>)
}

export default EffectsSettings