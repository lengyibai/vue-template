import { LibJsEmitter } from "./tool";

/** @description 游戏通用事件名 */
export enum EVENT_NAME {
  /** 顶号提示 */
  SQUEEZE_ERROR = "SQUEEZE_ERROR",
}

type T = {
  /** 显示顶号提醒 */
  [EVENT_NAME.SQUEEZE_ERROR]: [];
};

type MittEventMap = {
  [K in keyof T]: T[K];
};

const $globalBus = LibJsEmitter<MittEventMap>();

export { $globalBus };
