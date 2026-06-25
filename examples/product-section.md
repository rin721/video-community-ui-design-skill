# Product Section Example

## 输入需求

- 页面类型：product-section
- 目标：生成一个可嵌入页面的产品介绍区
- 输出形式：HTML/CSS
- 技术栈：HTML/CSS

## 使用到的 Skill 规则

- `component-recipes.md`: Section、Media Block、Feature List、CTA。
- `design-tokens.json`: 颜色、间距、圆角、媒体比例。
- `responsive-rules.md`: 双列到单列重排。
- `content-rules.md`: 说明文字和 CTA 文案长度。

## 生成策略

产品介绍区使用左文右媒或上文下媒结构。标题保持短句，说明控制在两行左右，功能点使用图标与短文本。媒体槽使用稳定比例盒，避免加载跳动。

## 结构草案

```text
section.product-section
  div.copy
    p.eyebrow
    h2
    p.description
    ul.feature-list
    div.actions
  figure.media-block
```

## Token 使用说明

- Section padding: `spacing.8`。
- 媒体圆角: `radius.card.default`。
- 媒体比例: `grid.media.aspect`。
- 主操作: `color.brand.primary`。
- 说明文字: `color.text.secondary`。

## 响应式说明

- desktop: 两列，媒体宽度 45% 到 55%。
- tablet: 两列可保留，减少 gap。
- mobile: 文案在上，媒体在下，按钮全宽或上下排列。

## 可访问性说明

- 媒体有 alt。
- 功能列表使用 `ul/li`。
- CTA 使用按钮或明确链接。
- focus-visible 不被裁切。

## 质量检查要点

- 检查标题和说明是否不过长。
- 检查媒体槽是否有稳定尺寸。
- 检查移动端按钮是否不小于 44px。
