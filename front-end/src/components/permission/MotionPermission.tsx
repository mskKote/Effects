import React from "react";
import styles from "./MotionPermission.module.scss";

type Props = {
  requestPermission: () => void;
};

function MotionPermission({ requestPermission }: Props) {
  return (
    <button className={styles.permissionBtn} onClick={requestPermission}>
      <code>IOS: требуется разрешение на гироскоп и акселерометр</code>
      <br />
      <br />
      <br />
      <b>Нажмите на экран, чтобы предоставить права ✔️🤏</b>
    </button>
  );
}

export default MotionPermission;
