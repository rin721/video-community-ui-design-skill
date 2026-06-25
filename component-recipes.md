# Component Recipes

## 派生系统

组件从 primitive、shell、brand、navigation、content、overlay、state 和 conversion 八层派生。所有组件必须继承 token、状态、响应式和可访问性规则。

| 层级 | 组件 | 目的 |
| --- | --- | --- |
| Primitive | Button、IconButton、SoftIconButton、PillToggle、RippleSurface、TextBox、Badge、Progress、Avatar、Divider | 提供最小可复用控件 |
| Shell | AppShell、SidebarRail、TopBar、BottomNav、Offcanvas | 建立页面骨架 |
| Brand | BrandHeader、DecorativeMasthead、WordmarkText、AccentStripe、StarAccent、PlusGrid、TriangleMark | 建立识别度 |
| Navigation | CategoryTabs、TabItem、RailItem、BottomNavItem、FlyoutMenu | 提供浏览入口 |
| Content | AnnouncementBar、MediaFeedSection、MediaCard、VideoPlayerStage、PlayerControlBar、PlayerProgressRail、PlayerDanmakuOverlay、MobilePlayerTabs、FeatureList、Stats、MediaBlock | 展示内容、播放器与信息 |
| Overlay | Modal、Drawer、Flyout、Tooltip、Toast | 承载临时信息与任务 |
| State | Skeleton、GeometricEmptyState、GeometricErrorState、SuccessState、LoadingIndicator | 表达系统状态 |
| Conversion | CTA、PricingBlock、PlanBlock、ComparisonRow | 承载转化与方案选择 |

## MUI 封装映射

React 完整项目默认使用真实 MUI library component encapsulation。组件必须由 MUI primitive、slots、variants、states、`ownerState`、`slotProps`、theme overrides 和 token-backed `sx` 组合，不得用 ad hoc DOM/CSS 重写已有 MUI 语义组件。静态 HTML/CSS 输出不引入 MUI runtime，也不得声称实现 MUI；如果用户要求 MUI 或通用组件库，必须切换到 `react-mui`。

