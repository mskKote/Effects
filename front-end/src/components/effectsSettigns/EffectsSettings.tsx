import React from 'react'
import styles from './EffectsSettings.module.scss'

type Props = {
}

const EffectsSettings = ({ }: Props) => {
  return (<aside className={styles.effectsSettingsContainer}>
    <h1>Настройки слоёв</h1>
    <form>
      Эффекты, которые применяются к текущему слою

      <fieldset className={styles.step}>
        <h2>Шаг 1. Добавьте картинку</h2>
        <input type="file" />
      </fieldset>

      <fieldset className={styles.step}>
        <h2>Шаг 2. Задайте <span className={styles.parallaxTerm} title='Движение слоя'>параллакс</span></h2>
        <input type="range" defaultValue={0} />
      </fieldset>

      <fieldset className={styles.step}>
        <h2>Шаг 3. Попробуйте другие эффекты</h2>
        <div>
          <h3>Размытие / blur</h3>
          <input type="range" min={0} max={20} defaultValue={0} />
        </div>
        <div>
          <h3>Яркость / brightness</h3>
          <input type="range" min={0} max={1} defaultValue={1} />
        </div>
        <div>
          <h3>Насыщенность / saturate</h3>
          <input type="range" min={0} max={5} defaultValue={1} />
        </div>
        <div>
          <h3>Контраст / contrast</h3>
          <input type="range" min={0} max={1} />
        </div>
        <div>
          <h3>Серость / grayscale</h3>
          <input type="range" min={0} max={1} />
        </div>
        <div>
          <h3>Инвертировать / invert</h3>
          <input type="range" min={0} max={1} />
        </div>
        <div>
          <h3>Повернуть палитру цветов / hue-rotate</h3>
          <input type="range" min={0} max={360} defaultValue={0} />
        </div>
        <div>
          <h3>Сепия / sepia</h3>
          <input type="range" min={0} max={1} defaultValue={0} />
        </div>
      </fieldset>
    </form>

  </aside>)
}

export default EffectsSettings