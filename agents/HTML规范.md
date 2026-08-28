# HTML 规范

## 使用范围

- 本规范适用于 Vue `<template>` 中的页面结构、文本内容、列表和原生 HTML 标签。
- Vue 的 `<template>`、组件标签、`Transition`、`TransitionGroup` 等框架标签不受 `div`、`span` 限制；组件标签继续使用 PascalCase。

## 结构与文本标签

- 布局、分区、标题、段落、说明文字、列表容器和列表项只能使用 `div` 或 `span`。
- 禁止使用 `main`、`header`、`footer`、`nav`、`section`、`article`、`aside`、`address`、`figure`、`figcaption` 等语义化结构标签。
- 禁止使用 `h1` 至 `h6`、`p`、`strong`、`em`、`small`、`blockquote` 等语义化文本标签。
- 禁止使用 `ul`、`ol`、`li`、`dl`、`dt`、`dd`；列表统一使用 `div` 容器和 `div` 列表项。
- 禁止使用 `table`、`thead`、`tbody`、`tfoot`、`tr`、`th`、`td`；表格布局使用 `div` 实现。
- Vue 列表渲染必须提供稳定且唯一的 `key`，不得将 `v-if` 和 `v-for` 放在同一元素上。
- 文本内容使用带 class 的 `span`；需要块级布局时，通过 CSS 设置 `display: block`，不为此更换成语义化标签。

## 功能标签与交互

- 允许使用实现浏览器原生功能所必需的 `input`、`textarea`、`select`、`option`、`button`、`label`、`a`、`img`、`video`、`audio`、`source` 和 `canvas`。
- 存在合适的原生功能标签时，优先使用原生标签，不使用 `div` 或 `span` 模拟输入框、链接、按钮、媒体或画布。
- 只有在原生标签无法满足交互或组件约束时，才允许使用 `div` 或 `span` 作为交互控件；此时必须补充正确的 `role`、`tabindex`、`aria-*` 状态、键盘操作和可见焦点样式。
- 原生功能标签只承担自身功能，不得用于页面布局、分区或普通文本排版。

## 正确示例

```vue
<template>
  <div class="user-panel">
    <span class="title">用户列表</span>
    <div class="user-list">
      <div v-for="user in users" :key="user.id" class="user-item">
        <span class="name">{{ user.name }}</span>
      </div>
    </div>
    <label class="keyword-field">
      <span class="label-text">关键词</span>
      <input v-model="keyword" type="text" />
    </label>
    <button type="button" @click="handleSearch">搜索</button>
  </div>
</template>
```

## 禁止示例

```vue
<template>
  <main>
    <section>
      <h1>用户列表</h1>
      <p>请选择用户</p>
      <ul>
        <li v-for="user in users" :key="user.id">
          <strong>{{ user.name }}</strong>
        </li>
      </ul>
    </section>
  </main>
</template>
```