| Skill 组件 | MUI mapping | Slot structure | Token dependencies | State variants | Anti-hardcoding notes |
| --- | --- | --- | --- | --- | --- |
| AppShell | `Box` + theme layout | root、nav、main、feedback | `color.surface.default`、`size.nav.*`、`zIndex.*` | drawer-open、mobile、desktop | 主内容避开固定导航必须引用 nav size token |
| SidebarRail | `Drawer` + `Box` + `IconButton` + `Tooltip` | paper、top nav、brand rail、bottom action | `size.nav.rail`、`shadow.nav.glow`、`color.brand.primary` | active、hover、focus、collapsed | 不在组件内写裸 rail width、阴影或品牌色 |
| TopBar | `AppBar` + `Toolbar` + `IconButton` | menu action、brand、utility action | `size.nav.mobileBar`、`blur.glass`、`shadow.nav.glow` | scrolled、menu-open、focus | 高度、blur、shadow 从 token 或 theme variables 读取 |
| BottomNav | `BottomNavigation` + `BottomNavigationAction` | nav root、action、icon、label | `size.nav.mobileBar`、`color.brand.primary`、`size.touch.min` | selected、hover、focus | 不手写四个普通链接替代 MUI bottom nav |
| CategoryTabs | `Tabs` + `Tab` + optional `Chip`/`Badge` | tablist、tab、label、indicator、count badge | `layout.category.height`、`radius.badge.default`、`color.brand.*` | selected、hover、focus、disabled | 首页选中态优先使用短 indicator 和主色文字；筛选场景才使用 filled pill |
| AnnouncementBar | `Paper` + `Alert` + `Stack` | surface、icon、title、body、action | `color.surface.card`、`radius.card.default`、`shadow.card.soft` | info、success、warning、error、dismissed | 公告 padding、圆角、阴影只能来自 token/theme |
| DecorativeMasthead | `Box` + token-backed pseudo slots | root、wordmark、stripe、plus grid、triangle | `layout.masthead.*`、`decoration.*`、`opacity.*` | desktop、mobile、reduced-motion | 装饰尺寸以 token 表达，不写死为站点专属形状 |
| MediaFeedSection | `Box`/`Stack` + CSS grid via `sx` + `Skeleton` | header、count、grid、state slot | `grid.feed.min`、`grid.feed.gap`、`container.content.max` | ready、loading、empty、error | grid min 和 gap 引用 token，状态不改变外层宽度 |
| MediaCard | `Card` + `CardActionArea` + `CardMedia` + `CardContent` | root、action、media、duration、content、title、authorLink、meta、ripple | `grid.feed.min`、`grid.media.coverWidth`、`grid.media.aspect`、`radius.card.default`、`spacing.*`、`typography.size.caption` | hover、focus、pressed、loading、media-error、route-loading | 首页媒体卡默认平面无 Paper 阴影；nested 作者/标签入口不得误触发主卡片 |
| VideoPlayerStage | `Paper` + `Box` + `CardMedia` + player slots | root、visual、brand text、geometry、danmaku overlay、progress、controls | `color.surface.card`、`grid.media.aspect`、`radius.card.default`、`color.brand.*`、`motion.*` | ready、loading、playing、paused、fullscreen-simulated、mobile-sticky | 不使用真实截图、目标站 logo 或专有播放器命名；视觉用 CSS 几何占位表达 |
| PlayerControlBar | `Box` + `IconButton` + `Tooltip` + `Select`/`Menu` + `Slider` | play、time、quality、speed、volume、danmaku toggle、fullscreen | `size.touch.min`、`color.brand.primary`、`color.brand.soft`、`spacing.*` | hover、pressed、focus、disabled、compact-mobile | 移动端必须换行或压缩，不允许页面级横向溢出 |
| PlayerProgressRail | `Slider` + optional progress readout | track、thumb、current、buffer、time label | `color.brand.primary`、`color.border.subtle`、`motion.duration.fast` | dragging、focus、disabled | 轨道保持细，不用厚重进度条模拟播放器 |
| PlayerDanmakuOverlay | `Box` + `Chip`/text rows | layer、row、paused state | `motion.duration.danmaku`、`color.surface.glass`、`color.text.*` | visible、hidden、reduced-motion | overlay 必须 `aria-hidden`，不阻挡播放器控制 |
| MobilePlayerTabs | `Tabs` + `Tab` | tablist、info、comments、danmaku、indicator | `size.nav.mobileBar`、`color.brand.primary`、`color.border.subtle` | selected、focus、sticky-adjacent | 必须紧贴移动播放器，不能被底部导航遮挡 |
| SoftIconButton | `IconButton` + optional `Tooltip` | root、icon、active indicator、ripple | `size.control.icon`、`size.control.action`、`radius.control.round`、`color.brand.soft` | hover、selected、pressed、focus、disabled | 圆形点击面尺寸来自 token，不用裸宽高 |
| PillToggle | `ToggleButton`/`Chip`/`ButtonBase` | root、icon、label、state mark | `radius.badge.default`、`color.brand.primary`、`color.surface.inset`、`size.touch.min` | selected、hover、pressed、focus、disabled | 只用于筛选/标签，不替代首页 CategoryTabs |
| RippleSurface | `ButtonBase`/`CardActionArea`/MUI `TouchRipple` | host、ripple、focus ring | `motion.duration.fast`、`color.brand.soft`、`border.focus.default` | pressed、focus-visible、reduced-motion | ripple 是状态反馈，不得改变布局尺寸 |
| Toast | `Snackbar` + `Alert` | anchor、surface、message、close action | `zIndex.toast`、`radius.badge.default`、`motion.duration.loading` | info、success、warning、error、closing | 不手写 fixed div 替代 Snackbar；位置和层级走 token/theme |
| CTA | `Paper` + `Stack` + `Button` | surface、copy、primary action、secondary action | `color.brand.*`、`spacing.6`、`radius.card.default` | default、loading、success | CTA 只是内容辅助，不使用大 hero 式硬编码布局 |

## 状态矩阵

