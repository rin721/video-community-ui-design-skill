# Output Modes

## 默认输出

若用户未指定技术栈，默认输出 `UI design spec`。规格必须包含美学风格、视觉框架、design tokens、组件配方、交互状态、响应式规则、内容规则、可访问性要求和质量检查。

## UI Design Spec

输出内容：

- 页面目标和受众。
- 装饰 masthead、分类 tabs、公告和媒体流的布局规则。
- token 使用表。
- 组件清单和状态矩阵。
- desktop、tablet、mobile 规则。
- 可访问性和清洁度检查。

## HTML / CSS

输出内容：

- 语义 HTML。
- CSS variables token 层。
- masthead、rail、tabs、announcement、media grid、state、toast、footer 样式。
- `prefers-reduced-motion`。
- `focus-visible`。

## React

输出内容：

- 默认使用真实 MUI library composition，除非用户明确要求 plain React。
- 组件拆分：AppShell、Navigation、DecorativeMasthead、CategoryTabs、AnnouncementBar、MediaFeedSection、MediaCard、StateBlock、Toast、CTA、Footer。
- props 和 state 类型。
- fixtures。
- CSS variables token layer 和 MUI theme layer。
- `ThemeProvider`、`createTheme({ cssVariables: true })`、component slots、variants、state props、`ownerState`/`sx` 边界。
- MUI primitives 映射：`Drawer`/`AppBar`/`Tabs`/`Alert`/`Card`/`Snackbar`/`BottomNavigation`。
- loading、empty、error、success 分支。

## React MUI / MUI Frontend Project

输出内容：

- `tech_stack: react-mui` 或 `output_mode: mui-frontend-project`。
- 依赖：`@mui/material`、`@emotion/react`、`@emotion/styled`；仅在确实需要图标库时加入 `@mui/icons-material`。
- `src/theme.ts` 使用 `createTheme({ cssVariables: true })`，并由 `ThemeProvider` 包裹应用。
- 页面从 MUI primitive、slots、variants、states 和 token-backed `sx` 组装，不直接手写替代已有 MUI 组件的 DOM/CSS。
- 核心映射：`SidebarRail -> Drawer/Box/IconButton`，`TopBar -> AppBar/Toolbar`，`CategoryTabs -> Tabs/Tab`，`AnnouncementBar -> Alert/Paper/Stack`，`MediaCard -> Card/CardActionArea/CardMedia/CardContent`，`Toast -> Snackbar/Alert`，`BottomNav -> BottomNavigation`。
- 禁止把静态 HTML/CSS 视觉近似称为 MUI 实现；只要用户要求 MUI 或通用组件库，就走本模式。

## Vue

输出内容：

- SFC 组件结构。
- props、slots、emits。
- scoped style 和 token variables。
- 状态分支和响应式规则。

## Tailwind

输出内容：

- theme token 映射。
- 自定义 utilities：masthead、rail、decorative-stripe、media-card、glass。
- 组件 class 组合。
- 保留 CSS variables 作为主题层。

## Figma Prompt

输出内容：

- 画面尺寸和断点。
- 浅底樱粉色彩。
- `size.nav.rail` rail、masthead、斜向色带、星形/十字/三角装饰。
- 分类 tabs、公告信息条、16:9 媒体卡片网格。
- 状态页几何表达。

## Wireframe Outline

输出内容：

- 框架层级。
- 模块顺序。
- 网格和容器。
- 响应式重排。
- 交互状态清单。

## Component Library Spec

输出内容：

- 组件派生层级。
- 每个组件的用途、结构、token、状态、响应式、可访问性和禁用项。
- 状态矩阵。
- 设计 token 对照。

## Landing Page Structure

输出内容：

- 紧凑 hero 或 masthead。
- 功能区。
- 媒体展示。
- CTA。
- 页脚。
- 仍需保留轻装饰和内容优先气质。

## Responsive Layout Plan

输出内容：

- desktop、tablet、mobile 的导航切换。
- masthead 高度变化。
- 卡片列数。
- 字号、间距和触控目标。
- 长文本折行策略。

## Frontend Project

React 完整项目使用 `assets/frontend-template/`，默认输出 MUI frontend project。

静态完整项目使用 `assets/static-template/`，仅作为 zero-dependency generic fallback；不得声称实现 MUI 或 Material UI 组件体系。

完整项目必须包含：

- 入口文件。
- 页面级组件。
- 组件层。
- 样式层。
- fixtures。
- normal、loading、empty、error、success/toast 状态。
- README 或运行说明。
- 构建或打开方式。

默认完整项目为 React + TypeScript + Vite + Material UI + CSS variables；用户明确要求 plain React 时才改为 React + CSS variables。
