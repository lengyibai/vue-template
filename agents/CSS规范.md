# CSS 规范

## 基础样式

- 字重不写精确数值；需要粗体时统一使用 `font-weight: bold`。
- `margin`、`padding`、`gap` 等间隔值必须使用项目的 `--gap`、`--gap-2` 至 `--gap-10` 变量，选择与设计尺寸对应的级别。
- `border-radius` 必须使用项目的 `--radius`、`--radius-2` 至 `--radius-10` 变量。
- CSS 变量只使用一次时直接写具体值，不额外创建变量；具有主题、复用或统一调整价值时才定义变量。
- 不自行添加 `letter-spacing`、`line-height`、`white-space`；确有截断、排版或设计稿要求时可以使用，并确保理由能从业务或视觉需求中判断。
- 已有 `line-height`、`white-space` 等样式若承担明确布局或交互作用，不得为了机械符合规范而删除。
- CSS 属性顺序遵循项目 Stylelint 配置：定位与布局、盒模型、文字、背景、过渡与动画、其他视觉属性。

## 命名与选择器

- 类名、动画名和自定义属性名称使用 kebab-case，不新增 snake_case 或大小写混合命名。
- 子类名保持简洁、独立，不使用父类名拼接 `__` 的冗长 BEM 命名。
- 独立类名可能与其他区域冲突时，通过父级作用域和 `>` 直接子选择器限定，不通过不断加长类名规避冲突。
- 避免无必要的深层后代选择器；选择器应准确匹配当前 DOM 层级，不污染嵌套组件。
- `!important` 只用于覆盖无法通过合理作用域或层级解决的外部样式，并应保留现有必要覆盖，不主动扩散使用。

## Less 嵌套

- Less 层次严格按照 DOM 的祖父、父、子结构逐层嵌套，不将子节点样式脱离其业务父级单独书写。
- 伪类、状态类、媒体查询和局部关键帧放在所属选择器附近。
- 嵌套层级与 DOM 不一致或已经跨组件时，应收窄选择器或调整组件边界，而不是继续增加后代层级。

```less
.dialog {
  display: flex;
  gap: var(--gap-4);
  padding: var(--gap-4);
  border-radius: var(--radius-2);

  > .title {
    font-weight: bold;
  }

  > .content {
    flex: 1;
  }
}
```

## 动画

- 动画优先使用 `animation` 缩写，例如 `animation: download-pulse 1.2s ease-in-out infinite`，不拆成多个 `animation-*` 属性。
- `@keyframes` 名称使用 kebab-case。
- `@keyframes` 不写在 Less 文件顶层，放在使用它的选择器作用域内，就近维护。
- 动画优先修改 `transform` 和 `opacity`，避免频繁动画化会触发布局计算的宽高、边距或定位属性。
- 状态切换只需要简单过渡时使用 `transition`，不为一次性变化创建多余关键帧。

```less
.download-icon {
  animation: download-pulse 1.2s ease-in-out infinite;

  @keyframes download-pulse {
    0%,
    100% {
      transform: scale(1);
      opacity: 1;
    }

    50% {
      transform: scale(0.92);
      opacity: 0.75;
    }
  }
}
```