| 组件类型 | hover | active | focus | disabled | loading | error | empty | success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | 背景加深 | 轻缩放 | 焦点环 | 降透明 | 底部进度 | 错误色变体 | 不适用 | 成功色变体 |
| IconButton | 浅粉圆面 | 图标缩放/旋转 | 圆形焦点环 | 弱图标 | spinner | tooltip | 不适用 | 状态色 |
| MediaCard | 标题主色、封面微缩放 | 轻 press/ripple | 外部焦点环 | 不可点击 | 骨架 | 媒体失败 | 空卡片 | 完成标记 |
| CategoryTabs | 主色/底线 | 轻缩放 | 可见轮廓 | 弱化入口 | 不适用 | 不适用 | 不适用 | 当前项 |
| AnnouncementBar | 链接主色 | 不适用 | 内部焦点 | 可关闭弱化 | 保留尺寸 | 内联错误 | 不适用 | 成功提示 |
| Offcanvas | 遮罩可关闭 | 背景轻缩放 | 焦点陷阱 | 不适用 | 局部加载 | 错误区域 | 空内容 | 完成反馈 |

## AppShell

- 使用场景：页面级容器。
- 视觉结构：背景层、固定导航层、masthead 层、滚动内容层、反馈层。
- Token 依赖：`color.surface.default`、`size.nav.rail`、`size.nav.mobileBar`、`zIndex.nav`。
- 状态规则：抽屉打开时内容层可 `translate(60vw) scale(.8)`，并加轻玻璃和圆角。
- 响应式规则：桌面侧轨；移动顶部栏和底部栏。
- 可访问性规则：主内容使用 `main`，导航使用 `nav`，抽屉打开后管理焦点。
- 技术实现提示：固定导航必须给内容区留出 padding。
- 禁止事项：禁止导航遮挡页面内容。
- 生成示例：`<div class="vc-app-shell"><nav>...</nav><main>...</main></div>`

## BrandHeader

- 使用场景：页面顶部气质建立、移动顶部栏品牌短标。
- 视觉结构：粗字重短文字、可选星形/斜线标记、主色文字。
- Token 依赖：`typography.font.display`、`typography.weight.brand`、`color.brand.primary`。
- 状态规则：作为链接时 hover 保持主色并提升透明度；focus 使用外环。
- 响应式规则：桌面可居中大号；移动端缩为左侧短标。
- 可访问性规则：如果是首页链接，提供清晰可访问名称。
- 技术实现提示：字标使用文本和 CSS 装饰，不使用图片。
- 禁止事项：禁止使用不可替换 logo 资产。
- 生成示例：`<a class="vc-brand-header" href="/">MediaKit<span aria-hidden="true">★</span></a>`

## DecorativeMasthead

- 使用场景：首屏顶部、分类页头、状态页头。
- 视觉结构：浅底区域、居中字标、斜向色带、星形、十字点阵、三角角标。
- Token 依赖：`layout.masthead.height`、`decoration.stripe.width`、`decoration.star.size`、`opacity.decorative.masthead`。
- 状态规则：首次出现可使用低幅 jump-in；reduced motion 下静态。
- 响应式规则：移动端降低高度、隐藏部分点阵并保留字标。
- 可访问性规则：所有装饰图形 `aria-hidden="true"`。
- 技术实现提示：优先用 CSS pseudo element、border、clip-path 和文本实现。
- 禁止事项：禁止装饰压住导航或正文。
- 生成示例：`<section class="vc-masthead" aria-label="页面标题">...</section>`

## SidebarRail

- 使用场景：桌面主导航。
- 视觉结构：`size.nav.rail` 纵向轨道，顶部图标组，中段竖排字标/斜条纹，底部设置入口。
- Token 依赖：`size.nav.rail`、`shadow.nav.glow`、`color.brand.primary`。
- 状态规则：每个入口使用 `SoftIconButton` anatomy；当前项显示主色、浅粉圆面和由 `spacing.1` 派生的侧向指示条；设置图标 active 可旋转。
- 响应式规则：移动端隐藏并交给 TopBar 和 BottomNav。
- 可访问性规则：每个图标入口必须有名称。
- 技术实现提示：使用固定定位和独立层级。
- 技术实现提示：React MUI 项目用 `Drawer` 的 `PaperProps` 固定宽度，内部用 `IconButton`/`Tooltip`/`ButtonBase` 组合，不用普通 div 伪造按钮。
- 禁止事项：禁止只显示无法理解的图标；禁止 active 只改图标颜色而没有 selected surface。
- 生成示例：`<aside class="vc-sidebar-rail">...</aside>`

