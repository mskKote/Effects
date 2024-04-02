import React from "react";
import styles from "./RangeEffectSetting.module.scss";
import useLocale from "@utils/useLocale";
import { ELanguages } from "@interfaces/IContentPage";
import { Trans } from "next-i18next";

export type RangeSettingProps = {
  options: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  dataList: number[];
};

/** effect with range slider */
function RangeEffectSetting({
  options,
  dataList,
  onChange,
}: RangeSettingProps & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const { locale } = useLocale();
  return (
    <div className={styles.effectContainer}>
      <label htmlFor={options.name}>
        <Trans i18nKey={`editor:${options.name}`} />{" "}
        {locale !== ELanguages.en && <>({options.name})</>}
      </label>
      <div>
        <input
          list={`effect-${options.name}`}
          type="range"
          {...options}
          id={options.name}
          name={options.name}
          onChange={onChange}
        />
        <datalist
          id={`effect-${options.name}`}
          className={styles.optionsContainer}
        >
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

export default React.memo(RangeEffectSetting);
