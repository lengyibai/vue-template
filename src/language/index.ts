import { createI18n } from "vue-i18n";
import type { App } from "vue";

import en from "./modules/en";
import tc from "./modules/tc";

import { LOCAL_KEY } from "@/config";

/** 国际化消息类型 */
type I18nTypeEnum = typeof en;

/** 语言包映射 */
const messages: Record<string, I18nTypeEnum> = { en, tc };

/** 当前缓存语言 */
const lang = localStorage.getItem(LOCAL_KEY.LANGUAGE);

/** 国际化实例 */
const i18n = createI18n({
  /** 默认语言 */
  locale: lang || "en",
  /** 启用 Composition API 模式 */
  legacy: false,
  /** 全局注入 $t 方法 */
  globalInjection: true,
  messages,
});

/** 国际化全局方法 */
const { setLocaleMessage, locale, t } = i18n.global;

/** @description 设置语言
 * @param lang 语言标识
 */
const setLanguage = (lang: string) => {
  setLocaleMessage(lang, messages[lang]);
  locale.value = lang;
  localStorage.setItem(LOCAL_KEY.LANGUAGE, lang);
};

/** @description 安装国际化能力 */
const setupLanguage = (app: App) => {
  app.use(i18n);
};

export { setupLanguage, setLanguage, t };
export type { I18nTypeEnum };
