# TypeScript 规范

## 类型与函数

- 不要手动添加 TypeScript 能稳定推导出的类型；公共接口、函数参数、返回边界和空值风险处应保留必要类型。
- 普通函数和对象中的函数属性统一使用箭头函数，不使用 `function` 声明或对象方法简写；类方法和框架明确要求的方法签名除外。
- 变量和函数使用 camelCase，类、接口、类型、枚举和 Vue 组件使用 PascalCase，常量是否全大写遵循当前模块已有约定。
- 不继承参考项目中的 snake_case 新命名；修改旧代码时仅在本次改动范围内渐进统一，不做无关批量重命名。
- 参数类型、泛型或复合类型较长时，在当前文件顶部定义命名明确的 `interface` 或 `type`。
- Vue 文件中的 `interface` 和 `type` 合计超过三个时，在同级目录创建 `types.ts` 并集中维护；不要为了单个简单 Props 类型额外拆文件。
- 参数已有默认值时，调用方只传非默认配置，不显式重复默认值。
- 优先缩小类型范围并处理空值，不使用 `as`、非空断言或 `any` 绕过可正确建模的类型问题。
- 仅类型用途的导入使用 `import type`，避免生成无意义的运行时代码。

## 导入与导出

- 导入顺序遵循项目 ESLint 配置：Node 内建模块、第三方依赖、项目别名、父级、同级和入口模块；不同来源组之间空一行。
- 同一来源的值导入与类型导入按项目现有格式合并或分开，不制造重复导入。
- 公共导出应保持最小且明确，不为了“以后可能使用”提前导出内部实现。
- 先声明后在文件底部集中导出时，保持当前模块既有风格；直接导出与集中导出不要在同一模块无规律混用。

## Pinia

- Store 统一使用组合式 API：`defineStore` 配合 `ref`、`computed` 和箭头函数。
- Store 定义名称使用 PascalCase，例如 `AuthStore`。
- 使用 Store 时，实例变量使用 `$` 前缀和 camelCase，例如 `const $authStore = AuthStore();`。
- 需要保持响应式解构时使用 `storeToRefs($authStore)`；方法直接通过 Store 实例调用，不从 `storeToRefs` 获取。
- Store 内部状态、计算属性和方法按职责分组，返回值只暴露调用方需要的成员。

```ts
import { defineStore, storeToRefs } from "pinia";
import { computed, ref } from "vue";

const AuthStore = defineStore("auth", () => {
  /** 登录令牌 */
  const token = ref("");
  const loggedIn = computed(() => Boolean(token.value));
  const clearToken = () => {
    token.value = "";
  };

  return { token, loggedIn, clearToken };
});

const $authStore = AuthStore();
const { token, loggedIn } = storeToRefs($authStore);

export { AuthStore };
```

## 静态资源与 `new URL`

- 同一目录需要引入多张图片时，不逐个 `import`，统一使用 `new URL(..., import.meta.url).href` 生成地址。
- 多图场景维护显式名称数组，再通过 `map` 生成资源数据；不要自动扫描目录或在运行时推导不可见的文件集合。
- 连续命名图片仍使用显式名称数组，保证构建工具能静态分析且维护者能直接看到资源清单。
- `new URL` 的路径必须指向当前文件可静态分析的具体目录，不拼接过宽或不可预期的目录层级。
- 单张图片、样式内 `background-image` 和跨目录零散图片保持原有合理写法，不强制改为 `new URL`。
- 列表图片使用 `{ key, src }`、`{ name, icon }` 等清晰结构；资源名可兼作展示字段或业务标识时，复用同一份名称数据，避免维护重复映射。

```ts
const bannerList = ["banner_1", "banner_2", "banner_3"].map((name) => ({
  key: name,
  src: new URL(`../../assets/banner/${name}.webp`, import.meta.url).href,
}));

const platformList = ["AI", "ASK", "CP"].map((name) => ({
  name,
  icon: new URL(`../../assets/platform/${name}.webp`, import.meta.url).href,
}));
```
