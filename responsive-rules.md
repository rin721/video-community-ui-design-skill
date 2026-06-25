# Responsive Rules

## Desktop

- 视口宽度达到 `breakpoint.desktop.min` 时显示 `size.nav.rail` 固定左侧窄轨。
- 主内容左侧必须避开窄轨，内容容器使用 `container.content.max`。
- Masthead 高度使用 `layout.masthead.height`，字标居中，斜向色带和点阵完整显示。
- 分类 tabs 横向排列，不折行，高度绑定 `layout.category.height`，首页 selected 使用短 indicator。
- 媒体卡片使用高密度网格，外层最小列宽绑定 `grid.feed.min`，封面槽保持 16:9 和 `grid.media.coverWidth` 视觉节奏。
- 公告、筛选和 CTA 可横向排列。

## Tablet

- 视口宽度处于 `breakpoint.mobile.max` 到 `breakpoint.tablet.max` 时内容 padding 使用 `container.content.paddingTablet`。
- 可隐藏窄轨或保留压缩边界，但不得挤压卡片。
- Masthead 高度从 `layout.masthead.height` 向 `layout.masthead.mobileHeight` 过渡，装饰透明度降低。
- 媒体卡片保持 2 到 3 列。
- 公告正文允许换行，分类 tabs 可换行或轻横滚。

## Mobile

- 视口宽度不超过 `breakpoint.mobile.max` 时隐藏桌面窄轨。
- 顶部栏高度和底部导航高度使用 `size.nav.mobileBar`。
- 内容 padding 使用 `container.content.paddingMobile`，并给上下固定导航预留空间。
- 首页移动端默认隐藏 decorative masthead 和分类 tabs，让 TopBar 后直接进入公告、媒体流标题和内容网格；需要品牌强调时才使用 `layout.masthead.mobileHeight` 的紧凑 masthead。
- 卡片默认单列；宽度大于 360px 且标题可读时可双列。
- 分类 tabs 可横向滚动，但滚动区域必须有边界，不能造成页面级溢出。
- 公告信息条垂直排列，正文自然换行。

## 容器宽度

- `container.content.max`: 内容容器最大宽度。
- `container.feed.max`: 媒体流最大宽度。
- `container.narrow.max`: 760px。
- `container.content.paddingDesktop`: 5vw。
- `container.content.paddingTablet`: 平板容器 padding。
- `container.content.paddingMobile`: 移动容器 padding。

## 栅格变化

- 桌面：`repeat(auto-fit, minmax(var(--grid-feed-min), 1fr))` 或等价 token 绑定。
- 平板：2 到 3 列。
- 移动：1 到 2 列。
- 卡片间距桌面使用 `grid.feed.gap`，移动端从 `grid.feed.gap` 和 `spacing.*` 派生。
- 平面媒体卡在任何断点都不得靠外层 shadow/large lift 分列；列感来自封面比例、标题行高、元信息和网格间距。
- 骨架列数必须与最终布局一致。

## 导航变化

- 桌面侧边导航显示图标组、中段竖排字标或斜条纹、底部设置入口。
- 平板可保留侧边导航或改为顶部/底部组合。
- 移动顶部栏承载菜单、短字标和工具入口。
- 移动底部导航承载 3 到 5 个主入口。
- 当前项必须在所有断点下可见。

## 卡片重排

- 封面比例固定为 16:9。
- 标题最多两行，元信息可换行但不消失。
- 移动双列时隐藏低优先级说明，不隐藏标题、作者、时长和日期。
- 列表模式需保持媒体和文本的最小宽度。

## 字号缩放

- 字标式桌面标题使用 `typography.size.wordmark`。
- 移动字标使用 `typography.size.mobileWordmark`。
- Section 标题使用 `typography.size.sectionTitle`。
- 正文使用 `typography.size.body`。
- 元信息使用 `typography.size.caption`。
- 不使用 viewport width 缩放字体。

## Section Spacing 缩放

- 桌面 section 间距使用 `spacing.8` 到 `spacing.section.lg`。
- 平板 section 间距使用 `spacing.6` 到 `spacing.8`。
- 移动 section 间距从 `spacing.4`、`spacing.6` 和 `spacing.8` 派生。
- Masthead 与 tabs 之间可贴近，但必须有分割线或背景边界。

## 图片比例

- 视频封面默认 16:9。
- 产品预览可使用 4:3 或 16:10。
- Avatar 使用正方形或圆形。
- 所有图片必须设置 width、height 或 aspect-ratio，避免布局跳动。

## 移动端触控目标

- 所有按钮、导航项、tab、关闭按钮不小于 `size.touch.min`。
- 底部导航项高度跟随 `size.nav.mobileBar`。
- 触控目标之间保留 `spacing.2` 或明确边界。
- 横向 tabs 不得过窄，单项最小可点击宽度不低于 `size.touch.min`。

## 横竖屏注意事项

- 横屏移动端减少 masthead 高度和 section 间距。
- 固定底部导航不得遮挡最后一张卡片或 CTA。
- 小高度桌面可隐藏窄轨中段装饰，保留顶部图标和底部设置。
- Drawer 高度使用动态视口单位时需兼容安全区。

## 长文本折行策略

- 卡片标题使用两行截断或自然换行，不能溢出卡片。
- 公告正文允许自然换行。
- 分类 tab 长文本优先缩短文案；必要时使用 tooltip 或换行。
- 按钮文本不应小于 `typography.size.caption`；超长按钮改为多行或全宽。
- Footer 链接可换行或分组，不能压缩到不可读。
