# Output Modes

## 默认输出模式

用户未指定技术栈时，默认输出 `UI design spec`。该模式包含设计语言、token、布局、组件、交互、响应式、内容和可访问性规则。

## UI Design Spec

- 输出页面目标。
- 输出信息架构。
- 输出布局结构。
- 输出 design token 映射。
- 输出组件配方。
- 输出交互状态。
- 输出响应式规则。
- 输出可访问性与质量检查。

## HTML / CSS

- 输出语义 HTML。
- 输出 CSS variables。
- 输出组件 class。
- 输出 media queries。
- 输出 focus-visible 与 reduced motion。
- 不依赖框架运行。

## React

- 输出组件拆分。
- 输出 props 与状态模型。
- 输出 CSS module、普通 CSS 或 Tailwind。
- 输出可访问性属性。
- 输出 loading、empty、error、success 分支。

## Vue

- 输出 SFC 结构。
- 输出 props、computed、slots。
- 输出 scoped CSS 与 CSS variables。
- 输出响应式和状态分支。
- 输出键盘与触控规则。

## Tailwind

- 输出 token 到 theme 的映射。
- 使用 class 组织布局。
- 对复杂 token 使用 CSS variables。
- 保留 focus、motion 和 reduced motion。

## Figma Prompt

- 输出画板尺寸。
- 输出布局结构。
- 输出 token。
- 输出组件状态。
- 输出响应式变体。
- 输出命名规范。

## Wireframe Outline

- 输出低保真结构。
- 保留模块顺序和信息优先级。
- 不输出具体视觉细节。
- 适合需求早期确认。

## Component Library Spec

- 输出组件列表。
- 每个组件包含 anatomy、variants、states、tokens、accessibility、responsive、implementation notes。
- 适合建立设计系统或前端组件库。

## Landing Page Structure

- 输出 hero、价值说明、媒体展示、功能列表、CTA、页脚。
- 保留轻盈内容平台气质。
- 不使用过大营销卡片堆叠。

## Responsive Layout Plan

- 输出 desktop、tablet、mobile 三套布局。
- 明确导航切换、卡片列数、字号、间距和触控目标。
- 明确横屏移动端和长文本策略。

## Frontend Project

- 输出可运行项目目录。
- 输出 `package.json`、`index.html`、应用入口、页面、组件、样式、fixtures 和 README。
- React 默认使用 TypeScript、Vite 和 CSS variables。
- Vue 使用 SFC、TypeScript、Vite 和 scoped style。
- HTML/CSS 使用静态目录、`styles/`、`scripts/` 和 `data/`。
- 必须包含 AppShell、Navigation、Announcement、SearchFilter、CardGrid、MediaCard、CTA、Footer 和状态组件。
- 必须包含 loading、empty、error、success、focus、disabled、active、hover。
- 必须给出运行命令和构建检查。
