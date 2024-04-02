import React from "react";
import styles from "./MotionPermission.module.scss";
import { Trans } from "next-i18next";

type Props = {
  requestPermission: () => void;
};

function MotionPermission({ requestPermission }: Props) {
  return (
    <button className={styles.permissionBtn} onClick={requestPermission}>
      <code>
        <Trans i18nKey="editor:gyroscopePermissionMessage" />
      </code>
      <br />
      <br />
      <br />
      <b>
        <Trans i18nKey="editor:permissionInstructions" />
      </b>
    </button>
  );
}

export default MotionPermission;
