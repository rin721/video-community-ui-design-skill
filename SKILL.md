---
name: video-community-ui-design-skill
description: Build soft, lively, media-community UI systems for video-heavy homepages, landing pages, product sections, mobile pages, and component specs. Use when Codex needs a reusable first-party UI design language with tokens, layout grammar, component recipes, interaction states, responsive rules, content rules, prompt templates, validation checklist, and implementation mappings for HTML/CSS, React, Vue, Tailwind, or design specs.
---

# video-community-ui-design-skill

## Skill 描述

该 skill 用于生成轻盈、明快、内容优先的视频社区类界面。输出应具备白色或浅色基底、柔和粉色强调、细粒度图标导航、图片优先卡片、克制玻璃层、低圆角、轻阴影、弹性微动效和高可读的信息密度。

## 适用场景

- 生成视频社区首页、内容发现页、频道页、内容合集页和移动端页面。
- 生成轻量产品官网、内容平台落地页、媒体服务介绍页和社区运营页面。
- 生成 UI design spec、HTML/CSS、React、Vue、Tailwind、组件库说明或响应式布局计划。
- 需要将内容卡片、导航、公告、CTA、筛选、状态反馈和移动导航组织成统一界面。

## 不适用场景

- 需要厚重暗色、强电竞、强金融、强后台管理或大幅营销 hero 的界面。
- 需要复刻特定 logo、专有文案、专有图像、专有图标或特定业务数据的任务。
- 需要复杂三维场景、重插画叙事或沉浸式游戏界面的任务。

## 触发短语

- `Use video-community-ui-design-skill`
- `生成视频社区界面`
- `生成内容平台首页`
- `生成媒体卡片网格`
- `生成移动端视频社区页面`
- `输出该风格的 design tokens`
- `按 video-community-ui-design-skill 做 React 页面`

## 输入参数

- `page_type`: `homepage`、`landing`、`product-section`、`mobile-page`、`component-spec`、`design-tokens`。
- `audience`: 目标用户与使用场景。
- `content_model`: 内容对象、字段、状态和排序方式。
- `brand_overrides`: 可选主色、字体、圆角、密度和动效强度。
- `tech_stack`: 可选 `html-css`、`react`、`vue`、`tailwind`、`figma-prompt`、`spec`。
- `output_mode`: 可选输出形式；未指定时输出结构化 UI design spec，要求完整项目时使用 `frontend-project`。
- `accessibility_level`: 默认 `wcag-aa`。

## 输出形式

- 默认输出结构化 UI design spec。
- 指定技术栈时输出对应实现或组件说明。
- 所有输出必须包含 token 使用、布局规则、组件状态、响应式规则、可访问性要求和质量检查项。

## 文件读取顺序

1. `design-tokens.json`
2. `style-profile.md`
3. `layout-patterns.md`
4. `component-recipes.md`
5. `interaction-rules.md`
6. `responsive-rules.md`
7. `content-rules.md`
8. `adaptation-rules.md`
9. `frontend-project-rules.md`，仅在用户要求完整前端项目时读取。
10. `output-modes.md`
11. `validation-checklist.md`

仅在需要可复用提示词或示例结构时读取 `prompt-templates.md` 与 `examples/`。

## Runtime Procedure

1. 判断用户要生成的页面类型和输出模式。
2. 读取 token 并建立颜色、字体、间距、圆角、阴影、动效、断点和容器约束。
3. 选择布局语法：侧边导航、顶部栏、底部移动导航、内容网格、公告条、CTA 或表单区域。
4. 选择组件配方并绑定 token。
5. 为每个组件补齐 hover、active、focus、disabled、loading、error、empty、success 状态。
6. 为 desktop、tablet、mobile 分别给出重排、字号、间距和触控目标。
7. 套用内容规则，保证标题、元信息、CTA 和提示文案可替换。
8. 按输出模式生成结果。
9. 运行 `validation-checklist.md`。
10. 运行发布态清洁度检查。

## Runtime Decision Tree

- 如果用户只要视觉规范，输出 UI design spec。
- 如果用户指定 HTML/CSS，输出语义化 HTML、CSS variables 和组件 CSS。
- 如果用户指定 React，输出组件拆分、props、状态和 CSS module 或 Tailwind 实现。
- 如果用户指定 Vue，输出单文件组件结构、props、slots、状态和 scoped 样式。
- 如果用户指定 Tailwind，输出 token 到 class 的映射，并保留 CSS variables 作为主题层。
- 如果用户要求完整前端项目，读取 `frontend-project-rules.md`，输出可运行项目结构、入口文件、组件层、样式层、fixtures、状态分支和运行命令。
- 如果用户缺少文案，使用中性占位文案。
- 如果用户缺少图片，使用比例盒、渐变占位、alt 规则和可替换媒体槽。
- 如果用户提供主色，替换 `color.brand.primary` 并重算浅层、悬停、焦点和阴影色。
- 如果移动端内容可能溢出，优先改为单列或横向可滚动的显式轨道，禁止隐藏关键文字。

## 核心设计原则

- 界面以浅色基底为主，强调色用于导航激活、CTA、徽标、进度和关键状态。
- 页面应轻盈、干净、带一点活泼感；装饰只作为细线、斜切、星点、柔和色块或微弱背景层出现。
- 内容卡片必须图片优先，标题与元信息紧跟其后，避免过度包裹。
- 卡片圆角保持小尺度，默认 6px；按钮和徽标可使用 4px；图标按钮使用圆形。
- 大面积阴影应克制，默认只在悬停、弹层、toast 和浮层中出现。
- 动效以 0.2s 到 0.6s 为主，允许轻弹性，但不得干扰阅读或键盘操作。
- 图片、标题、作者、计数、时长、日期等元信息应形成稳定扫描节奏。
- 桌面端允许固定侧边栏；移动端使用顶部轻 app bar 与底部主导航。

