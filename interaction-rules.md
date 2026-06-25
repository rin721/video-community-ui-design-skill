# Interaction Rules

## 总体原则

交互必须轻、快、可预期。默认使用短时颜色变化、浅背景、轻位移、小幅缩放、细进度和明确焦点。所有动效必须能在 `prefers-reduced-motion: reduce` 下关闭或降级。

## Hover

- 首页媒体卡片 hover 保持外层平面，不整体上浮、不增加重阴影；只让标题变为 `color.brand.hover`，封面槽使用 `motion.transform.mediaHover` 或轻微亮度变化。
- framed card、CTA、Paper 入口 hover 可使用 `motion.transform.cardHover` 和 `shadow.card.hover`，但不能套用到密集媒体网格。
- 侧轨和底部导航 hover 使用浅粉圆形背景，不改变布局尺寸。
- 分类 tabs hover 文字变主色，active tab 保持视觉优先级。
- 公告链接 hover 使用主色和可见 underline。
- CTA 与按钮 hover 可加轻阴影，不使用大面积变形。

## Active

- 按钮、图标按钮、pill toggle 和 tab active 缩放到 `motion.transform.pressScale`。
- 平面媒体卡片 active 使用极短的 press/ripple 反馈，避免整卡大幅缩放导致网格抖动。
- 设置类图标 active 旋转角度从 motion/decoration token 派生。
- 侧轨 active 指示条高度从 `size.nav.rail`、`spacing.*` 或组件局部 token 派生，形成按压反馈。
- 移动底部导航 active 不得推挤其他入口。

## Focus

- 所有可交互元素必须使用 `:focus-visible`。
- 焦点环使用 `color.focus.ring` 或 `border.focus.default`。
- 卡片整卡可点击时，焦点环放在卡片外缘。
- 抽屉、modal 和 flyout 打开后必须管理焦点并支持 Esc 退出。
- 焦点样式不得只靠颜色变化，至少包含 outline、box-shadow 或 underline。

## Disabled

- 禁用控件使用 `opacity.disabled`，同时保留语义属性。
- 禁用按钮不得响应 hover、active 或提交。
- 禁用 tab 保留文本可读性。
- 禁用状态不得和 loading 状态混淆。

## Loading

- 页面导航加载可使用由 `spacing.1` 派生的顶部细进度。
- 按钮 loading 可使用由 `spacing.1` 派生的底部细进度或内联 spinner。
- 媒体流 loading 使用与最终卡片尺寸一致的骨架。
- Toast 自动消失可使用由 `spacing.1` 派生的进度条，时长默认 `motion.duration.loading`。
- Loading 不得造成布局跳动。

## Error

- 错误状态必须包含短标题、原因说明和恢复动作。
- 表单错误需与字段通过 `aria-describedby` 关联。
- 媒体失败保持 16:9 比例盒，并提供替代说明。
- 页面级错误可使用几何底部装饰，但不得遮挡恢复操作。

## Success

- 成功反馈优先使用 toast 或 inline status。
- 成功色只用于状态，不替代主色。
- 成功 toast 可自动消失，但关闭按钮必须可聚焦。
- 操作完成后不得突然跳转，除非用户明确触发。

## Empty

- 空状态使用温和语气、短说明和一个恢复动作。
- 内容网格 empty 应占据网格区域，避免页面高度突然塌陷。
- 可使用星点、斜线或几何峰形装饰，但必须低透明度。
- 搜索 empty 应提供清除筛选或扩大范围的动作。

## Scroll

- 固定导航不随主内容滚动。
- 主滚动区应给顶部栏和底部栏预留空间。
- 滚动条可使用轻量自定义样式，但不能隐藏必要滚动能力。
- 移动端不要把公告和 tabs 做成不可见的横向区域。

## Transition

- 颜色、背景、fill、box-shadow 默认使用 `motion.duration.instant` 到 `motion.duration.fast`。
- 卡片 hover、按钮 active、导航状态默认使用 `motion.duration.fast`。
- Drawer、offcanvas、viewport 位移默认使用 `motion.duration.medium`。
- Loading 进度循环默认使用 `motion.duration.loading`。
- 标准缓动使用 `motion.easing.standard`；轻弹性进入使用 `motion.easing.spring`。

## Micro-interaction

