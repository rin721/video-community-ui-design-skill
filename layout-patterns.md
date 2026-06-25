# Layout Patterns

## 页面总体框架

页面使用浅色主背景、固定导航轨道、装饰 masthead、内容容器和可组合分区。桌面端默认使用左侧 `size.nav.rail` 固定窄轨；移动端使用 `size.nav.mobileBar` 顶部栏与底部导航。内容区必须避开固定导航并保留安全间距。

## 框架层级

- `app-shell`: 视口、导航层、滚动内容层、浮层和反馈层。
- `navigation-frame`: 桌面窄轨、移动顶部栏、移动底部栏、分类 tabs。
- `masthead-frame`: 字标式标题、斜向色带、星形、十字点阵、三角角标。
- `content-frame`: 公告、标题组、媒体流、功能区、状态区和 CTA。
- `feedback-frame`: toast、tooltip、drawer、loading bar 和状态页面。

## 首屏组合

高识别页面首屏必须满足：

- 上方出现装饰 masthead，高度由 `layout.masthead.height` 控制。
- Masthead 内包含居中或偏中的字标式标题。
- Masthead 背后或两侧包含 1 到 3 条斜向色带。
- 右上或局部角落包含十字点阵、星形或三角装饰。
- Masthead 下方出现分类 tabs、公告信息条和媒体流标题。
- 下方内容必须露出，禁止 masthead 占满视口。
- 移动端可隐藏 decorative masthead 和分类 tabs，把首屏优先交给 TopBar、AnnouncementBar、媒体流标题和双列内容网格；这属于同一视觉系统的 app-shell 变体。

## Section 节奏

- `masthead-section`: 页面气质与导航过渡。
- `category-section`: 横向 tabs 或移动可滚动 tabs。
- `announcement-section`: 信息图标、短标题、正文、可选链接。
- `feed-section`: 分区标题、计数徽标、媒体卡片网格。
- `feature-section`: 三到六个短功能点，可用于产品页。
- `conversion-section`: 短标题、短说明、主操作和次操作。
- `footer-section`: 低对比链接、语言/主题入口和维护说明。

分区顺序可调整，但内容浏览页应优先展示 masthead、分类、公告和媒体流。

## Hero 模式

- `decorative-masthead`: 字标式标题居中，斜向色带穿过背景，几何装饰贴边。
- `compact-product-hero`: 左侧短标题和说明，右侧媒体槽，顶部仍保留轻装饰。
- `state-hero`: 大号状态码或状态标题，下方使用几何山形/折线作为视觉锚点。

禁止使用大幅营销图占满首屏。Hero 必须让下方 section 有可见提示。

## 内容区模式

- 公告使用白色或轻玻璃表面，宽度跟随内容容器。
- 分类 tabs 使用横向文本按钮，首页 active 优先使用主色文字和短底线；筛选场景才使用 pill/filled selected。
- 分区标题可由小图标、标题和数量 badge 组成。
- 信息密度优先服务浏览，不为装饰牺牲卡片可读性。

## 卡片区模式

- 默认使用自动填充网格：`repeat(auto-fit, minmax(var(--grid-feed-min), 1fr))` 或对应框架的 `grid.feed.min` 绑定。
- 桌面卡片最小宽度使用 `grid.feed.min`，间距使用 `grid.feed.gap`。
- 首页媒体卡片默认是平面链接卡：外层不使用 Paper 背景和阴影，封面槽使用 `grid.media.aspect`，正文区必须使用 token-backed padding 避免标题/元信息贴边。
- 桌面高密度首页可让外层点击宽度由 `grid.feed.min` 控制，封面视觉宽度由 `grid.media.coverWidth` 控制，形成 5 列左右的内容密度。
- 平板使用 2 到 3 列。
- 移动端宽度充足时可双列，不足时单列。
- 列表模式使用左侧小媒体、右侧标题和横排元信息。

## CTA 区模式

- CTA 必须比媒体流弱，不得抢走内容入口。
- 可使用浅粉背景、短标题、短说明和 1 到 2 个按钮。
- 移动端按钮可全宽或上下排列。
- CTA 不得遮挡底部导航。

## 页脚模式

- 页脚使用低对比文字、轻分割线和紧凑链接组。
- 页脚不得承载关键主操作。
- 移动端链接组可两列或单列。

## 栅格规则

- 内容容器最大宽度默认使用 `container.content.max`。
- 桌面左右 padding 默认使用 `container.content.paddingDesktop`，同时避开 `size.nav.rail` 窄轨。
- 平板 padding 默认使用 `container.content.paddingTablet`。
- 移动 padding 默认使用 `container.content.paddingMobile`。
- 媒体封面默认 16:9。
- 固定导航与内容之间至少保留 `spacing.4` 可读间距。

## 容器宽度

- `container.content.max`: 页面主体最大宽度。
- `container.feed.max`: 媒体流最大宽度，可等于主体宽度。
- `container.narrow.max`: 表单、设置和说明类内容最大宽度。
- `container.fullBleed.safe`: 装饰层可全宽，但内容必须受容器约束。

## 响应式重排方式

- `breakpoint.desktop.min` 及以上：显示桌面窄轨，隐藏移动底栏，masthead 装饰完整。
- `breakpoint.mobile.max` 到 `breakpoint.tablet.max`：可保留窄轨或压缩导航，内容 grid 2 到 3 列，装饰减少密度。
- `breakpoint.mobile.max` 及以下：显示顶部栏和底部导航，隐藏桌面窄轨，内容 padding 使用 `container.content.paddingMobile`；首页可隐藏 masthead 和分类 tabs，把公告和媒体流上移。
- 公告和 tabs 在移动端必须换行或明确横向滚动，不得产生页面级横向溢出。

## 常见页面模板

- `homepage`: 装饰 masthead、分类 tabs、公告、媒体流、功能区、CTA、页脚。
- `discovery`: 顶部栏、筛选 tabs、公告、媒体网格、loading/empty/error 分支。
- `landing`: compact product hero、功能区、媒体演示、CTA、页脚。
- `product-section`: 小型装饰标题、媒体槽、功能列表、轻 CTA。
- `mobile-page`: 顶部栏、公告、tabs、单/双列卡片、底部导航、toast。
- `state-page`: 状态标题、短说明、恢复操作、几何山形或斜线底部装饰。

## 可替代布局组合

- 窄轨可替换为顶部横向导航，但移动底部导航仍需保留。
- Masthead 可替换为紧凑装饰标题，但必须保留字标式节奏和几何装饰。
- 公告条可替换为 inline alert、toast 或 soft panel。
- 媒体网格可替换为列表、横向 rail 或精选卡片，但 16:9 媒体比例应保留。
- CTA 可替换为表单、订阅条或轻提示，不得强营销化。

## 过拟合规避规则

- 不固定具体导航项、分类名、文案、媒体标题或业务数据。
- 不复制专有图标、logo、图片和插画。
- 不把首屏顺序写死；只要求关键模块在首屏附近建立视觉和浏览入口。
- 不把装饰图形做成不可替换资产；必须用 CSS、token 或通用矢量形状表达。
- 不因高识别度牺牲可读性、可访问性和响应式稳定性。
