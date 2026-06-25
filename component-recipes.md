# Component Recipes

## 派生系统

组件从 primitive、layout、content、overlay、state 和 commerce 六层派生。所有派生组件必须继承 token、状态、响应式和可访问性规则。

| 层级 | 组件 | 目的 |
| --- | --- | --- |
| Primitive | Button、IconButton、TextBox、Badge、Progress、Avatar | 提供最小可复用控件 |
| Layout | AppShell、SidebarRail、TopBar、BottomNav、Section、Grid、Panel | 建立页面骨架 |
| Content | MediaCard、FeatureList、Announcement、Stats、MediaBlock | 展示内容与信息 |
| Overlay | Modal、Drawer、Flyout、Tooltip、Toast | 承载临时信息与任务 |
| State | Skeleton、EmptyState、ErrorState、SuccessState、LoadingIndicator | 表达系统状态 |
| Commerce | CTA、PricingBlock、PlanBlock、ComparisonRow | 承载转化与方案选择 |

## 状态矩阵

| 组件类型 | hover | active | focus | disabled | loading | error | empty | success |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Button | 背景加深 | 轻缩放 | 焦点环 | 降透明 | 内部进度 | 错误色变体 | 不适用 | 成功色变体 |
| IconButton | 浅背景 | 图标缩放 | 圆形焦点环 | 弱图标 | spinner | 错误提示 | 不适用 | 成功提示 |
| Card | 上移阴影 | 轻缩放 | 外部焦点环 | 不可点击 | 骨架 | 局部错误 | 空卡片 | 完成标记 |
| TextBox | 辅助高亮 | 不适用 | 底部强调线 | 弱背景 | 保留输入 | 错误说明 | 不适用 | 成功说明 |
| Navigation | 浅背景 | 主色反馈 | 可见轮廓 | 弱化入口 | 不适用 | 不适用 | 不适用 | 当前项 |
| Modal | 不适用 | 不适用 | 焦点陷阱 | 不适用 | 局部加载 | 错误区域 | 空内容 | 完成反馈 |

## AppShell

- 使用场景：页面级容器。
- 视觉结构：背景层、导航层、滚动内容层、反馈层。
- Token 依赖：`color.surface.default`、`size.nav.rail`、`size.nav.mobileBar`、`zIndex.nav`。
- 状态规则：抽屉打开时内容可轻微位移并显示遮罩。
- 响应式规则：桌面侧轨，移动顶部栏和底部栏。
- 可访问性规则：主内容使用 `main`，导航使用 `nav`，跳转链接可选。
- 技术实现提示：固定导航必须给内容区留出 padding。
- 禁止事项：禁止导航遮挡页面内容。
- 生成示例：`<div class="vc-app-shell"><nav>...</nav><main>...</main></div>`

## SidebarRail

- 使用场景：桌面主导航。
- 视觉结构：56px 纵向轨道，顶部图标组，中部可选装饰，底部设置入口。
- Token 依赖：`size.nav.rail`、`shadow.nav.soft`、`color.brand.primary`。
- 状态规则：当前项显示主色与侧向指示条。
- 响应式规则：移动端隐藏并交给 TopBar 和 BottomNav。
- 可访问性规则：每个图标入口必须有名称。
- 技术实现提示：使用固定定位和独立层级。
- 禁止事项：禁止只显示难以理解的图标。
- 生成示例：`<aside class="vc-sidebar-rail">...</aside>`

## TopBar

- 使用场景：移动顶部栏或桌面轻导航。
- 视觉结构：菜单按钮、短标题、用户入口或操作按钮。
- Token 依赖：`size.nav.mobileBar`、`blur.glass`、`shadow.nav.soft`。
- 状态规则：滚动时可加轻阴影，菜单按钮 active 轻缩放。
- 响应式规则：移动端固定顶部，桌面可隐藏。
- 可访问性规则：菜单按钮声明展开状态。
- 技术实现提示：使用 `position: sticky` 或 fixed，并预留内容 padding。
- 禁止事项：禁止顶部栏文字溢出。
- 生成示例：`<header class="vc-topbar">...</header>`

## BottomNav

- 使用场景：移动端主入口。
- 视觉结构：3 到 5 个图标加短文本入口，56px 高度。
- Token 依赖：`size.nav.mobileBar`、`color.brand.primary`、`blur.glass`。
- 状态规则：当前项使用主色和标签；active 轻缩放。
- 响应式规则：仅移动端显示。
- 可访问性规则：当前项使用 `aria-current="page"`。
- 技术实现提示：使用 safe-area inset。
- 禁止事项：禁止超过 5 个主入口。
- 生成示例：`<nav class="vc-bottom-nav">...</nav>`

