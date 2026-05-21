# AI开发规范

> 编辑代码时，如发现当前文件未按本规范执行，应及时按照文档规范进行优化并补齐（例如缺少注释则补齐），确保与本规范一致。

## 规则优先级与冲突处理

- 规则优先级固定为：
1. 语义正确性（功能/交互）
2. 框架与工程约定（Vue/TS/CSS）
3. 注释与排版风格
- 若条款冲突，按上述优先级执行；本规范中已合并冲突口径，默认按最终口径落地。
- 不要执行 `package.json` 中定义的脚本命令。
- 除非用户明确授权，否则禁止运行任何测试命令，包括但不限于单元测试、集成测试、端到端测试、覆盖率命令，以及 `npm test`、`pnpm test`、`vitest`、`jest`、`cypress`、`playwright test` 等相关命令。
- 执行代码前先读取 `BUSINESS.md`；若文件存在，必须先理解其中业务约束再继续执行。
- 每次编辑文件之前都要重新读取该文件内容；如果发现文件当前内容相较于上次修改后的版本已变化，禁止还原旧版本，必须基于当前内容继续修改。
- 用户视觉层面的提示文案默认使用简体中文；若设计图明确指定英文文案，则按设计图语言执行。
- 除非用户明确要求，否则不要打开本地 URL，不要调用浏览器演示能力，也不要主动弹出“Want to try it? (Requires opening a local URL)”这类可视化提示。

## 注释规范（按需为主，白名单强制）

- 总原则：函数、变量、类型按需补充注释，优先保证语义清晰；如果名称和上下文已经足够自解释，不要为了注释而注释。
- 强制注释白名单：
1. 导出的对象需使用 `/** @description xxx */` 格式注释。
2. `interface` 中的类型属性应使用 `/** xxx */` 格式注释。
3. `ref` 变量应使用 `/** xxx */` 格式注释。
4. template 内需要说明业务边界或复杂交互的功能模块应添加注释，且注释前必须空一行。
5. 在构造函数中，凡是类实例化语句（`new Xxx()`），上一行需使用中文 `//` 注释说明该实例的业务用途。
6. 函数内部的复杂功能模块上方需要使用中文 `//` 注释说明。
- template 内模块注释需描述业务含义，不得使用 `模块: div` 这类无实际语义的注释。
- 不要在 Vue 的 template 开始标签后的第一行添加注释，避免影响路由页面渲染。
- 不要在先声明后导出的变量上方添加注释，只有 `export const` 这类直接导出的声明允许在上方添加注释。
- 注释双斜杠后面不能加空格。
- Vue 生命周期不需要加注释。
- 自定义函数若需要注释，使用 `/** @description 这是一个函数 */` 格式。
- Vue 监听器相关的方法使用 `/*  */` 注释，而不是 `@description`。
- `define` 开头的 Vue 方法上边不需要注释。
- `useRouter`、`useRoute` 上边不要添加 JSDoc 注释。
- 注释内容统一使用中文。
- 原有注释语义清晰时，不得擅自删除、替换或改写原意，仅可在缺失时补齐。
- 函数调用的上面不需要添加注释。

```ts
/** 这是一个变量 */
const username = '';
/** 这是一个对象 */
const obj = {
  name: '',
  age: '',
};

/** @description 这是一个函数 */
const getUserInfo = (username: string, age: number) => {};

/** @description 这是一个类 */
class User {
  /** 用户名 */
  username: string;
  /** 年龄 */
  age: number;

  /** @description 构造函数 */
  constructor(username: string, age: number) {
    this.username = username;
    this.age = age;
  }

  /** @description 获取用户信息 */
  getUserInfo() {}
}

/** @description 用户信息 */
interface UserInfo {
  /** 名字 */
  name: string;
  /** 年龄 */
  age: number;
}

/** @description 多语言 */
type Lang = 'zh' | 'en';
```

## CSS

- 字重不要写精确数值；如果需要粗体，统一直接使用 `font-weight: bold`。
- CSS 变量如果只使用一次，直接写具体值，不要额外定义变量。
- 如果遇到 `margin`、`padding`、`gap` 这类跟间隔有关的 CSS 属性，必须统一使用项目内的 `--gap` CSS 变量。
- 如果遇到 `border-radius`，必须统一使用项目内的 `--radius` CSS 变量。
- 不要自行加入 `letter-spacing`、`line-height`、`white-space`，这类样式按人工需要再单独调整。
- 子类名尽量使用简洁、独立的命名，不要使用父类名拼接下划线 `__` 的长命名方式。
- 当独立类名可能与其他区域冲突时，优先通过父级配合 `>` 选择器限定直接子元素作用范围，避免后代污染。
- Less 的层次结构要严格按照 DOM 结构进行层层嵌套，保持祖父、父、子层级分明，禁止脱离父级结构单独书写。

## TypeScript 类型

- 不要手动添加能自动推导的 TypeScript 类型。
- 函数统一使用箭头函数。
- 若文件内的参数类型或泛型较长，在当前文件顶部定义 `interface` 或 `type`。
- 当 Vue 文件内的 `interface` 和 `type` 定义合计超过三个时，必须在同级目录新增 `types.ts`，并将相关类型定义迁移到该文件中统一维护。
- 当函数、组件或工具对象的参数本身已有默认值时，不要显式传递该默认值；只传非默认值，避免冗余配置。
- 使用 Pinia 时统一采用组合式 API 写法，优先使用 `defineStore` 配合 `ref`、`computed` 和 `storeToRefs`。
- Pinia 的 store 定义名称使用大驼峰，例如 `AuthStore`。
- 使用 store 时，变量名统一写成 `$authStore = AuthStore()` 这种形式。