- 导航项首次出现可用 `jump-in`：延迟和时长从 `motion.duration.*` 派生。
- Masthead 装饰可低透明度缓慢漂移，但必须可关闭。
- 侧轨中段斜条纹可静态表达运动感，不需要循环动画。
- 卡片封面 hover 缩放从 `motion.transform.mediaHover` 派生，缩放层限制在 media slot 内，避免眩晕和布局位移。
- Clickable surface 可使用 MUI `TouchRipple` 或等价的短暂圆形 ripple；静态 HTML 模式可用 `span` ripple 模拟，但 ripple 不得改变元素尺寸。
- Toast 进度条使用比例进度表达，reduced motion 下隐藏进度动画。

## Click Surface Rules

- `SoftIconButton`：圆形点击面，桌面尺寸绑定 `size.control.icon`，详情动作可绑定 `size.control.action`；默认透明，hover/selected 使用 `color.brand.soft`，active 使用轻缩放或图标旋转。
- `TabItem`：首页分类使用文本 tab、短 indicator 和 `aria-selected`；不要把首页分类做成整块填充 pill。筛选/搜索场景才使用 pill toggle。
- `PillToggle`：用于搜索筛选、标签筛选和详情页标签，选中态使用主色底和白字，未选中态使用低对比 inset surface，并通过 `aria-pressed` 或 checkbox state 表达。
- `MediaCard`：外层是平面 clickable surface，封面、标题和元信息共同响应点击；作者/标签等次级入口必须 stop propagation 或独立处理，不能误触发主卡片。
- `MediaCard` 点击后应给出 route/loading 反馈：顶部细进度、card press/ripple 或 toast 三者至少其一；不要让卡片看起来只是静态文本。
- `AnnouncementBar` 作为 Paper/Alert surface，不让整条默认跳转；只有 action/link/button 拥有点击反馈。
- `BottomNav` 和 `SidebarRail` 的 active state 必须同步路由或本地视图状态，使用 `aria-current`、selected class 或 MUI selected prop，不只改变图标颜色。

## Motion Duration

- `motion.duration.instant`: 用于颜色和填充变化。
- `motion.duration.fast`: 用于 hover、active、焦点和卡片。
- `motion.duration.medium`: 用于 drawer、offcanvas 和视图位移。
- `motion.duration.loading`: 用于进度和骨架循环。

## Easing

- 标准界面过渡使用 `motion.easing.standard`。
- 进度条确定态使用 `motion.easing.progress`。
- 轻弹性进入使用 `motion.easing.spring`。
- 关闭动效使用对应 motion easing token 或从 `motion.easing.standard` 派生。

## Reduced Motion

- 关闭 jump-in、漂移、旋转、缩放和循环装饰。
- 保留颜色、边框和显隐变化以维持反馈。
- Loading 使用静态骨架或不动进度。
- Drawer 可使用无位移淡入淡出。

## Keyboard Interaction

- Tab 顺序遵循视觉顺序：顶部栏、窄轨/底栏、分类 tabs、公告链接、媒体卡片、CTA、页脚。
- 方向键可在 tabs、菜单和底部导航中移动焦点。
- Enter/Space 激活按钮和 tab。
- Esc 关闭 modal、drawer、flyout 和 toast。
- 可关闭组件必须提供键盘可达的关闭按钮。

## Touch Interaction

- 触控目标不小于 `size.touch.min`。
- 相邻触控目标之间保留至少 `spacing.2` 视觉间距或明确边界。
- 底部导航保留 safe-area padding。
- 移动端 hover 效果不能作为唯一反馈。
- 长文本、公告和 tabs 不得造成页面横向溢出。

## Offcanvas

- 打开时 drawer 从左侧进入，背景内容使用 `motion.transform.offcanvasViewport`。
- 背景内容添加轻玻璃、`radius.card.default` 圆角和柔和阴影。
- 遮罩点击和 Esc 都能关闭。
- 关闭时用较短时长恢复，避免拖沓。

## Toast

- 默认从顶部或右下区域进入，宽度不超过视口减去 `spacing.8`。
- 文本保持短句，必要时链接到详情区域。
- 信息、成功、警告、错误状态使用独立状态色和相同结构。
- 自动消失时长默认从 `motion.duration.loading` 派生。