## Button

- 使用场景：主操作、次操作、危险操作、图标操作。
- 视觉结构：4px 圆角，最小高度 36px，水平 padding 16px，主按钮使用主色背景和白色文字。
- Token 依赖：`color.brand.primary`、`color.brand.hover`、`radius.badge.default`、`shadow.control.subtle`、`motion.duration.fast`。
- 状态规则：hover 加深背景并增加轻阴影；active 缩放到 `motion.transform.pressScale`；disabled 降低透明度；loading 显示底部细进度条。
- 响应式规则：移动端按钮高度不低于 44px；图标按钮保持 44px 触控目标。
- 可访问性规则：必须有可见文本或 `aria-label`；focus ring 必须可见。
- 技术实现提示：使用 `button` 元素；链接按钮使用 `a` 并保留可访问名称。
- 禁止事项：禁止只靠颜色表达危险或成功；禁止按钮文字被挤压到不可读。
- 生成示例：`<button class="vc-button vc-button--primary">开始浏览</button>`

## IconButton

- 使用场景：导航图标、工具按钮、弹层关闭、搜索和设置。
- 视觉结构：圆形点击面，图标 24px，桌面点击面 40px，移动端不小于 44px。
- Token 依赖：`size.control.icon`、`size.touch.min`、`radius.control.round`、`color.brand.soft`。
- 状态规则：hover 显示浅背景；active 图标缩放；focus 使用圆形焦点环；disabled 弱化图标。
- 响应式规则：移动端扩大点击面。
- 可访问性规则：必须提供 `aria-label`。
- 技术实现提示：图标不应接收 pointer events。
- 禁止事项：禁止无名称图标按钮。
- 生成示例：`<button class="vc-icon-button" aria-label="打开菜单">...</button>`

## Navigation

- 使用场景：全局导航、内容分类、移动端主入口。
- 视觉结构：桌面使用 56px 窄轨；移动端使用顶部栏与底部栏；图标居中，激活项使用主色和浅强调背景。
- Token 依赖：`size.nav.rail`、`size.nav.mobileBar`、`color.surface.card`、`shadow.nav.soft`、`blur.glass`。
- 状态规则：hover 显示浅背景；active 显示主色；focus 显示焦点环；菜单展开时主内容可轻微位移。
- 响应式规则：`<=639px` 时侧轨变为顶部栏，主导航放入底部栏。
- 可访问性规则：使用 `nav`、`aria-current`、可见 label 或辅助 label。
- 技术实现提示：使用语义链接列表；移动端底部导航保留安全区 padding。
- 禁止事项：禁止移动端只保留图标且没有名称。
- 生成示例：`<nav aria-label="主导航">...</nav>`

## Hero

- 使用场景：产品介绍、页面入口、空状态、重点内容展示。
- 视觉结构：短标题、短说明、1 到 2 个操作、可选媒体槽或柔和几何装饰。
- Token 依赖：`typography.size.hero`、`spacing.section.lg`、`color.brand.soft`、`grid.media.aspect`。
- 状态规则：加载时媒体槽使用骨架；错误时给出恢复操作。
- 响应式规则：桌面可双列；移动端堆叠并降低标题字号。
- 可访问性规则：一个页面只保留一个 `h1`；装饰图形隐藏给辅助技术。
- 技术实现提示：使用 `section` 与清晰 heading。
- 禁止事项：禁止用大图遮挡文字；禁止 hero 占满首屏导致下方内容不可见。
- 生成示例：`<section class="vc-hero">...</section>`

## Section

- 使用场景：内容分组、功能说明、推荐区域。
- 视觉结构：标题行、可选说明、主体区域、可选右侧操作。
- Token 依赖：`spacing.6`、`spacing.section.lg`、`typography.size.sectionTitle`。
- 状态规则：空状态显示在主体区域；加载状态不挤压标题行。
- 响应式规则：移动端标题和操作分行。
- 可访问性规则：section 必须有可感知标题。
- 技术实现提示：使用 `aria-labelledby` 连接标题。
- 禁止事项：禁止多个 section 使用相同标题层级但无语义顺序。
- 生成示例：`<section aria-labelledby="latest-heading">...</section>`

## Announcement

