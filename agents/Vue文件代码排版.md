# Vue 文件代码排版

## 单文件组件顺序

Vue 单文件组件固定按以下顺序组织：

1. `<script setup lang="ts">`
2. `<template>`
3. `<style scoped lang="less">`

不得将 Template 放到 Script 之前，也不得出现多个并列 Template 根节点。

## Script 排版顺序

`<script setup>` 内按以下职责顺序排列：

1. `import type` 与普通 `import`
2. 当前文件使用的 `interface`、`type`
3. `defineOptions`、`defineProps`、`defineEmits`、`defineModel`、`defineExpose`
4. `useRouter`、`useRoute` 等路由实例
5. Pinia Store 实例与 `storeToRefs`
6. DOM 或组件实例的模板 `ref`
7. 组合式 Hooks
8. 非响应式常量和静态数据
9. 响应式状态
10. `computed` 派生状态
11. `watch`、`watchEffect` 及其专用回调
12. 创建和激活相关生命周期
13. 页面与交互函数
14. 销毁和失活相关生命周期

- 同一职责区域内的连续声明紧凑排列，不为每个变量额外插入空行。
- 不同职责区域之间使用一个空行分隔，不添加“路由区”“变量区”等无意义分区注释。
- 函数存在依赖关系时，被依赖函数应在调用它的函数之前声明；生命周期位置仍按上述顺序保持一致。
- 导入的具体分组和排序遵循项目 ESLint 配置与 [TypeScript 规范](./TypeScript规范.md)。

## Vue 宏格式

Props 统一使用类型声明。只在模板使用时，不创建多余的 `$props`：

```ts
interface Props {
  /** 是否允许新增 */
  add?: boolean;
  /** 是否允许批量更新 */
  batchUpdate?: boolean;
}
defineProps<Props>();
```

脚本需要读取 Props 时再接收返回值：

```ts
interface Props {
  /** 用户编号 */
  userId: number;
}
const $props = defineProps<Props>();
```

Emits 统一使用具名元组负载，事件名使用 kebab-case：

```ts
const $emit = defineEmits<{
  "tab-change": [index: number];
}>();
```

组件双向绑定统一使用 `defineModel`：

```ts
const modelValue = defineModel<string>({ required: true });
const tabIndex = defineModel<number>("tabIndex", { required: true });
```

## 完整示例

```vue
<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { storeToRefs } from "pinia";

import { AuthStore } from "@/store";

import UserCard from "./components/UserCard/index.vue";

interface Props {
  /** 是否显示用户列表 */
  visible: boolean;
}
const $props = defineProps<Props>();
const $emit = defineEmits<{
  "user-change": [id: number];
}>();

const $authStore = AuthStore();
const { userList } = storeToRefs($authStore);

/** 用户列表容器 */
const listRef = ref<HTMLElement>();

const pageSize = 20;

/** 当前页码 */
const page = ref(1);
const visibleUsers = computed(() => userList.value.slice(0, page.value * pageSize));

/* 页面隐藏后恢复初始页码 */
watch(
  () => $props.visible,
  (visible) => {
    if (!visible) page.value = 1;
  },
);

/** @description 选择用户 */
const handleUserChange = (id: number) => {
  $emit("user-change", id);
};
</script>

<template>
  <div ref="listRef" class="user-list">
    <UserCard
      v-for="user in visibleUsers"
      :key="user.id"
      :user
      @change="handleUserChange"
    />
  </div>
</template>

<style scoped lang="less">
.user-list {
  display: grid;
  gap: var(--gap-4);
}
</style>
```
