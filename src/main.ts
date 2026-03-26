import { createApp } from "vue";

import App from "./App.vue";

import { setupRouter } from "@/router";
import { setupLanguage } from "@/language";
import { setupStore } from "@/store";

import "@/styles/index.less";

/** 应用实例 */
const app = createApp(App);
/** @description 初始化状态管理 */
setupStore(app);
/** @description 初始化国际化 */
setupLanguage(app);
/** @description 初始化路由 */
setupRouter(app);
/** @description 挂载应用 */
app.mount("#app");
