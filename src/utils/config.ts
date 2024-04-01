import { i18n } from "../../next-i18next.config";

const config = {
  i18n: {
    ...i18n,
    NAMESPACES: ["common", "editor"],
  },
};

export default config;
