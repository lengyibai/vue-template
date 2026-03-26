import type { Directive } from "vue";

/** @description 聚焦指令参数 */
type FocusBindingValue = boolean | undefined;

/** @description 执行元素聚焦 */
const applyFocus = (element: HTMLElement) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      element.focus();
    });
  });
};

/** @description 自动聚焦指令 */
export const focus: Directive<HTMLElement, FocusBindingValue> = {
  mounted(element, binding) {
    if (binding.value === false) return;
    applyFocus(element);
  },
  updated(element, binding) {
    if (binding.value === false || binding.value === binding.oldValue) return;
    applyFocus(element);
  },
};
