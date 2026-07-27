import "react-i18next";
import hy from "./languages/hy.json";

declare module "react-i18next" {
  interface CustomTypeOptions {
    resources: typeof hy;
  }
}
