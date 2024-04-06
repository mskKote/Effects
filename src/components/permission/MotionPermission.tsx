import React from "react";
import styles from "./MotionPermission.module.scss";
import { useTranslations } from "next-intl";

type Props = {
  requestPermission: () => void;
};

function MotionPermission({ requestPermission }: Props) {
  const t = useTranslations("Common");
  return (
    <button className={styles.permissionBtn} onClick={requestPermission}>
      <code>{t("gyroscopePermissionMessage")}</code>
      <br />
      <br />
      <br />
      <b>{t("permissionInstructions")}</b>
    </button>
  );
}

export default MotionPermission;
