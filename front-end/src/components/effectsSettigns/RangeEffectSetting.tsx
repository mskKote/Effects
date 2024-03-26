import styles from "./RangeEffectSetting.module.scss";

export type RangeSettingProps = {
  title: string;
  options: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
  dataList: number[];
};

/** effect with range slider */
function RangeEffectSetting({
  title,
  options,
  dataList,
  onChange,
}: RangeSettingProps & {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
}) {
  return (
    <div className={styles.effectContainer}>
      <label htmlFor={options.name}>
        {title} ({options.name})
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

export default RangeEffectSetting;