## TopBar

- 使用场景：移动顶部栏。
- 视觉结构：菜单按钮、短字标、用户入口或工具按钮。
- Token 依赖：`size.nav.mobileBar`、`blur.glass`、`shadow.nav.glow`。
- 状态规则：滚动时可加轻阴影，菜单按钮 active 轻缩放。
- 响应式规则：移动端固定顶部，桌面隐藏。
- 可访问性规则：菜单按钮声明展开状态。
- 技术实现提示：使用 `position: fixed` 并给内容区预留 padding。
- 禁止事项：禁止顶部栏文字溢出。
- 生成示例：`<header class="vc-topbar">...</header>`

## BottomNav

- 使用场景：移动端主入口。
- 视觉结构：3 到 5 个图标加短文本入口，高度绑定 `size.nav.mobileBar`，轻玻璃背景。
- Token 依赖：`size.nav.mobileBar`、`color.brand.primary`、`blur.glass`。
- 状态规则：当前项使用主色和标签；active 轻缩放。
- 响应式规则：仅移动端显示。
- 可访问性规则：当前项使用 `aria-current="page"`。
- 技术实现提示：使用 safe-area inset。
- 禁止事项：禁止超过 5 个主入口。
- 生成示例：`<nav class="vc-bottom-nav">...</nav>`

## CategoryTabs

- 使用场景：内容分类、频道切换、筛选入口。
- 视觉结构：首页使用横向文本 tabs，active 使用主色文字和短细底线；筛选/搜索场景才使用 pill 或浅粉背景。
- Token 依赖：`spacing.4`、`color.brand.primary`、`radius.badge.default`、`motion.duration.fast`。
- 状态规则：hover 文字主色；active 轻缩放；focus 清晰轮廓；selected state 必须同步 `aria-selected` 或 MUI `value`。
- 响应式规则：移动端允许横向滚动或换行，但不得页面级溢出。
- 可访问性规则：使用 `tablist`/`tab` 或语义按钮组，当前项声明状态。
- 技术实现提示：React MUI 项目使用 `Tabs` indicator 表达首页选中态；结果数量可放在 `Badge` 中但不得撑高 tab row。
- 禁止事项：禁止仅靠颜色表达选中；禁止把首页 tab 默认做成大面积 filled pill。
- 生成示例：`<div class="vc-category-tabs" role="tablist">...</div>`

## AnnouncementBar

- 使用场景：公告、运营信息、版本提醒、提示。
- 视觉结构：信息图标、标题、正文、可选链接；白色或轻玻璃表面，圆角绑定 `radius.card.default`。
- Token 依赖：`color.surface.card`、`radius.card.default`、`shadow.card.soft`、`spacing.4`。
- 状态规则：可关闭公告保留关闭状态；链接 hover 使用主色。
- 响应式规则：移动端正文换行，不得横向溢出。
- 可访问性规则：重要信息可使用 `role="status"`，关闭按钮有名称。
- 技术实现提示：正文允许选择文本。
- 禁止事项：禁止公告覆盖主要内容。
- 生成示例：`<aside class="vc-announcement-bar">...</aside>`

## MediaFeedSection

- 使用场景：最新内容、推荐内容、搜索结果、频道列表。
- 视觉结构：小图标、标题、数量 badge、可选操作、媒体卡片网格。
- Token 依赖：`grid.feed.min`、`grid.feed.gap`、`container.content.max`。
- 状态规则：loading 显示多张骨架；empty 显示几何空状态；error 显示恢复操作。
- 响应式规则：桌面自动列，移动 1 到 2 列。
- 可访问性规则：section 必须有标题，列表保持合理 tab 顺序。
- 技术实现提示：使用 CSS grid 和 `minmax()`。
- 禁止事项：禁止移动端非必要横向滚动。
- 生成示例：`<section class="vc-media-feed" aria-labelledby="feed-heading">...</section>`

## MediaCard

