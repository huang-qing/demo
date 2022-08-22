import type { App, Plugin } from "vue";
import inifiniteMenu from "./src/menu";
import type { IMenuItem } from "./src/type";

inifiniteMenu.install = function (app: App) {
  app.component("m-inifinite-menu", inifiniteMenu);
};

export { IMenuItem };
export default inifiniteMenu as typeof inifiniteMenu & Plugin;
