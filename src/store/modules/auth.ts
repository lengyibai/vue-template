import { defineStore } from "pinia";
import { ref } from "vue";

/** @description 用户认证状态 */
const AuthStore = defineStore("auth", () => {
  const token = ref("");

  return {
    token,
  };
});

export { AuthStore };