- 使用场景：视频、音频、图文内容和推荐内容。
- 视觉结构：平面外层点击面、16:9 封面、带 token 内边距的正文区、两行标题、作者、播放/浏览计数、时长、日期。
- Token 依赖：`grid.feed.min`、`grid.media.coverWidth`、`grid.media.aspect`、`radius.card.default`、`spacing.2`、`spacing.3`、`typography.size.caption`、`color.text.secondary`。
- 状态规则：hover 标题变主色、封面槽微缩放或变亮；active 只做短 press/ripple；loading 使用封面骨架；error 显示媒体失败提示。
- 响应式规则：桌面网格，移动端 1 到 2 列。
- 可访问性规则：主链接文本包含标题；封面 alt 与标题互补；作者、标签等 nested action 必须有独立可访问名称。
- 技术实现提示：React MUI 项目用 `Card elevation={0}` + `CardActionArea` + `CardMedia` + `CardContent`，并在 `sx` 中保持 root 透明；封面下方标题和元信息不得贴边，正文区 inline/block padding 必须从 `spacing.*` 或局部组件 token 派生；元信息使用列表或分组，数字使用 tabular nums。
- 技术实现提示：点击主卡片时可触发 route-loading 细进度或 snackbar；点击作者/标签需阻止主卡片点击传播。
- 禁止事项：禁止首页媒体网格使用厚 Paper 背景、整卡重投影或大幅 hover lift；禁止标题、时长和日期因列宽变化完全消失。
- 生成示例：`<article class="vc-media-card">...</article>`

## VideoPlayerStage

- 使用场景：视频详情页、播放器组件、移动播放器详情。
- 视觉结构：白底或近白底播放器舞台、CSS 几何占位、可替换播放器标题、弹幕 overlay、细进度条和紧凑控制条。
- Token 依赖：`color.surface.card`、`color.brand.primary`、`color.brand.soft`、`grid.media.aspect`、`radius.card.default`、`spacing.*`、`motion.duration.fast`。
- 状态规则：playing/paused 改变播放按钮语义；loading 使用几何占位或细进度；fullscreen 只能本地模拟；danmaku visible/hidden 不改变布局。
- 响应式规则：桌面占据主列并可配右侧弹幕面板；移动端 sticky 于顶部栏下方，tabs 直接跟随播放器。
- 可访问性规则：播放器区域提供可访问名称；装饰和弹幕 overlay 对辅助技术隐藏；所有图标按钮有名称。
- 技术实现提示：React MUI 项目用 `Paper`/`Box`/`Slider`/`IconButton`/`Tooltip`/`Select`/`Tabs` 组合，控制条状态走 React local state。
- 禁止事项：禁止使用目标站 logo、真实视频帧、真实弹幕或不可授权截图；禁止把播放器控件做成普通无语义 div。

## PlayerControlBar / PlayerProgressRail

- 使用场景：播放器底部控制区。
- 视觉结构：细进度条在上或贴近画面底部；下方为播放、时间、清晰度、倍速、音量、弹幕、全屏控件。
- Token 依赖：`color.brand.primary`、`color.brand.soft`、`size.touch.min`、`spacing.1` 到 `spacing.3`。
- 状态规则：progress dragging、volume dragging、quality/speed selected、danmaku active、fullscreen simulated 均有视觉反馈。
- 响应式规则：桌面横排；移动端允许 wrap 和短文本，不能横向滚动页面。
- 技术实现提示：进度与音量使用 MUI `Slider`；清晰度/倍速使用 `Select` 或 `Menu`；按钮使用 `IconButton` + `Tooltip` 或短文本 `Button`。

## PlayerDanmakuOverlay / MobilePlayerTabs

- 使用场景：弹幕播放层与移动详情 tabs。
- 视觉结构：弹幕 overlay 为非交互浮层；移动 tabs 为 `信息 / 评论 / 弹幕` 三项，选中态使用主色文字和短 indicator。
- Token 依赖：`motion.duration.danmaku`、`color.brand.primary`、`color.surface.glass`、`color.border.subtle`。
- 状态规则：弹幕开关保留当前进度和布局；reduced motion 下停止漂移动画；tab selected 必须同步 MUI value。
- 响应式规则：移动 tabs 贴住 sticky 播放器下缘；弹幕输入固定在安全区上方时，不遮挡底部导航。
- 禁止事项：禁止把弹幕文本当页面正文暴露给辅助技术；禁止固定输入条覆盖主要内容。

