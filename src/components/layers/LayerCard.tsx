import React, { useEffect } from "react";
import { useDebouncedState } from "@root/src/lib/useDebouncedState";
import styles from "./LayersSettings.module.scss";
import { useTranslations } from "next-intl";

type Props = {
  name: string;
  onNameChange: (name: string) => void;
  onDeleteLayer: () => void;
};
const LayerCard = ({ name, onNameChange, onDeleteLayer }: Props) => {
  const [debouncedValue, setValue] = useDebouncedState(name, 200);
  const isFirstRender = React.useRef(true);
  const t = useTranslations("Editor");
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip the effect on initial mount
    }
    onNameChange(debouncedValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  return (
    <>
      <input
        defaultValue={name}
        onChange={(e) => setValue(e.target.value)}
        placeholder={t("layerPlaceholder")}
        className={styles.layerName}
        autoFocus
      />
      <button
        className={styles.deleteLayer}
        onClick={(event) => {
          event.stopPropagation();
          onDeleteLayer();
        }}
      >
        🗑️
      </button>
    </>
  );
};

export default LayerCard;
