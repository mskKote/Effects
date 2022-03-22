import React from 'react'
import styles from './Loader.module.scss'

function emptyArray(arrayLength: number = 5, fill: any = {}) {
  return new Array(arrayLength).fill(fill)
}

const Loader = () => {

  return <div className={styles.loaderContainer}>
    <div className={styles.container}>

      {/* Строки */}
      {emptyArray().fill({}).map((_, rowI) =>
        <div key={`row-${rowI}`} className={styles.row}>
          {/* Колонки */}
          {emptyArray().fill({}).map((_, lineI) =>
            <div key={`line-${lineI}`} className={styles.loader}>
              {/* 1 квадрат */}
              <div className={styles.lines}>
                {emptyArray().fill({}).map((_, spanI) => <span key={spanI} />)}
              </div>
            </div>)}
        </div>
      )}
    </div>
  </div>
}

export default Loader