## Button

- 使用场景：主操作、次操作、危险操作、图标操作。
- 视觉结构：圆角绑定 `radius.badge.default` 或 `radius.card.default`，最小高度绑定 `size.input.default`，水平 padding 使用 `spacing.4`，主按钮使用主色背景和白色文字。
- Token 依赖：`color.brand.primary`、`color.brand.hover`、`radius.badge.default`、`shadow.control.subtle`、`motion.duration.fast`。
- 状态规则：hover 加深背景并增加轻阴影；active 缩放到 `motion.transform.pressScale`；disabled 降低透明度；loading 显示底部细进度。
- 响应式规则：移动端按钮高度不低于 `size.touch.min`。
- 可访问性规则：必须有可见文本或 `aria-label`；focus ring 必须可见。
- 技术实现提示：使用 `button` 元素；链接按钮使用 `a` 并保留可访问名称。
- 禁止事项：禁止只靠颜色表达危险或成功。
- 生成示例：`<button class="vc-button vc-button--primary">开始</button>`

## IconButton

- 使用场景：导航图标、工具按钮、关闭、搜索和设置。
- 视觉结构：圆形点击面，图标尺寸从 `size.control.icon` 派生，桌面点击面绑定 `size.control.icon`，移动端不小于 `size.touch.min`。
- Token 依赖：`size.control.icon`、`size.touch.min`、`radius.control.round`、`color.brand.soft`。
- 状态规则：hover 显示浅背景；active 图标缩放；focus 使用圆形焦点环；disabled 弱化图标。
- 响应式规则：移动端扩大点击面。
- 可访问性规则：必须提供 `aria-label`。
- 技术实现提示：图标不应接收 pointer events。
- 禁止事项：禁止无名称图标按钮。
- 生成示例：`<button class="vc-icon-button" aria-label="打开菜单">...</button>`

## SoftIconButton / PillToggle / RippleSurface

- 使用场景：侧轨入口、详情页圆形动作、搜索筛选、标签筛选、卡片点击反馈。
- 视觉结构：`SoftIconButton` 是圆形透明点击面；`PillToggle` 是胶囊状态控件；`RippleSurface` 在 React MUI 中附着到 `CardActionArea`、`ButtonBase` 或 `TouchRipple`，在静态 fallback 中只作为普通短反馈层。
- Token 依赖：`size.control.icon`、`size.control.action`、`size.touch.min`、`radius.control.round`、`radius.badge.default`、`color.brand.soft`、`motion.duration.fast`。
- 状态规则：hover 使用浅粉/低对比 surface，selected 使用主色或主色文字，pressed 使用 `motion.transform.pressScale` 或 ripple；reduced motion 下保留颜色和焦点反馈。
- 响应式规则：移动端点击面不小于 `size.touch.min`；底部导航和顶部栏按钮不可因 label 变化撑高。
- 可访问性规则：图标控件必须有 `aria-label`；toggle 必须暴露 `aria-pressed`、checkbox state 或 MUI selected state；ripple 不承担语义。
- 技术实现提示：React MUI 项目优先使用 `IconButton`、`ToggleButton`、`Chip`、`ButtonBase`、`CardActionArea` 和 `TouchRipple`；静态 HTML 输出只能称为 generic clickable surface，不能称为 MUI 组件实现。
- 禁止事项：禁止用无语义 div 写可点击控件；禁止把 ripple 做成永久装饰层；禁止用 pill toggle 替代首页分类 tab。

## Navigation

