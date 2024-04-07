import React from "react";
import styles from "./Toggler.module.scss";

type Props = {
  id: string;
  checked: boolean;
  onToggle: (e: boolean) => void;
};
const Toggler = ({ id, checked, onToggle }: Props) => {
  return (
    <div>
      <input
        checked={checked}
        onChange={(e) => onToggle(e.target.checked)}
        id={`toggle-${id}`}
        type="checkbox"
        className={styles.input}
      />
      <label htmlFor={`toggle-${id}`} className={styles.toggle} />
    </div>
  );
};

export default Toggler;
