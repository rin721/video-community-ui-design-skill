# Frontend Project Rules

## 完整项目前提

完整前端项目必须能独立运行、构建和检查。不得只输出单个组件、单页片段或没有入口的样式说明。项目必须包含入口文件、页面结构、组件层、样式层、数据占位、状态分支、响应式规则和运行说明。

## 默认项目策略

- 用户指定技术栈时，按指定技术栈生成。
- 用户要求完整项目但未指定技术栈时，默认使用 React、TypeScript、Vite、Material UI 和 CSS variables。
- React、TypeScript、Vite 项目使用 `assets/frontend-template/`。
- React 完整项目默认使用真实 MUI library composition；只有用户明确要求 plain React 时，才移除 MUI 依赖并输出普通 React 组件。
- 用户要求零依赖或静态交付时，使用 HTML、CSS 和少量原生 JavaScript。
- 零依赖或静态交付使用 `assets/static-template/`。
- Vue 项目使用 Vue SFC、TypeScript、Vite 和 scoped style。
- Tailwind 项目保留 CSS variables 作为主题层，并在 utility class 中调用。

## 必备交付物

完整项目必须包含：

- `package.json` 或静态项目运行说明。
- `index.html`。
- 应用入口文件。
- 页面级组件。
- 导航组件。
- masthead 组件。
- 分类 tabs 组件。
- 公告组件。
- 媒体流组件。
- 视频详情或播放器组件。
- 状态组件。
- 样式入口。
- token 到 CSS variables 的映射。
- MUI theme token layer。
- mock 数据或 fixtures。
- 可访问性属性。
- 响应式断点。
- reduced motion。
- README 或运行说明。

## React 项目结构

```text
/
├── package.json
├── index.html
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── theme.ts
│   ├── data/
│   │   └── fixtures.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   └── app.css
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── Navigation.tsx
│   │   ├── BrandHeader.tsx
│   │   ├── DecorativeMasthead.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── Announcement.tsx
│   │   ├── MediaFeedSection.tsx
│   │   ├── MediaCard.tsx
│   │   ├── Button.tsx
│   │   ├── CTA.tsx
│   │   ├── Footer.tsx
│   │   ├── StateBlock.tsx
│   │   └── Toast.tsx
│   └── pages/
│       └── HomePage.tsx
└── README.md
```

## Static HTML/CSS 项目结构

```text
/
├── index.html
├── styles/
│   ├── tokens.css
│   ├── base.css
│   └── app.css
├── scripts/
│   └── app.js
├── data/
│   └── fixtures.json
└── README.md
```

## 页面级组成

完整项目默认包含：

- AppShell
- TopBar
- SidebarRail
- BottomNav
- BrandHeader
- DecorativeMasthead
- CategoryTabs
- AnnouncementBar
- MediaFeedSection
- MediaCard
- VideoPlayerStage
- PlayerControlBar
- PlayerProgressRail
- PlayerDanmakuOverlay
- MobilePlayerTabs
- CTA
- Footer
- Toast
- EmptyState
- ErrorState
- LoadingState

根据页面类型可增加 FeatureList、Stats、PricingBlock、Modal、Drawer、Tooltip、Form。

## 样式系统要求

- `tokens.css` 必须由 `design-tokens.json` 映射而来。
- `theme.ts` 必须使用 MUI `createTheme({ cssVariables: true })`，并把 skill token 默认值映射到 palette、typography、shape、spacing 和 component overrides。
- `base.css` 设置 box sizing、字体、颜色、focus、reduced motion 和基础语义元素。
- `app.css` 只写 token layer 之外的全局补丁、动画名和非组件级布局；组件样式优先写在 MUI `sx`、`slotProps`、variant 或 theme override 中。
- 组件样式必须使用 token 变量或 MUI theme variables。
- 不得在组件中散落无语义颜色、断点、圆角和阴影。
- Masthead、rail、tabs、announcement、media grid、state 和 toast 必须有可见样式。

## MUI 封装规则

- MUI React 项目必须安装 `@mui/material`、`@emotion/react`、`@emotion/styled`；仅在真实需要图标库时安装 `@mui/icons-material`。
- 应用入口必须使用 `ThemeProvider` 和 `CssBaseline`。
- 页面 UI 必须从 primitive、slot、variant、state 和 token-backed `sx` 组合：禁止把 `Drawer`、`AppBar`、`Tabs`、`Alert`、`Card`、`Snackbar`、`BottomNavigation` 重写成普通 `div/button`。
- 只要用户要求 MUI、MUI 风格、Material 风格或通用组件库，优先生成本 React MUI 模式，不要用静态 HTML 模仿。
- 组件状态优先放在 MUI props、`ownerState`、`slotProps`、`sx` 或 theme `components` override 中。
- CSS variables 保留为 skill token contract；MUI theme variables 保留为 React 运行时主题 contract。
- 静态 HTML/CSS 模板不引入 MUI runtime，也不得声称实现 MUI；它只能保留通用语义结构、状态、密度、token dependencies 和 accessibility semantics。

## MUI 组件映射