- 使用场景：全局导航、内容分类、移动端主入口。
- 视觉结构：桌面 `size.nav.rail` 窄轨；移动顶部栏与底部栏；分类区使用横向 tabs。
- Token 依赖：`size.nav.rail`、`size.nav.mobileBar`、`color.surface.card`、`shadow.nav.glow`、`blur.glass`。
- 状态规则：hover 显示浅背景；active 显示主色；focus 显示焦点环；菜单展开时主内容可位移。
- 响应式规则：`<=639px` 时侧轨变为顶部栏，主导航放入底部栏。
- 可访问性规则：使用 `nav`、`aria-current`、可见 label 或辅助 label。
- 技术实现提示：使用语义链接列表；移动端底部导航保留安全区 padding。
- 禁止事项：禁止移动端只保留图标且没有名称。
- 生成示例：`<nav aria-label="主导航">...</nav>`

## Hero / Section / Card

- 使用场景：产品介绍、页面入口、内容分组、功能说明、推荐区域。
- 视觉结构：短标题、短说明、可选操作、可选媒体槽或柔和几何装饰。
- Token 依赖：`typography.size.hero`、`spacing.section.lg`、`color.brand.soft`、`grid.media.aspect`。
- 状态规则：加载时媒体槽使用骨架；错误时给出恢复操作。
- 响应式规则：桌面可双列；移动端堆叠并降低标题字号。
- 可访问性规则：一个页面只保留一个 `h1`；装饰图形隐藏给辅助技术。
- 技术实现提示：使用 `section` 与清晰 heading。
- 禁止事项：禁止用大图遮挡文字；禁止 hero 占满首屏。
- 生成示例：`<section class="vc-section">...</section>`

## Feature List

- 使用场景：产品能力、社区优势、流程说明。
- 视觉结构：图标、短标题、1 到 2 行说明。
- Token 依赖：`spacing.4`、`color.brand.soft`、`radius.card.default`。
- 状态规则：hover 可轻微变色；focus 用于可点击条目。
- 响应式规则：桌面 3 列，平板 2 列，移动端 1 列。
- 可访问性规则：图标为装饰时隐藏给辅助技术。
- 技术实现提示：使用 `ul/li`。
- 禁止事项：禁止长段落破坏扫描。
- 生成示例：`<ul class="vc-feature-list">...</ul>`

## Tag / Badge

- 使用场景：分类、数量、状态、等级、筛选。
- 视觉结构：圆角绑定 `radius.badge.default`，小字号绑定 `typography.size.caption`，水平 padding 使用 `spacing.2`。
- Token 依赖：`radius.badge.default`、`color.brand.primary`、`typography.size.caption`。
- 状态规则：selected 使用主色；inactive 使用浅背景；disabled 降低透明度。
- 响应式规则：长标签允许换行或截断加 title。
- 可访问性规则：可点击标签使用 button；选中状态使用 `aria-pressed`。
- 技术实现提示：状态徽标与筛选标签使用不同语义元素。
- 禁止事项：禁止只用颜色表示选中。
- 生成示例：`<span class="vc-badge">12</span>`

## Form

- 使用场景：搜索、登录、反馈、订阅、筛选。
- 视觉结构：圆角绑定 `radius.card.default`，输入高度绑定 `size.input.default` / `size.input.large`，内嵌浅背景、底部焦点线和前后图标均使用 token 派生。
- Token 依赖：`size.input.default`、`size.input.large`、`color.surface.inset`、`color.focus.ring`。
- 状态规则：focus 显示主色线；error 显示错误色和说明；disabled 降低透明度；loading 保留输入内容。
- 响应式规则：移动端输入高度使用 `size.input.large`，且不低于 `size.touch.min`。
- 可访问性规则：每个输入必须有 label；错误说明通过 `aria-describedby` 关联。
- 技术实现提示：使用原生 input、label、button。
- 禁止事项：禁止只用 placeholder 充当 label。
- 生成示例：`<label for="search">搜索</label><input id="search" />`

## Modal / Drawer / Flyout

- 使用场景：登录、设置、确认、通知、用户面板。
- 视觉结构：轻玻璃模糊、`radius.card.default` 圆角、轻阴影、标题栏、内容区和操作区。
- Token 依赖：`blur.glass`、`shadow.card.elevated`、`radius.card.default`、`zIndex.overlay`。
- 状态规则：进入时淡入和轻位移；关闭时快速淡出；loading 不关闭焦点陷阱。
- 响应式规则：移动端宽度不超过视口减去 `spacing.8`；内容可滚动。
- 可访问性规则：使用 `role="dialog"`、`aria-modal`、焦点陷阱和 Esc 关闭。
- 技术实现提示：背景遮罩不可抢走键盘焦点。
- 禁止事项：禁止无标题弹窗；禁止关闭按钮不可聚焦。
- 生成示例：`<dialog class="vc-modal">...</dialog>`