## 静态资源与 new URL

- 同一文件夹内需要引入多张图片时，不要逐个 `import` 图片资源，统一改为使用 `new URL(..., import.meta.url).href` 动态生成。
- 多图场景优先维护显式名称数组，再通过 `map` 生成图片地址，不要使用自动扫描目录的方式。
- 连续命名图片也优先使用显式名称数组，不要为了少写几项而改成运行时推导目录内容。
- 单张图片、样式内 `background-image`、跨目录零散图片默认保持原有写法，不强制改为 `new URL`。
- 使用 `new URL` 时，路径必须指向当前文件可静态分析到的具体目录，不要拼出过于宽泛或不可预期的路径层级。
- 列表图片数据优先收敛为 `{ key, src }`、`{ name, icon }` 这类清晰结构，避免一边维护名称一边逐个维护图片变量。
- 如果图片名称可直接作为展示字段或业务标识，优先复用同一份名称数据生成资源地址，避免重复维护两份映射关系。

```ts
const bannerList = ["banner_1", "banner_2", "banner_3"].map((name) => ({
  key: name,
  src: new URL(`../../assets/${name}.webp`, import.meta.url).href,
}));

const platformList = ["AI", "ASK", "CP"].map((name) => ({
  name,
  icon: new URL(`../../assets/platform/${name}.webp`, import.meta.url).href,
}));
```

## Vue

- 页面结构标签统一使用 `div` 或 `span`，不使用语义化结构标签。
- 组件标签允许并要求使用大驼峰命名。
- 当页面变量名与标签属性名一致时，可以用 `:xxx` 简写绑定。
- 布尔属性为真时（如 `:xxx="true"`），可以直接写成 `xxx`。
- 页面结构顺序：`<script>` 在顶部，其次 `<template>`，最后 `<style>`。
- 组件必须单独建文件夹，文件夹内包含 `index.vue`。
- 每一个 UI 模块都应优先抽离为组件；只会在当前页面使用的组件，放在该 `index.vue` 所在文件夹下的 `components` 文件夹中。
- 如果组件具备全局复用价值，统一放在 `src/components` 中；如果按钮类型较多，可在 `src/components/buttons` 下按按钮类型继续拆分。
- 仅会使用一次的组件，不要提升到全局目录，直接放在当前页面文件夹下的 `components` 中即可。
- 当 Vue 文件中 `style` 标签内的 CSS 超过 100 行时，再抽离到 `index.less`。
- 页面出现循环列表时，可将列表元素抽成组件，并在当前页面文件夹下创建 `components` 文件夹存放。
- 页面功能模块较多时，可按区块抽成组件，避免单文件代码过多。
- Vue 文件中可解耦的复杂功能逻辑应拆分为一个或多个 hooks，避免 `script` 中存在过多逻辑代码。
- `ref` 绑定对象或者数组时，类型使用 `ref<xxx>()` 的泛型写法。
- 不要在模板标签里使用类型断言（例如 `as` 断言）。
- Vue 文件内的 `<template>` 标签中只能保留一个根标签，不允许出现多个并列标签或多个并列组件。

## Vue 文件代码排版

代码排版应按照：

```ts
import

interface Props {
}
defineProps<Props>()

const $emit = defineEmits<{
  change: [v: number];
}>()

Router 路由相关引入

Pinia Store相关引入

ref 绑定的 DOM 元素

hooks

非响应式数据

响应式变量

计算属性

监听相关的方法

创建生命周期

函数

销毁相关的生命周期
```

- 分区之间允许空行；同一分区内的变量声明不额外插入空行。
- `defineProps` 统一使用以下格式。
- 如果只是为了在模板中使用 Props，不要额外写 `const $props = defineProps<Props>()`，直接使用 `defineProps<Props>()` 即可。

```ts
interface Props {
  add?: boolean;
  batchUpdate?: boolean;
  batchSend?: boolean;
}
defineProps<Props>();
```

- `defineEmits` 统一使用以下格式：

```ts
const $emit = defineEmits<{
  "tab-change": [index: number];
}>();
```

- 组件双向绑定统一使用 `defineModel`，格式如下：

```ts
const modelValue = defineModel<string>({ required: true });
const tabIndex = defineModel<number>("tabIndex", { required: true });
```

## 数据排版

- 只会使用一次的值不要单独创建变量，应直接在使用处表达。
- 优先使用空对象或空数组作为默认值，避免直接写带数据的对象或数组。

```ts
//数字
//字符串
//布尔值
//数组
//对象
```

## 动画补充规范

- 动画属性优先使用缩写形式（例如 `animation: download-pulse 1.2s ease-in-out infinite`），避免拆分为多个 animation 子属性。
- `@keyframes` 动画名统一使用中划线命名法（例如 `download-pulse`）。
- `@keyframes` 不要写在样式顶层，应写在被使用的选择器作用域内，就近与使用处包裹在一起。
