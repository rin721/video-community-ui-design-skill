---
name: video-community-ui-design-skill
description: Build high-recognition, soft-pink, media-community UI systems with decorative mastheads, rail navigation, category tabs, announcement bars, media feed grids, mobile top and bottom navigation, complete interaction states, responsive rules, and frontend project templates. Use actual MUI libraries for React MUI output, and use dependency-free static HTML only as a generic fallback, not as MUI imitation.
---

# video-community-ui-design-skill

## Skill 描述

该 skill 用于生成轻盈、明快、内容优先且带强识别度的视频社区界面。输出应使用浅色基底、樱粉强调、`size.nav.rail` 固定窄轨、中心字标式装饰区、斜向色带、星形/十字/三角几何、分类横栏、公告信息条、`grid.media.aspect` 媒体卡片、移动顶部栏与底部导航。涉及视频详情或播放器组件时，必须补齐白底播放器舞台、粉色几何占位、细进度条、紧凑控制条、弹幕 overlay 和移动端播放器 tabs。

## 适用场景

- 生成视频社区首页、内容发现页、频道页、合集页、创作者内容页、视频详情页、播放器组件和移动端浏览页。
- 生成具备媒体流、分类导航、公告、状态反馈、CTA 和轻品牌表达的产品页面。
- 输出 UI design spec、HTML/CSS、React、React MUI、Vue、Tailwind、组件库说明、Figma prompt 或完整前端项目。
- 需要把审美风格、视觉框架、设计系统、组件派生、交互动效和品牌表达统一成可执行规则。

## 不适用场景

- 厚重暗色后台、强金融、强电竞、强企业销售页或大幅沉浸摄影页。
- 需要复制特定 logo、专有文案、专有图片、专有图标、真实人物或真实业务数据的任务。
- 需要复杂 3D 场景、重插画叙事或游戏主界面的任务。

## 触发短语

- `Use video-community-ui-design-skill`
- `生成视频社区界面`
- `生成内容发现首页`
- `生成媒体卡片网格`
- `生成移动端视频社区页面`
- `生成视频播放器组件`
- `生成视频详情播放器`
- `蒸馏播放器 UI`
- `输出该风格的 design tokens`
- `按 video-community-ui-design-skill 做 React 项目`

## 输入参数

- `page_type`: `homepage`、`discovery`、`video-detail`、`player-component`、`landing`、`product-section`、`mobile-page`、`component-spec`、`design-tokens`。
- `audience`: 用户群体与使用场景。
- `content_model`: 内容对象、字段、状态、分类、排序和元信息。
- `brand_overrides`: 可选主色、字体、圆角、密度、装饰强度和动效强度。
- `tech_stack`: 可选 `html-css`、`react`、`react-mui`、`vue`、`tailwind`、`figma-prompt`、`spec`。
- `output_mode`: 未指定时输出结构化 UI design spec；要求完整项目时使用 `frontend-project`；要求 MUI React 项目时使用 `mui-frontend-project`。
- `accessibility_level`: 默认 `wcag-aa`。

## 输出形式

- 默认输出结构化 UI design spec。
- 指定技术栈时输出对应实现、项目文件、组件说明或样式映射。
- 所有输出必须包含 token 使用、布局语法、组件状态、响应式规则、可访问性要求和质量检查项。

## 文件读取顺序

普通设计任务按下列顺序读取：

1. `design-tokens.json`
2. `style-profile.md`
3. `layout-patterns.md`
4. `component-recipes.md`
5. `interaction-rules.md`
6. `responsive-rules.md`
7. `content-rules.md`
8. `adaptation-rules.md`
9. `output-modes.md`
10. `validation-checklist.md`

需要提示词或示例结构时读取 `prompt-templates.md` 与 `examples/`。需要完整前端项目时读取 `frontend-project-rules.md`，再使用 `assets/frontend-template/` 或 `assets/static-template/`。

## 模板资产读取规则

- React、TypeScript、Vite 项目使用 `assets/frontend-template/`，默认走真实 MUI library composition，并按用户需求替换 fixtures、token、页面文案和组件组合。
- 零依赖或静态交付使用 `assets/static-template/`，保留语义 HTML、CSS variables、轻量 JavaScript 状态分支和直接打开说明。
- 模板资产是可复制起点；生成结果仍必须满足 `validation-checklist.md`。