- 使用场景：公告、提示、运营信息、版本提醒。
- 视觉结构：信息图标、标题、正文、可选链接；白色或浅层表面，6px 圆角。
- Token 依赖：`color.surface.card`、`radius.card.default`、`shadow.card.hover`、`spacing.4`。
- 状态规则：可关闭公告需要保留关闭状态；链接 hover 使用主色。
- 响应式规则：移动端正文允许换行，不得横向溢出。
- 可访问性规则：重要公告可使用 `role="status"`，可关闭按钮有名称。
- 技术实现提示：正文允许选择文本。
- 禁止事项：禁止公告覆盖主要内容。
- 生成示例：`<aside class="vc-announcement">...</aside>`

## Card

- 使用场景：视频、文章、活动、功能、计划和推荐项。
- 视觉结构：16:9 媒体、标题、元信息、可选标签和操作。
- Token 依赖：`radius.card.default`、`grid.media.aspect`、`shadow.card.hover`、`motion.transform.cardHover`。
- 状态规则：hover 上移并显示轻阴影；focus 显示外部焦点环；active 缩放；loading 使用骨架。
- 响应式规则：移动端允许 1 到 2 列；标题最多两行。
- 可访问性规则：整卡可点击时必须只有一个主要交互目标；图片 alt 与标题互补。
- 技术实现提示：使用 `article` 包裹，内部主链接覆盖标题和媒体。
- 禁止事项：禁止卡片内塞入过多按钮；禁止图片比例不稳定导致布局跳动。
- 生成示例：`<article class="vc-card">...</article>`

## MediaCard

- 使用场景：视频、音频、图文内容和推荐内容。
- 视觉结构：16:9 封面、两行标题、作者、播放或浏览计数、时长、日期。
- Token 依赖：`grid.media.aspect`、`radius.card.default`、`typography.size.caption`、`color.text.secondary`。
- 状态规则：hover 标题变主色并浮起；loading 使用封面骨架；error 显示媒体失败提示。
- 响应式规则：桌面网格、列表可选；移动端 1 到 2 列。
- 可访问性规则：主链接文本应包含标题；封面 alt 不重复标题时提供补充描述。
- 技术实现提示：元信息使用列表或分组，数字使用 tabular nums。
- 禁止事项：禁止标题、时长和日期因列宽变化完全消失。
- 生成示例：`<article class="vc-media-card">...</article>`

## CardGrid

- 使用场景：内容列表、推荐区、搜索结果。
- 视觉结构：自动填充网格，卡片之间保持可读间距。
- Token 依赖：`grid.card.min`、`grid.card.gap`、`container.content.max`。
- 状态规则：loading 显示多张骨架；empty 显示空状态；error 显示重试。
- 响应式规则：桌面自动列，移动 1 到 2 列。
- 可访问性规则：列表使用 `section` 加标题，卡片保持合理 tab 顺序。
- 技术实现提示：使用 CSS grid 和 `minmax()`。
- 禁止事项：禁止移动端非必要横向滚动。
- 生成示例：`<section class="vc-card-grid">...</section>`

## Feature List

- 使用场景：产品能力、社区优势、流程说明。
- 视觉结构：图标、短标题、1 到 2 行说明。
- Token 依赖：`spacing.4`、`color.brand.soft`、`radius.card.default`。
- 状态规则：hover 可轻微变色；focus 用于可点击条目。
- 响应式规则：桌面 3 列，平板 2 列，移动端 1 列。
- 可访问性规则：图标为装饰时使用空 alt 或隐藏。
- 技术实现提示：使用 `ul/li`。
- 禁止事项：禁止长段落破坏扫描。
- 生成示例：`<ul class="vc-feature-list">...</ul>`

## Tag / Badge

- 使用场景：分类、数量、状态、等级、筛选。
- 视觉结构：4px 圆角，小字号，水平 padding 8px。
- Token 依赖：`radius.badge.default`、`color.brand.primary`、`typography.size.caption`。
- 状态规则：selected 使用主色；inactive 使用浅背景；disabled 降低透明度。
- 响应式规则：长标签允许换行或截断加 title。
- 可访问性规则：可点击标签使用 button；选中状态使用 `aria-pressed`。
- 技术实现提示：状态徽标与筛选标签使用不同语义元素。
- 禁止事项：禁止只用颜色表示选中。
- 生成示例：`<button class="vc-tag" aria-pressed="true">最新</button>`

## Form

- 使用场景：搜索、登录、反馈、订阅、筛选。
- 视觉结构：6px 圆角输入框、内嵌浅背景、底部 2px 焦点线、可选前后图标。
- Token 依赖：`size.input.default`、`size.input.large`、`color.surface.inset`、`color.focus.ring`。
- 状态规则：focus 显示主色线；error 显示错误色和说明；disabled 降低透明度；loading 保留输入内容。
- 响应式规则：移动端输入高度 44px。
- 可访问性规则：每个输入必须有 label；错误说明通过 `aria-describedby` 关联。
- 技术实现提示：使用原生 input、label、button。
- 禁止事项：禁止只用 placeholder 充当 label。
- 生成示例：`<label for="search">搜索内容</label><input id="search" />`