## 设计维度

- Aesthetic Style: 从色彩、字体、圆角、留白、图像、图标和装饰语气建立轻盈社区感。
- Visual Framework: 从 app shell、导航轨道、内容容器、section 节奏和媒体网格建立页面骨架。
- Design System: 从 semantic tokens、组件变体、状态矩阵、响应式断点和可访问性约束建立统一系统。
- Component Derivation: 从基础控件派生导航、卡片、公告、筛选、表单、弹层、反馈、媒体和商业化模块。
- Interaction and Motion: 从 hover、active、focus、loading、scroll、drawer、toast 和 reduced motion 建立交互规则。
- Brand Expression: 通过柔和主色、轻装饰、短文本、图标节奏和内容优先框架表达亲和、清爽和创作者社区气质。

## Design Token 使用规则

- 使用 `design-tokens.json` 中的语义 token，不直接散落硬编码颜色和间距。
- 主色可替换，但必须同步替换 hover、pressed、focus、ripple、shadow 和 selection。
- 文字色、图标色、分割线和表面色必须满足对比度要求。
- 断点优先使用 `breakpoint.mobile.max`、`breakpoint.tablet.max`、`breakpoint.desktop.min`。
- 组件尺寸使用 `size.nav.rail`、`size.nav.mobileBar`、`size.touch.min`、`container.content.max`。

## 组件生成规则

- Button、Navigation、Hero、Section、Card、Feature List、Tag、Form、Modal、Footer、CTA、Testimonial、Stats、Media Block、Pricing Block 都必须从 `component-recipes.md` 读取对应配方。
- 每个组件必须声明用途、结构、token、状态、响应式、可访问性和禁用项。
- 图标按钮必须有 aria-label 或可见文本。
- 图片组件必须有 alt 策略、比例约束和加载失败状态。
- 列表与网格必须具备空状态、加载状态和错误状态。

## 响应式规则

- desktop: 保留左侧窄轨导航或顶部横向导航，内容容器最大 1280px，卡片网格自动填充。
- tablet: 减少左右 padding，保留 2 到 3 列内容卡片，公告和 CTA 变为紧凑布局。
- mobile: 顶部栏高度 56px，底部导航高度 56px，主要内容避免横向溢出，卡片默认 1 到 2 列。
- 横屏移动端应优先减少垂直留白，并保留 44px 以上触控目标。

## 交互规则

- hover: 标题或图标变为主色，卡片可上移 4px 到 6px。
- active: 可按压元素缩放到 0.97 左右，并去除多余阴影。
- focus: 使用明显 focus ring，颜色来自 `color.focus.ring`。
- loading: 使用细进度条、骨架块或按钮内进度，不阻塞全页阅读。
- disabled: 降低对比和指针操作，但仍保留语义状态。
- reduced motion: 关闭弹性位移、循环装饰和非必要进度动画。

## 内容规则

- 标题短而明确，优先服务扫描。
- 卡片标题最多两行，元信息使用小字号、图标和固定顺序。
- CTA 文案控制在 2 到 8 个汉字或 2 到 4 个英文词。
- 空状态文案保持温和，给出下一步动作。
- 错误状态说明原因与可执行恢复动作。

## 技术栈映射

- CSS variables: 直接使用 `--color-brand-primary`、`--spacing-card-gap` 等变量。
- Tailwind: 将 token 映射进 theme，并保留少量自定义 utilities。
- React: 将卡片、导航、公告、状态反馈拆成可组合组件。
- Vue: 使用 props、slots 和 scoped CSS 表达组件变体。
- Plain HTML/CSS: 使用语义标签、BEM 或 data-variant 属性承载状态。
- Full frontend project: 使用 `frontend-project-rules.md` 生成可运行目录、入口、组件、样式、数据、状态和 README。

## 适配与替换规则

- 主色、字体、圆角、密度、阴影和动效强度可替换。
- 内容卡片的信息顺序、触控尺寸、focus 可见性和响应式断点不建议替换。
- 风格替换后必须重新验证对比度、状态可见性、长文本折行和移动端触控目标。

## 禁止事项

- 禁止使用特定 logo、专有图片、专有图标、专有文案或真实业务数据。
- 禁止生成固定不可替换的页面顺序。
- 禁止让颜色成为唯一信息载体。
- 禁止在移动端隐藏主要 CTA、标题、错误信息或表单 label。
- 禁止使用大面积重阴影、过度渐变、过圆卡片或厚重暗色背景破坏轻盈感。
- 禁止输出无法脱离上下文独立使用的说明。

## 示例调用

```text
Use video-community-ui-design-skill to create a mobile-first video community homepage in React. Include design tokens, card grid, announcement banner, bottom navigation, loading and empty states, and WCAG AA notes.
```

```text
使用 video-community-ui-design-skill 生成一个内容平台 landing page，输出 HTML/CSS，包含 hero、内容卡片、功能区、CTA、页脚和移动端规则。
```

## 质量检查

输出前必须确认：

- 已使用语义 token。
- 已覆盖主要组件状态。
- 已覆盖 desktop、tablet、mobile。
- 已提供可访问性规则。
- 已避免专有资产和真实业务数据。
- 已避免横向溢出、遮挡、文字截断失控和不可点击小目标。
- 已通过发布态清洁度检查。

## 发布态清洁度检查

- 文件名、目录名、frontmatter、JSON 字符串、Markdown 正文和示例都只保留第一方规则。
- 不包含任何特定域、特定品牌、特定页面、特定资产或特定业务实体。
- 不包含工作过程、取样过程、形成过程或关系性说明。
- 不包含不可授权图片、图标、文案或数据。
