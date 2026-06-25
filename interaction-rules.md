# Interaction Rules

## Hover

- 可点击标题 hover 时使用主色。
- 卡片 hover 可上移 4px 到 6px，并出现轻阴影。
- 图标按钮 hover 使用浅强调背景。
- 次级链接 hover 使用主色，不添加厚重下划线。

## Active

- 按钮、卡片和图标按钮 active 时缩放到约 0.97。
- active 状态应去除或减少阴影。
- 移动端 active 反馈要立即出现。

## Focus

- 所有可键盘操作元素必须有 focus-visible。
- focus ring 使用 `color.focus.ring`，宽度 3px。
- 卡片链接 focus 可使用外部发光，不得被 overflow 裁切。

## Disabled

- 禁用控件降低透明度并阻止点击。
- 禁用状态仍需保留文本可读性。
- 禁用按钮不得只变成低对比灰块。

## Loading

- 页面加载使用顶部细进度条或局部骨架。
- 卡片加载使用 16:9 骨架封面、两行标题骨架和元信息骨架。
- 按钮 loading 使用内部进度或 spinner，并保持原按钮宽度。

## Error

- 错误使用 `color.state.error`，并配合文本说明。
- 表单错误要靠近字段，使用 `aria-describedby`。
- 列表错误应提供重试或返回动作。

## Success

- 成功提示使用绿色状态色和短文案。
- 成功 toast 可带 2s 进度条。
- 成功状态不得遮挡主要内容。

## Empty

- 空状态使用柔和图标、短标题、短说明和一个下一步动作。
- 空状态不应使用失败语气。
- 空状态可放在卡片网格位置，保持页面结构稳定。

## Scroll

- 主滚动区域应隐藏默认粗滚动条或使用细滚动条。
- 自定义滚动条只在滚动或 hover 时增强可见性。
- 横向滚动仅用于辅助轨道，不承载唯一主要内容。

## Transition

- 默认过渡使用 250ms。
- 抽屉、弹层和视图位移使用 500ms 到 600ms。
- 颜色变化可缩短到 100ms。
- 所有 transition 应可通过 reduced motion 降级。

## Micro-interaction

- 图标按钮可使用轻微缩放。
- 设置、刷新、上传等图标可在 active 时轻微旋转。
- 装饰粒子或斜线可缓慢移动，但必须低透明度。
- 徽标计数变化可淡入，不应跳动过强。

## Motion Duration

- 即时反馈：100ms。
- 常规 hover：200ms 到 250ms。
- 卡片浮起：250ms。
- 抽屉：600ms。
- toast 进度：2000ms。
- 循环装饰：4000ms 以上。

## Easing

- 常规使用 `cubic-bezier(.19,1,.22,1)`。
- 轻弹性使用 `cubic-bezier(.175,.885,.32,1.275)`。
- 抽屉使用 `cubic-bezier(.1,.9,.2,1)`。
- 退出使用更短的 ease-in。

## Reduced Motion

- 关闭位移、缩放、循环装饰和自动播放动画。
- 保留颜色、轮廓和文本状态变化。
- 进度条可改为静态加载文本或确定进度。

## Keyboard Interaction

- Tab 顺序与视觉顺序一致。
- Escape 关闭弹层或抽屉。
- Enter 和 Space 激活按钮。
- 方向键可在 tab、菜单和底部导航中移动焦点。

## Touch Interaction

- 触控目标不小于 44px。
- 底部导航保留安全区。
- 长按不应触发不可预期拖拽。
- 移动端 hover 状态必须有等效 active 或 selected 状态。