## 验证命令

更新该 skill 后运行：

```bash
python -X utf8 "$env:USERPROFILE\.codex\skills\.system\skill-creator\scripts\quick_validate.py" .
python -X utf8 scripts\validate_skill_package.py .
git diff --check
```

## Runtime Procedure

1. 判断页面类型、输出模式、技术栈和内容模型。
2. 读取 token，建立颜色、字体、间距、圆角、阴影、动效、断点、容器和装饰约束。
3. 选择视觉框架：固定窄轨、移动顶部栏、移动底栏、装饰 masthead、分类 tabs、公告信息条、媒体流、视频播放器舞台和状态区。
4. 选择组件配方并绑定 token；若用户提供外部播放器或视频页参考，先产出 distillation doc，再实现页面或 demo。
5. 为每个组件补齐 hover、active、focus、disabled、loading、error、empty、success 状态。
6. 为 desktop、tablet、mobile 分别给出重排、字号、间距、触控目标和溢出控制。
7. 套用内容规则，保证标题、元信息、CTA、公告和状态文案中性可替换。
8. 按输出模式生成设计说明或代码。
9. 完整项目必须使用对应 `assets/*-template/` 并保留入口、样式、fixtures、状态和运行说明。
10. 运行 `validation-checklist.md` 与发布清洁度检查。

## Runtime Decision Tree

- 如果用户只要视觉规范，输出 UI design spec。
- 如果用户指定 HTML/CSS，输出语义 HTML、CSS variables 和组件 CSS。
- 如果用户指定 React 且未要求 plain React，输出真实 `@mui/material` component composition、props、状态、theme token 和 `sx` 边界。
- 如果用户指定 `tech_stack: react-mui` 或 `output_mode: mui-frontend-project`，使用真实 MUI primitives、`ThemeProvider`、`createTheme({ cssVariables: true })` 和 token-backed `sx`。
- 如果用户明确要求 plain React，输出组件拆分、props、状态和 CSS variables 实现，但仍遵守同一组件 slots 和状态结构。
- 如果用户指定 Vue，输出单文件组件结构、props、slots、状态和 scoped 样式。
- 如果用户指定 Tailwind，输出 token 到 utility 的映射，并保留 CSS variables 主题层。
- 如果用户要求完整前端项目，读取 `frontend-project-rules.md` 并使用对应模板资产。
- 如果用户要求视频播放器或视频详情页，必须使用 `VideoPlayerStage`、`PlayerControlBar`、`PlayerProgressRail`、`PlayerDanmakuOverlay` 和 `MobilePlayerTabs` 的组件配方。
- 如果用户缺少文案，使用中性占位文案。
- 如果用户缺少图片，使用比例盒、渐变占位、alt 规则和可替换媒体槽。
- 如果用户提供主色，替换 `color.brand.primary` 并同步浅层、hover、pressed、focus、ripple、shadow 和装饰色。
- 如果移动端内容可能溢出，优先改为单列、两列或明确横向轨道，禁止隐藏关键文字。

## 核心设计原则

- 页面以白色或近白色为主，樱粉只承担导航激活、装饰、链接、徽标、进度和关键状态。
- 首屏必须先建立品牌气质：顶部装饰 masthead、字标式标题、斜向色带和几何点阵应组成轻量舞台。
- 主体必须快速进入内容浏览：分类 tabs、公告信息条和媒体流应在首屏可见。
- 桌面端使用 `size.nav.rail` 固定窄轨制造稳定边界；移动端使用 `size.nav.mobileBar` 顶部栏和底部导航。
- 媒体卡片保持 16:9 封面、两行标题、作者、计数、时长和日期的稳定扫描顺序。
- 圆角保持小尺度：badge 使用 `radius.badge.default`，卡片/弹层/公告使用 `radius.card.default`，图标按钮使用圆形控制圆角 token。
- 阴影只用于导航柔光、Paper 表面、浮层、toast 和焦点；首页媒体链接卡默认保持平面，禁止厚重卡片化。
- 动效以 `motion.duration.instant`、`motion.duration.fast`、`motion.duration.medium` 和 `motion.duration.loading` 为主要节奏，允许轻弹性进入，但必须支持 reduced motion。

## 设计维度

