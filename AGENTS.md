# AI开发规范

> 编辑代码时，如发现当前文件未按本规范执行，应及时优化并补齐（例如缺少注释则补齐），确保与本规范一致，注意不要出现中文乱码

- 不要执行 `package.json` 中定义的脚本命令
- 每次编辑文件之前都要重新读取该文件内容，如果发现文件当前内容相较于我上次修改后的版本已经发生变化，禁止还原成上次版本，应以当前文件内容为基础继续修改
- 中文文件只用 `apply_patch` 修改，不再使用可能触发编码转换的写回命令
- 用户视觉层面的提示文案统一使用简体中文，除非设计图是中文文案
- 每次修改完成后，必须做乱码检测（`U+FFFD` 和典型乱码片段）再交付
- 文件修改完之后，需要 diff 一下确认中文字符串或中文注释是否存在乱码

## 编码

- 所有中文文案、中文注释、中文提示语必须直接使用中文书写，不得写成 `\uXXXX` 形式的 Unicode 转义
- 除非我明确要求，否则不要为了规避终端显示问题，将中文替换为 Unicode 转义、HTML 实体或其他转码形式
- 如遇终端乱码、补丁工具乱码或编码显示异常，应保持源码文件内容为正常中文 UTF-8，不要擅自改成转义字符
- 如果你判断当前环境可能导致中文写入异常，应先说明风险并等待我确认，不要自行把中文改写为 Unicode 转义
- 即使终端显示乱码，也应优先保证文件内源码保持可读中文，禁止将 `\uXXXX` 作为常规实现方式


## 注释

- template 内需要说明业务边界或复杂交互的功能模块应添加注释，且注释前必须空一行
- template 内模块注释需描述业务含义，不得使用 `模块: div` 这类无实际语义的注释
- 不要在 Vue 的 template 开始标签后的第一行添加注释，避免影响路由页面渲染
- 函数、变量、类型应按需补充注释，优先保证语义清晰；如果名称和上下文已经足够自解释，不要为了注释而注释
- 不要在先声明后导出的变量上方添加注释，只有 `export const` 这类直接导出的声明允许在上方添加注释
- 导出的对象需使用 `/** @description xxx */` 格式注释
- `interface` 中的类型属性应使用 `/** xxx */` 格式注释
- `ref` 变量应使用 `/** xxx */` 格式注释
- 注释双斜杠后面不能加空格
- Vue 生命周期不需要加注释
- Vue 监听器相关的方法使用 `/*  */` 注释，而不是 `@description`
- 注释内容统一使用中文
- 原有注释语义清晰时，不得擅自删除、替换或改写原意，仅可在缺失时补齐
- 自定义函数使用 `/** @description 这是一个函数 */` 格式注释
- 函数调用的上面不需要添加注释
- 在构造函数中，凡是类实例化语句（`new Xxx()`），上一行需使用中文 `//` 注释说明该实例的业务用途
- 函数内部的功能模块上方需要使用 `//` 注释说明
- define 开头的 Vue 方法上边不需要注释

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

- 字重不要写精确数值；如果需要粗体，统一直接使用 `font-weight: bold`
- CSS 变量如果只使用一次，直接写具体值，不要额外定义变量
- 不要自行加入 `letter-spacing`、`line-height`、`white-space`，这类样式按人工需要再单独调整
- 子类名尽量使用简洁、独立的命名，不要使用父类名拼接下划线 `__` 的长命名方式
- 当独立类名可能与其他区域冲突时，优先通过父级配合 `>` 选择器限定直接子元素作用范围，避免后代污染
- Less 的层次结构要严格按照 DOM 结构进行层层嵌套，保持祖父、父、子层级分明，禁止脱离父级结构单独书写

## TypeScript 类型

- 不要手动添加能自动推导的 TypeScript 类型
- 函数统一使用箭头函数
- 若文件内的参数类型或泛型较长，在当前文件顶部定义 `interface` 或 `type`
- 当函数、组件或工具对象的参数本身已有默认值时，不要显式传递该默认值；只传非默认值，避免冗余配置
- 使用 Pinia 时统一采用组合式 API 写法，优先使用 `defineStore` 配合 `ref`、`computed` 和 `storeToRefs`
- Pinia 的 store 定义名称使用大驼峰，例如 `AuthStore`
- 使用 store 时，变量名统一写成 `$authStore = AuthStore()` 这种形式

## Vue

- 组件标签名称使用大驼峰
- 当页面变量名与标签属性名一致时，可以用 `:xxx` 简写绑定
- 布尔属性为真时（如 `:xxx="true"`），可以直接写成 `xxx`
- 页面模板不使用语义化标签，统一只使用 `span` 或 `div` 作为结构标签
- 页面结构顺序：`<script>` 在顶部，其次 `<template>`，最后 `<style>`
- 组件必须单独建文件夹，文件夹内包含 `index.vue`
- 每一个 UI 模块都应优先抽离为组件；只会在当前页面使用的组件，放在该 `index.vue` 所在文件夹下的 `components` 文件夹中
- 如果组件具备全局复用价值，统一放在 `src/components` 中；如果按钮类型较多，可在 `src/components/buttons` 下按按钮类型继续拆分
- 仅会使用一次的组件，不要提升到全局目录，直接放在当前页面文件夹下的 `components` 中即可
- 当 Vue 文件中 `style` 标签内的 CSS 超过 50 行时，再抽离到 `index.less`
- 页面出现循环列表时，可将列表元素抽成组件，并在当前页面文件夹下创建 `components` 文件夹存放
- 页面功能模块较多时，可按区块抽成组件，避免单文件代码过多
- Vue 文件中可解耦的复杂功能逻辑应拆分为一个或多个 hooks，避免 `script` 中存在过多逻辑代码
- `ref` 绑定对象或者数组时，类型使用 `ref<xxx>()` 的泛型写法
- 不要在模板标签里使用类型断言（例如 `as` 断言）

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

//Router 路由相关引入

//Pinia Store相关引入

//ref 绑定的 DOM 元素

//hooks

//非响应式数据

//响应式变量

//计算属性

//监听相关的方法

//创建生命周期

//函数

//销毁相关的生命周期
```

- `defineProps` 统一使用以下格式：
- 如果只是为了在模板中使用 Props，不要额外写 `const $props = defineProps<Props>()`，直接使用 `defineProps<Props>()` 即可

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

- 变量与变量之间不要换行
- 只会使用一次的值不要单独创建变量，应直接在使用处表达

```ts
//数字
//字符串
//布尔值
//数组
//对象
//优先使用空对象/空数组作为默认值，避免直接写带数据的对象或数组
```

## 通用代码使用

- 实现页面时，可直接复用 `src/components` 或 `src/styles` 下的通用代码
- 页面不必严格按设计图 1:1 还原，优先使用通用组件并保证结构与交互合理
- 图标优先使用 `vue-icons` 库提供的资源