| Skill 组件 | MUI primitive mapping |
| --- | --- |
| SidebarRail | `Drawer` + `Box` + `IconButton` + `Tooltip` |
| TopBar | `AppBar` + `Toolbar` + `IconButton` |
| CategoryTabs | `Tabs` + `Tab` + optional `Chip`/`Badge` |
| AnnouncementBar | `Paper` + `Alert` + `Stack` |
| MediaCard | transparent `Card elevation={0}` + `CardActionArea` + `CardMedia` + `CardContent` |
| VideoPlayerStage | `Paper` + `Box` + CSS geometry media slot |
| PlayerControlBar | `Box` + `IconButton` + `Tooltip` + `Select`/`Menu` + `Slider` |
| PlayerProgressRail | `Slider` + time readout |
| PlayerDanmakuOverlay | `Box` + non-interactive `Chip`/text rows |
| MobilePlayerTabs | `Tabs` + `Tab` |
| MediaFeedSection | `Box`/`Stack` section + CSS grid via `sx` + `Skeleton` states |
| Toast | `Snackbar` + `Alert` |
| BottomNav | `BottomNavigation` + `BottomNavigationAction` |
| SoftIconButton | `IconButton` + optional `Tooltip` |
| PillToggle | `ToggleButton`/`Chip`/`ButtonBase` |
| RippleSurface | `ButtonBase`/`CardActionArea`/MUI `TouchRipple` |

## 数据与内容要求

- fixtures 使用中性可替换内容。
- 媒体使用渐变占位、比例盒或可替换 URL 字段。
- 播放器组件使用 mock-only 状态和 CSS 几何占位；不得引入真实视频流、目标站截图、真实人物画面或不可授权媒体。
- 卡片字段至少包含 `id`、`title`、`creator`、`duration`、`date`、`views`、`category`、`thumbnailAlt`、`tone`。
- 分类字段至少包含 `id`、`label`、`count`。
- 不使用真实品牌、真实人物、真实机构或真实业务数据。

## 状态要求

完整项目必须提供：

- 正常内容状态。
- loading 状态。
- empty 状态。
- error 状态。
- success 或 toast 状态。
- 导航当前项状态。
- 分类激活状态。
- 表单 focus、disabled 和 invalid 状态。
- 播放器 play/pause、progress、quality、speed、volume、danmaku visible、fullscreen simulated 状态。

## 交互要求

- 首页媒体卡片 hover 保持外层平面，只改变标题颜色和封面槽；Paper/CTA 卡片才可轻上移。
- Category tab active 明确可见。
- 首页 Category tab active 使用 `Tabs` indicator/text selected；筛选场景才使用 filled pill。
- Icon button hover 显示浅粉圆面。
- active 使用小幅缩放。
- focus-visible 清晰可见。
- MediaCard 主点击面、作者 nested action、route-loading/toast 反馈必须分开处理。
- PlayerControlBar 必须能触发播放、进度、音量、清晰度、倍速、弹幕和全屏模拟反馈。
- Toast 可关闭或自动消失。
- 抽屉、弹层或菜单必须支持 Escape。
- reduced motion 关闭非必要位移、缩放、旋转和循环动画。

## 响应式要求

- desktop: `size.nav.rail` 侧边导航、装饰 masthead、分类横栏、自动填充卡片网格、宽容器。
- tablet: 2 到 3 列卡片，压缩容器 padding，降低装饰密度。
- mobile: 顶部栏、底部导航、紧凑 masthead、1 到 2 列卡片、无横向溢出。
- video-detail mobile: sticky 播放器位于顶部栏下方，`信息 / 评论 / 弹幕` tabs 紧贴播放器，底部弹幕输入不得遮挡底部导航。
- 横屏移动端减少垂直留白。

## 可访问性要求

- 页面使用语义化 landmarks。
- 每个图标按钮都有名称。
- 每张图片或媒体占位都有 alt 策略。
- 表单有 label。
- 错误信息与字段关联。
- 当前导航项使用 `aria-current`。
- tabs 使用 `aria-pressed` 或 tab 语义。
- 状态反馈使用 `role="status"` 或 `role="alert"`。
- 文本对比度满足 WCAG AA。

## 运行与验证

生成项目后必须提供适配技术栈的命令：

- React 或 Vue: `npm install`、`npm run dev`、`npm run build`。React MUI 项目若缺依赖，先安装 `@mui/material @emotion/react @emotion/styled`。
- 静态项目: 使用本地静态服务器或直接打开 `index.html`。

项目交付前必须检查：

- 构建命令可执行或说明不可执行原因。
- 页面在 desktop、tablet、mobile 下不溢出。
- 视频详情页在 desktop、tablet、mobile 下播放器、控制条、tabs 和弹幕输入不溢出。
- Masthead、分类 tabs、公告、媒体流和状态页可见。
- 主要交互状态可触发。
- 文本不遮挡、不截断失控。
- token 变量被实际使用。
- README 说明如何运行、修改 token 和替换内容。

## 输出纪律

- 如果用户要求代码落地，直接创建项目文件。
- 如果用户要求完整项目，优先使用对应 `assets/*-template/` 作为可复制起点，再按用户输入替换内容和 token。
- 如果用户要求方案，输出完整项目文件树与关键文件内容。
- 如果用户只要求单组件，不强制生成项目骨架。
- 完整项目不得遗漏入口文件、样式入口、数据占位和运行说明。