- Aesthetic Style: 浅底、樱粉、低圆角、轻阴影、几何装饰、媒体优先、轻二次元社区感。
- Visual Framework: 固定窄轨、装饰 masthead、分类 tabs、公告信息条、内容容器、媒体网格和状态层。
- Design System: semantic tokens、装饰 tokens、组件变体、状态矩阵、响应式断点和可访问性约束。
- Component Derivation: 从 primitive 派生 BrandHeader、DecorativeMasthead、SidebarRail、CategoryTabs、AnnouncementBar、MediaFeedSection、MediaCard、VideoPlayerStage、PlayerControlBar、PlayerProgressRail、PlayerDanmakuOverlay、MobilePlayerTabs、BottomNav、Offcanvas、Toast、Tooltip 和 GeometricState。
- Interaction and Motion: hover、active、focus、loading、scroll、drawer、toast、tab active、nav indicator、jump-in 和 reduced motion。
- Brand Expression: 通过字标节奏、斜向色带、星点几何、粉色柔光、图标化导航和内容优先框架表达友好、明亮、年轻和创作者社区气质。

## Design Token 使用规则

- 使用 `design-tokens.json` 中的语义 token，不散落硬编码颜色、间距和断点。
- Token Binding Rule: 除 `design-tokens.json` 的 `value` / `fallback` 和由它映射出的 `tokens.css` / CSS variable 层外，生成代码不得把颜色、尺寸、圆角、阴影、断点、z-index 或 motion 值写成裸 `px`、`rgb()`、`#hex`、具体阴影或具体 easing。
- 文档中出现的具体数值只能作为 token 默认实现值的说明；组件、布局、prompt 和模板必须优先引用 token 名称或对应 CSS variables。
- 主色可替换，但必须同步更新 hover、pressed、soft、focus、shadow、ripple、decorative 和 selection。
- 装饰图形必须使用 `decoration.*`、`opacity.decorative.*`、`motion.*` 和 `layout.masthead.*`。
- 固定导航使用 `size.nav.rail`、`size.nav.mobileBar`、`shadow.nav.glow` 和 `zIndex.nav`。
- 媒体流使用 `grid.media.aspect`、`grid.feed.min`、`grid.feed.gap` 和 `container.content.max`。

## 组件生成规则

- Button、Navigation、Hero、Section、Card、Feature List、Tag、Form、Modal、Footer、CTA、Testimonial、Stats、Media Block、Pricing Block 都必须读取对应配方。
- BrandHeader、DecorativeMasthead、SidebarRail、CategoryTabs、AnnouncementBar、MediaFeedSection、MediaCard、VideoPlayerStage、PlayerControlBar、PlayerProgressRail、PlayerDanmakuOverlay、MobilePlayerTabs、BottomNav、Offcanvas、Toast、Tooltip、GeometricEmptyState 和 GeometricErrorState 是高识别界面的核心组件。
- MUI Component Encapsulation Rule: 只要输出声称是 MUI 或 `react-mui`，就必须使用真实 MUI 依赖与 primitive 组装页面，不得用 ad hoc DOM/CSS 重写 Drawer、AppBar、Tabs、Alert、Card、Snackbar、BottomNavigation 等已有语义组件。
- MUI 输出必须通过 theme tokens、component slots、variants、states、`ownerState`、`slotProps` 或 `sx` 边界表达差异；局部 CSS 只能承载 token layer、全局 reset、必要动画名和非组件级布局补丁。
- 静态 HTML/CSS 输出保持零依赖，只能作为 generic static fallback；不得声称实现 MUI 或 Material UI 组件体系，只保留语义 HTML、CSS token、状态反馈和可访问性。
- 每个组件必须声明用途、结构、token、状态、响应式、可访问性和禁用项。
- 图标按钮必须有 aria-label 或可见文本。
- 图片组件必须有 alt 策略、比例约束、加载失败状态和占位策略。
- 列表与网格必须具备 loading、empty、error 和 success/toast 分支。

## 响应式规则

- desktop: 固定左侧 `size.nav.rail` 窄轨，内容容器使用 `container.content.max`，masthead 使用 `layout.masthead.height`，媒体网格自动填充。
- tablet: 保留窄轨或压缩横向空间，卡片 2 到 3 列，masthead 装饰减少透明度和高度。
- mobile: 顶部栏和底部导航使用 `size.nav.mobileBar`，内容容器使用 `container.content.paddingMobile`，卡片 1 到 2 列，公告和 tabs 不得造成横向溢出。
- 横屏移动端减少 masthead 高度并保留不低于 `size.touch.min` 的触控目标。