## Search / Filter

- 使用场景：内容搜索、分类筛选、排序切换。
- 视觉结构：输入框、图标按钮、可选标签组和结果数量。
- Token 依赖：`size.input.default`、`color.surface.inset`、`radius.card.default`。
- 状态规则：focus 显示主色线；loading 显示输入尾部进度；empty 显示无结果说明。
- 响应式规则：移动端搜索独占一行，筛选标签可横向辅助滚动。
- 可访问性规则：搜索框使用 label；筛选按钮使用 `aria-pressed`。
- 技术实现提示：搜索提交与输入清除按钮分离。
- 禁止事项：禁止把筛选状态只放在颜色里。
- 生成示例：`<form role="search" class="vc-search">...</form>`

## Modal

- 使用场景：登录、设置、确认、轻量表单。
- 视觉结构：6px 圆角、玻璃模糊、轻阴影、标题栏、内容区和操作区。
- Token 依赖：`blur.glass`、`shadow.card.hover`、`radius.card.default`、`zIndex.overlay`。
- 状态规则：进入时淡入和轻位移；关闭时快速淡出；loading 不关闭焦点陷阱。
- 响应式规则：移动端宽度不超过视口减 32px，内容可滚动。
- 可访问性规则：使用 `role="dialog"`、`aria-modal`、焦点陷阱和 Esc 关闭。
- 技术实现提示：背景遮罩不可抢走键盘焦点。
- 禁止事项：禁止无标题弹窗；禁止关闭按钮不可聚焦。
- 生成示例：`<dialog class="vc-modal">...</dialog>`

## Drawer / Flyout

- 使用场景：移动菜单、设置、通知、用户面板。
- 视觉结构：侧向或锚点浮层，玻璃模糊，6px 圆角，轻阴影。
- Token 依赖：`blur.glass`、`motion.duration.medium`、`zIndex.overlay`。
- 状态规则：进入淡入和位移；退出快速淡出；背景内容可轻缩放或位移。
- 响应式规则：移动端抽屉宽度不超过 80vw；桌面 flyout 锚定触发器。
- 可访问性规则：打开后管理焦点，Esc 关闭。
- 技术实现提示：遮罩点击可关闭，但不能替代关闭按钮。
- 禁止事项：禁止抽屉覆盖后无法键盘退出。
- 生成示例：`<aside class="vc-drawer">...</aside>`

## Toast

- 使用场景：短反馈、成功、警告、错误、信息提示。
- 视觉结构：轻玻璃表面、4px 圆角、图标、短文本、可选底部进度。
- Token 依赖：`blur.glass`、`radius.badge.default`、`zIndex.toast`、`motion.duration.loading`。
- 状态规则：success、warning、error、info 使用对应状态色；reduced motion 关闭进度动画。
- 响应式规则：移动端宽度不超过视口减 32px。
- 可访问性规则：使用 `role="status"` 或 `role="alert"`。
- 技术实现提示：自动消失前允许用户继续操作。
- 禁止事项：禁止 toast 承载长说明。
- 生成示例：`<div role="status" class="vc-toast">已保存</div>`

## Tooltip

- 使用场景：图标说明、快捷提示、辅助说明。
- 视觉结构：轻玻璃小浮层、4px 圆角、短文本。
- Token 依赖：`blur.glass`、`zIndex.tooltip`、`shadow.card.hover`。
- 状态规则：hover 和 focus 均可触发；离开后消失。
- 响应式规则：移动端优先使用可点击说明或底部浮层。
- 可访问性规则：不要把必要信息只放 tooltip。
- 技术实现提示：使用 `aria-describedby` 关联。
- 禁止事项：禁止 tooltip 遮挡触发器。
- 生成示例：`<span role="tooltip" class="vc-tooltip">...</span>`

## Skeleton

- 使用场景：卡片、列表、媒体、表单加载。
- 视觉结构：浅灰或浅粉块，匹配真实内容尺寸。
- Token 依赖：`color.surface.inset`、`radius.card.default`、`grid.media.aspect`。
- 状态规则：默认可轻微 breathe；reduced motion 下静态。
- 响应式规则：骨架列数与最终布局一致。
- 可访问性规则：容器声明 `aria-busy="true"`。
- 技术实现提示：避免骨架导致布局跳动。
- 禁止事项：禁止用随机尺寸骨架破坏节奏。
- 生成示例：`<div class="vc-skeleton" aria-hidden="true"></div>`

