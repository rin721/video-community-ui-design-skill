# Frontend Project Rules

## 完整项目前提

当输出目标是完整前端项目时，结果必须能独立运行、构建和检查。不得只输出单个组件、单页片段或没有入口的样式说明。项目必须包含入口文件、页面结构、组件层、样式层、数据占位、状态分支、响应式规则和运行说明。

## 默认项目策略

- 用户指定技术栈时，按指定技术栈生成。
- 用户要求完整项目但未指定技术栈时，默认使用 React、TypeScript、Vite 和 CSS variables。
- React、TypeScript、Vite 项目默认参考 `assets/frontend-template/`。
- 用户要求零依赖或静态交付时，使用 HTML、CSS 和少量原生 JavaScript。
- 零依赖或静态交付默认参考 `assets/static-template/`。
- 用户要求 Vue 时，使用 Vue SFC、TypeScript、Vite 和 scoped style。
- 用户要求 Tailwind 时，保留 CSS variables 作为主题层，并在 utility class 中调用。

## 必备交付物

完整项目必须包含：

- `package.json` 或静态项目运行说明。
- `index.html`。
- 应用入口文件。
- 页面级组件。
- 基础组件。
- 内容组件。
- 状态组件。
- 样式入口。
- token 到 CSS variables 的映射。
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
│   ├── data/
│   │   └── fixtures.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   └── app.css
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── Navigation.tsx
│   │   ├── Announcement.tsx
│   │   ├── MediaCard.tsx
│   │   ├── CardGrid.tsx
│   │   ├── Button.tsx
│   │   ├── SearchFilter.tsx
│   │   ├── StateBlock.tsx
│   │   └── Toast.tsx
│   └── pages/
│       └── HomePage.tsx
└── README.md
```

## Vue 项目结构

```text
/
├── package.json
├── index.html
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.ts
│   ├── App.vue
│   ├── data/
│   │   └── fixtures.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   └── app.css
│   ├── components/
│   │   ├── AppShell.vue
│   │   ├── Navigation.vue
│   │   ├── Announcement.vue
│   │   ├── MediaCard.vue
│   │   ├── CardGrid.vue
│   │   ├── Button.vue
│   │   ├── SearchFilter.vue
│   │   ├── StateBlock.vue
│   │   └── Toast.vue
│   └── pages/
│       └── HomePage.vue
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
- Announcement
- SearchFilter
- Section
- CardGrid
- MediaCard
- FeatureList
- CTA
- Footer
- Toast
- EmptyState
- ErrorState
- LoadingState

根据页面类型可增加 Hero、Stats、PricingBlock、Modal、Drawer、Tooltip。

## 样式系统要求

- `tokens.css` 必须由 `design-tokens.json` 映射而来。
- `base.css` 设置 box sizing、字体、颜色、focus、reduced motion 和基础语义元素。
- `app.css` 只写项目布局和组件样式。
- 组件样式必须使用 token 变量。
- 不得在组件中散落无语义颜色、断点、圆角和阴影。

## 数据与内容要求

- fixtures 使用中性可替换内容。
- 媒体使用渐变占位、比例盒或可替换 URL 字段。
- 卡片字段至少包含 `id`、`title`、`creator`、`duration`、`date`、`views`、`category`、`thumbnailAlt`。
- 不使用真实品牌、真实人物、真实机构或真实业务数据。

## 状态要求

完整项目必须提供：

- 正常内容状态。
- loading 状态。
- empty 状态。
- error 状态。
- success 或 toast 状态。
- 导航当前项状态。
- 搜索或筛选激活状态。
- 表单 focus、disabled 和 invalid 状态。

## 交互要求

- 卡片 hover 上移并改变标题颜色。
- active 使用小幅缩放。
- focus-visible 清晰可见。
- Toast 可关闭或自动消失。
- 抽屉、弹层或菜单必须支持 Escape。
- reduced motion 关闭非必要位移、缩放和循环动画。

## 响应式要求

- desktop: 侧边导航、自动填充卡片网格、宽容器。
- tablet: 2 到 3 列卡片，压缩容器 padding。
- mobile: 顶部栏、底部导航、1 到 2 列卡片、无横向溢出。
- 横屏移动端减少垂直留白。

## 可访问性要求

- 页面使用语义化 landmarks。
- 每个图标按钮都有名称。
- 每张图片或媒体占位都有 alt 策略。
- 表单有 label。
- 错误信息与字段关联。
- 当前导航项使用 `aria-current`。
- 状态反馈使用 `role="status"` 或 `role="alert"`。
- 文本对比度满足 WCAG AA。

## 运行与验证

生成项目后必须提供适配技术栈的命令：

- React 或 Vue: `npm install`、`npm run dev`、`npm run build`。
- 静态项目: 使用本地静态服务器或直接打开 `index.html`。

项目交付前必须检查：

- 构建命令可执行或说明不可执行原因。
- 页面在 desktop、tablet、mobile 下不溢出。
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