## 交互规则

- hover: 标题或图标变主色；首页媒体卡只让封面槽微缩放/变亮，不整体上浮；Paper/CTA 卡片可使用 `motion.transform.cardHover`；窄轨入口显示柔和背景。
- active: 可按压元素缩放到 0.97 左右或使用短 ripple，侧轨设置图标可轻旋转。
- focus: 使用明显 focus ring，颜色来自 `color.focus.ring`。
- loading: 使用页面顶部细进度、按钮底部进度、媒体骨架或状态块，不阻塞全页阅读。
- disabled: 降低对比和指针操作，但保留语义状态。
- reduced motion: 关闭弹性位移、循环装饰、旋转和非必要进度动画。

## 内容规则

- 标题短而明确，优先服务扫描。
- 分类 tabs 使用 2 到 6 个字或 1 到 2 个英文词。
- 公告正文保持一到两句，链接清晰但不抢主内容。
- 卡片标题最多两行，元信息使用小字号、图标或短标签和固定顺序。
- CTA 文案控制在 2 到 8 个汉字或 2 到 4 个英文词。
- 空状态文案温和，给出下一步动作；错误状态说明原因与恢复动作。

## 技术栈映射

- CSS variables: 直接使用 `--color-brand-primary`、`--layout-masthead-height`、`--grid-feed-min` 等变量。
- Tailwind: 将 token 映射进 theme，并保留少量自定义 utilities 表达 masthead、rail 和 decoration。
- React: 默认使用真实 MUI library composition；只有用户明确要求 plain React 时才使用普通 JSX + CSS variables。
- React MUI: 使用 `@mui/material`、`@emotion/react`、`@emotion/styled`、`ThemeProvider`、`createTheme({ cssVariables: true })`、MUI primitives、slots、variants、state props、`ownerState` 和 token-backed `sx`。
- Vue: 使用 props、slots 和 scoped CSS 表达组件变体。
- Plain HTML/CSS: 使用语义标签、BEM 或 data-state/data-variant 承载状态。
- Full frontend project: 使用 `frontend-project-rules.md` 生成可运行目录、入口、组件、样式、数据、状态和 README。

## 适配与替换规则

- 主色、字体、圆角、密度、阴影、装饰强度和动效强度可替换。
- 侧轨宽度、移动栏高度、媒体比例、卡片元信息顺序、focus 可见性和断点不建议替换。
- 风格替换后必须重新验证对比度、状态可见性、长文本折行、移动触控目标、masthead 不遮挡内容和媒体网格稳定性。

## 禁止事项

- 禁止使用特定 logo、专有图片、专有图标、专有文案或真实业务数据。
- 禁止生成固定不可替换的页面顺序。
- 禁止让颜色成为唯一信息载体。
- 禁止在移动端隐藏主要标题、错误信息、表单 label、导航名称或恢复动作。
- 禁止使用大面积重阴影、过度渐变、过圆卡片、厚重暗色背景或营销式大 hero。
- 禁止输出无法独立使用的说明。

## 示例调用

```text
Use video-community-ui-design-skill to create a mobile-first media community homepage in React. Include decorative masthead, rail navigation, category tabs, announcement bar, media feed cards, loading and empty states, and WCAG AA notes.
```

```text
使用 video-community-ui-design-skill 生成一个内容发现首页，输出 HTML/CSS，包含装饰 masthead、分类导航、公告、媒体卡片流、CTA、页脚和移动端规则。
```

## 质量检查

输出前必须确认：

- 已使用语义 token 和装饰 token。
- 已覆盖主要组件状态。
- 已覆盖 desktop、tablet、mobile。
- 已提供可访问性规则。
- 已避免专有资产和真实业务数据。
- 已避免横向溢出、遮挡、文字截断失控和不可点击小目标。
- 已通过发布清洁度检查。

## 发布清洁度检查

- 文件名、目录名、frontmatter、JSON 字符串、Markdown 正文和示例都只保留第一方规则。
- 不包含特定域、特定品牌、特定页面、特定资产或特定业务实体。
- 不包含工作过程、取样过程、形成过程或关系性说明。
- 不包含不可授权图片、图标、文案或数据。
