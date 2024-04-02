import React from "react";
import HeadSEO from "@utils/HeadSEO";
import styles from "./Loader.module.scss";

function emptyArray(arrayLength: number = 5, fill: any = {}) {
  return new Array(arrayLength).fill(fill);
}

const Loader = () => {
  return (
    <div className={styles.loaderContainer}>
      <HeadSEO
        title="Effects"
        description="Manga&comics with effects"
        keywords={["Comics", "manga", "effects", "parallax", "2.5d"]}
        author="🔮 Effects team"
        iconImg="/icon.svg"
        socialNetworkImg="/icon.svg"
      />

      <div className={styles.container}>
        {/* Строки */}
        {emptyArray().map((_, rowI) => (
          <div key={`row-${rowI}`} className={styles.row}>
            {/* Колонки */}
            {emptyArray().map((_, lineI) => (
              <div key={`line-${lineI}`} className={styles.loader}>
                {/* 1 квадрат */}
                <div className={styles.lines}>
                  {emptyArray().map((_, spanI) => (
                    <span key={spanI} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
