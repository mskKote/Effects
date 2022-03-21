import React, { DetailedHTMLProps, InputHTMLAttributes } from 'react'
import styles from './EffectsSettings.module.scss'


type rangeEffectType = {
  name: string,
  id: string,
  options: DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
}

const effects: rangeEffectType[] = [{
  name: "Размытие (blur)", id: "blur",
  options: { min: 0, max: 20, step: 0.5, inputMode: "decimal", defaultValue: 0 }
}, {
  name: "Яркость (brightness)", id: "brightness",
  options: { min: 0, max: 300, step: 1, inputMode: "numeric", defaultValue: 100 }
}, {
  name: "Насыщенность (saturate)", id: "saturate",
  options: { min: 0, max: 300, step: 1, inputMode: "numeric", defaultValue: 100 }
}, {
  name: "Контраст (contrast)", id: "contrast",
  options: { min: 0, max: 300, step: 1, inputMode: "numeric", defaultValue: 100 }
}, {
  name: "Серость (grayscale)", id: "grayscale",
  options: { min: 0, max: 100, step: 1, inputMode: "numeric", defaultValue: 0 }
}, {
  name: "Инвертировать (invert)", id: "invert",
  options: { min: 0, max: 100, step: 1, inputMode: "numeric", defaultValue: 0 }
}, {
  name: "Повернуть палитру (hue-rotate)", id: "hue-rotate",
  options: { min: 0, max: 360, step: 1, inputMode: "numeric", defaultValue: 0 }
}, {
  name: "Сепия (sepia)", id: "sepia",
  options: { min: 0, max: 100, step: 1, inputMode: "numeric", defaultValue: 0 }
},
]

/**
 * Создаёт эффект
 * @param param0 настройки эффекта
 * @param key key атрибут
 * @returns jsx
 */
const rangeEffect = ({ name, id, options }: rangeEffectType, key: number) =>
  <div className={styles.rangeEffect} key={key}>
    <label htmlFor={id} children={name} />
    <input type="range" {...options} id={id} />
  </div>

type Props = {
}

const EffectsSettings = ({ }: Props) => {
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
        {effects.map(rangeEffect)}
      </fieldset>
    </form>

  </aside>)
}

export default EffectsSettings