## EmptyState

- 使用场景：无内容、无搜索结果、未登录内容。
- 视觉结构：轻图标、短标题、短说明、一个操作。
- Token 依赖：`color.brand.soft`、`spacing.6`、`radius.card.default`。
- 状态规则：操作按钮完整支持 hover、focus、active。
- 响应式规则：移动端居中或贴近内容区顶部。
- 可访问性规则：文本说明必须可见。
- 技术实现提示：空状态占位应保持网格区域稳定。
- 禁止事项：禁止使用失败或责备语气。
- 生成示例：`<div class="vc-empty-state">...</div>`

## ErrorState

- 使用场景：请求失败、媒体失败、表单失败、权限不足。
- 视觉结构：错误图标、短标题、说明、重试或返回。
- Token 依赖：`color.state.error`、`radius.card.default`、`spacing.4`。
- 状态规则：重试按钮 loading 时保持宽度。
- 响应式规则：移动端操作按钮可全宽。
- 可访问性规则：关键错误使用 `role="alert"`。
- 技术实现提示：错误说明与具体区域绑定。
- 禁止事项：禁止只显示错误码。
- 生成示例：`<div role="alert" class="vc-error-state">...</div>`

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
- 视觉结构：短标题、短说明、主按钮、可选次按钮。
- Token 依赖：`color.brand.primary`、`color.brand.soft`、`spacing.8`、`radius.card.default`。
- 状态规则：按钮完整覆盖交互状态；loading 显示进度。
- 响应式规则：移动端按钮全宽或上下堆叠。
- 可访问性规则：CTA 目标明确，避免多个相同按钮文本指向不同动作。
- 技术实现提示：使用独立 section。
- 禁止事项：禁止一屏出现过多同强度 CTA。
- 生成示例：`<section class="vc-cta">...</section>`

## Testimonial

- 使用场景：社区反馈、用户评价、创作者故事。
- 视觉结构：头像占位、短引语、名称占位、角色占位。
- Token 依赖：`color.surface.card`、`radius.card.default`、`shadow.card.hover`。
- 状态规则：轮播必须可暂停；hover 不影响可读性。
- 响应式规则：移动端单列。
- 可访问性规则：轮播区域提供暂停按钮；引用文本使用语义结构。
- 技术实现提示：使用静态列表优先。
- 禁止事项：禁止虚构真实人物身份。
- 生成示例：`<blockquote>这是一段可替换评价。</blockquote>`

## Stats

- 使用场景：社区规模、内容数量、增长指标、产品能力。
- 视觉结构：大数字、短标签、可选图标。
- Token 依赖：`typography.size.hero`、`color.brand.primary`、`spacing.4`。
- 状态规则：数字加载时用骨架或占位；错误时隐藏数字并显示说明。
- 响应式规则：桌面 3 到 4 列，移动端 2 列或 1 列。
- 可访问性规则：数字需有单位；不要只靠颜色表达变化。
- 技术实现提示：动态数字应避免频繁跳动。
- 禁止事项：禁止使用不可验证的真实业务数字。
- 生成示例：`<div class="vc-stat"><strong>12k</strong><span>内容条目</span></div>`

## Media Block

- 使用场景：展示视频封面、界面预览图、产品画面、内容集合。
- 视觉结构：稳定比例盒、圆角裁切、可选播放按钮和标题层。
- Token 依赖：`grid.media.aspect`、`radius.card.default`、`color.brand.primary`。
- 状态规则：加载中使用骨架；失败时显示图标、说明和重试。
- 响应式规则：移动端保持 16:9 或 4:3，不压缩文字。
- 可访问性规则：提供 alt；播放按钮有明确 label。
- 技术实现提示：使用 `picture` 或 `img`，加 `loading="lazy"`。
- 禁止事项：禁止图片拉伸变形。
- 生成示例：`<figure class="vc-media-block">...</figure>`

## Pricing / Plan Block

- 使用场景：会员、套餐、服务层级、功能对比。
- 视觉结构：轻卡片、计划名、价格占位、功能列表、操作按钮。
- Token 依赖：`radius.card.default`、`border.divider.default`、`color.brand.soft`。
- 状态规则：推荐计划使用浅强调背景或徽标，不使用强烈放大。
- 响应式规则：桌面 3 列，平板 2 列，移动端 1 列。
- 可访问性规则：价格、周期和限制必须文本明确。
- 技术实现提示：对比表需要表格语义或清晰列表。
- 禁止事项：禁止隐藏限制条件。
- 生成示例：`<article class="vc-plan">...</article>`
