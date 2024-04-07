import React from "react";
import styles from "./RangeEffectSetting.module.scss";
import { ELanguages } from "@interfaces/IContentPage";
import { useLocale, useTranslations } from "next-intl";
import cn from "classnames";

export type RangeSettingProps = {
  options: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  dataList: readonly number[];
};

/** effect with range slider */
function RangeEffectSetting({
  options,
  dataList,
  onChange,
}: RangeSettingProps & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const locale = useLocale();
  const t = useTranslations("Editor");
  // @ts-expect-error - error based on next-intl
  const labelName = t(options.name);

  return (
    <div className={styles.effectContainer}>
      <label htmlFor={options.name}>
        {labelName} {locale !== ELanguages.en && <>({options.name})</>}
      </label>
      <div>
        <input
          className={cn(styles.slider, options.className)}
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

export default RangeEffectSetting;