## Toast / Tooltip

- 使用场景：短反馈、成功、警告、错误、信息提示、图标说明。
- 视觉结构：轻玻璃表面、`radius.badge.default` 圆角、图标、短文本、可选底部进度。
- Token 依赖：`blur.glass`、`radius.badge.default`、`zIndex.toast`、`motion.duration.loading`。
- 状态规则：success、warning、error、info 使用对应状态色；reduced motion 关闭进度动画。
- 响应式规则：移动端宽度不超过视口减去 `spacing.8`。
- 可访问性规则：toast 使用 `role="status"` 或 `role="alert"`；tooltip 不承载必要信息。
- 技术实现提示：自动消失前允许用户继续操作。
- 禁止事项：禁止 toast 承载长说明。
- 生成示例：`<div role="status" class="vc-toast">已完成</div>`

## GeometricEmptyState / GeometricErrorState

- 使用场景：无内容、无搜索结果、请求失败、权限不足。
- 视觉结构：大标题或状态数字、短说明、恢复操作、底部几何山形/斜线装饰。
- Token 依赖：`color.brand.primary`、`decoration.state.peakHeight`、`spacing.8`。
- 状态规则：重试按钮 loading 时保持宽度；几何装饰 reduced motion 下静态。
- 响应式规则：移动端降低大字字号，操作按钮可全宽。
- 可访问性规则：错误使用 `role="alert"`；装饰隐藏给辅助技术。
- 技术实现提示：几何底部可用 CSS clip-path 或伪元素实现。
- 禁止事项：禁止只显示错误码。
- 生成示例：`<section class="vc-geometric-state">...</section>`

## Footer

- 使用场景：页面末尾、链接组、版权、语言或主题入口。
- 视觉结构：低对比文字、轻分割线、链接组和小型操作。
- Token 依赖：`color.text.secondary`、`border.divider.default`、`spacing.6`。
- 状态规则：链接 hover 使用主色；focus 可见。
- 响应式规则：移动端链接组堆叠或两列。
- 可访问性规则：页脚使用 `footer`，链接文本明确。
- 技术实现提示：不要把重要主操作只放页脚。
- 禁止事项：禁止页脚信息密度超过主体内容。
- 生成示例：`<footer class="vc-footer">...</footer>`

## CTA

- 使用场景：注册、投稿、订阅、了解更多、联系。
- 视觉结构：短标题、短说明、主按钮、可选次按钮和轻粉背景。
- Token 依赖：`color.brand.primary`、`color.brand.soft`、`spacing.8`、`radius.card.default`。
- 状态规则：按钮完整覆盖交互状态；loading 显示进度。
- 响应式规则：移动端按钮全宽或上下堆叠。
- 可访问性规则：CTA 目标明确，避免多个相同按钮文本指向不同动作。
- 技术实现提示：使用独立 section。
- 禁止事项：禁止一屏出现过多同强度 CTA。
- 生成示例：`<section class="vc-cta">...</section>`

## Testimonial / Stats / Media Block / Pricing Block

- 使用场景：社区反馈、规模指标、产品画面、套餐或方案。
- 视觉结构：轻卡片、小圆角、短文本、可替换媒体槽或数字。
- Token 依赖：`color.surface.card`、`radius.card.default`、`shadow.card.soft`、`grid.media.aspect`。
- 状态规则：动态数字避免频繁跳动；轮播必须可暂停；推荐计划用浅强调而非强放大。
- 响应式规则：桌面 3 到 4 列，平板 2 列，移动端 1 列。
- 可访问性规则：数字需有单位；价格、周期和限制必须文本明确。
- 技术实现提示：对比表需要表格语义或清晰列表。
- 禁止事项：禁止虚构真实人物身份或不可验证真实数字。
- 生成示例：`<article class="vc-plan">...</article>`
