# Validation Checklist

## 美学风格

- [ ] 是否使用浅色基底和柔和主色。
- [ ] 是否具备字标式 masthead、斜向色带和几何装饰。
- [ ] 装饰是否低干扰，不压过内容。
- [ ] 圆角、阴影和留白是否保持轻盈。

## 视觉框架

- [ ] 桌面是否有绑定 `size.nav.rail` 的固定窄轨或等效轻导航边界。
- [ ] 移动端是否有顶部栏和底部导航。
- [ ] 首屏是否出现分类 tabs、公告信息条和媒体流入口。
- [ ] Masthead 是否不占满首屏。

## Design Tokens

- [ ] 是否使用 `design-tokens.json` 的语义 token。
- [ ] 是否使用 `decoration.*`、`layout.*`、`motion.*` 表达高识别元素。
- [ ] 是否避免散落硬编码颜色、圆角、阴影和断点。
- [ ] 组件 CSS 中裸 `px`、`rgb()`、`#hex`、阴影、断点、z-index 和 motion 值是否只出现在 token 定义层、生成的 CSS variables 层或必要 fallback 中。
- [ ] 主色替换后是否同步 hover、soft、focus、shadow 和装饰。

## Layout Grammar

- [ ] 是否遵循 app shell、navigation frame、masthead frame、content frame、feedback frame。
- [ ] 内容容器是否避开固定导航。
- [ ] 媒体网格是否使用稳定列宽和间距。
- [ ] CTA 和页脚是否不抢主内容。

## Component Recipes

- [ ] 是否包含 BrandHeader、DecorativeMasthead、SidebarRail、CategoryTabs、AnnouncementBar、MediaFeedSection、MediaCard、BottomNav。
- [ ] 是否包含 Button、Navigation、Hero、Section、Card、Feature List、Tag、Form、Modal、Footer、CTA、Testimonial、Stats、Media Block、Pricing / Plan Block。
- [ ] 每个核心组件是否包含用途、结构、token、状态、响应式、可访问性和禁用项。
- [ ] MediaCard 封面下方标题和元信息是否有 token-backed 内边距，避免文本贴住封面或卡片边缘。
- [ ] 首页 MediaCard 是否保持平面 clickable surface，而不是厚 Paper 背景、重投影或大幅 hover lift。
- [ ] MediaCard hover/focus/pressed 是否包含标题变色、封面微动、可见 focus ring 和短点击反馈。
- [ ] 作者、标签等 nested action 是否不会误触发主卡片点击。
- [ ] 视频详情或播放器任务是否包含 VideoPlayerStage、PlayerControlBar、PlayerProgressRail、PlayerDanmakuOverlay 和 MobilePlayerTabs。
- [ ] 播放器是否使用 CSS 几何占位和 mock 状态，而不是目标站截图、真实视频帧或专有素材。
- [ ] 播放器控制条是否包含播放、时间/进度、清晰度/倍速、音量、弹幕和全屏模拟。
- [ ] 是否有 GeometricEmptyState 和 GeometricErrorState。

## MUI Encapsulation

- [ ] `tech_stack: react-mui` 或完整 React 项目是否使用真实 `@mui/material`、`@emotion/react`、`@emotion/styled`。
- [ ] 是否存在 `ThemeProvider`、`CssBaseline` 和 `createTheme({ cssVariables: true })`。
- [ ] SidebarRail、TopBar、CategoryTabs、AnnouncementBar、MediaCard、Toast、BottomNav 是否映射到对应 MUI primitives。
- [ ] SoftIconButton、PillToggle、RippleSurface 是否通过 `IconButton`、`ToggleButton`/`Chip`、`ButtonBase`/`CardActionArea`/`TouchRipple` 等 primitive 封装。
- [ ] 首页 CategoryTabs 是否使用 `Tabs` indicator/text selected；筛选场景才使用 filled pill。
- [ ] MediaCard 是否使用 `Card elevation={0}`/transparent root、`CardActionArea`、`CardMedia`、`CardContent` 的 slot 结构。
- [ ] 播放器是否使用 `Paper`、`Box`、`Slider`、`IconButton`、`Tooltip`、`Select`/`Menu`、`Tabs`/`Tab` 等真实 MUI primitive。
- [ ] 组件差异是否通过 slots、variants、state props、`ownerState`、`slotProps`、theme overrides 或 token-backed `sx` 表达。
- [ ] 是否避免用普通 `div/button/a` 重写已有 MUI primitive 的语义组件。
- [ ] 静态 HTML 输出是否保持零依赖，并明确作为 generic fallback；不得声称实现 MUI 或 Material UI 组件体系。
- [ ] 用户要求 MUI、Material 或通用组件库时，是否走 React MUI 输出，而不是静态 HTML 视觉模仿。

## 组件状态

- [ ] hover 是否可见。
- [ ] active 是否有轻缩放或明确反馈。
- [ ] focus-visible 是否清晰。
- [ ] disabled 是否保留语义。
- [ ] loading 是否不造成布局跳动。
- [ ] error 是否提供恢复动作。
- [ ] empty 是否温和且有下一步。
- [ ] success 是否有 toast 或 inline status。

## 响应式

- [ ] desktop、tablet、mobile 是否分别定义。
- [ ] 移动端是否无横向溢出。
- [ ] 移动视频详情页是否有 sticky 播放器、紧贴播放器的 `信息 / 评论 / 弹幕` tabs，并且底部弹幕输入不遮挡导航。
- [ ] 移动首页是否优先展示公告、媒体流标题和双列网格；若隐藏 masthead/tabs，是否仍保留品牌短标和导航入口。
- [ ] 底部导航是否不遮挡最后内容。
- [ ] 卡片标题和元信息是否在窄宽度下可读。
- [ ] 触控目标是否不小于 `size.touch.min`。

## 可访问性

- [ ] 是否使用语义化 landmarks。
- [ ] 图标按钮是否有名称。
- [ ] 装饰图形是否隐藏给辅助技术。
- [ ] 图片或媒体占位是否有 alt 策略。
- [ ] 表单是否有 label。
- [ ] 错误说明是否可被辅助技术读取。
- [ ] 颜色是否不是唯一信息载体。
- [ ] reduced motion 是否可用。

## 内容规则

- [ ] 标题层级是否合理。
- [ ] 分类、公告、CTA 和状态文案是否短而明确。
- [ ] 卡片元信息顺序是否稳定。
- [ ] 示例内容是否中性可替换。
- [ ] 是否避免真实人物、真实机构、真实产品和真实业务数据。

## 完整前端项目

- [ ] 是否包含入口文件、页面组件、组件层、样式层、fixtures 和运行说明。
- [ ] React 项目是否能执行 `npm run build`。
- [ ] React MUI 项目是否能解析 MUI 依赖并通过 TypeScript 构建。
- [ ] 静态项目是否可直接打开或通过静态服务器访问。
- [ ] normal、loading、empty、error、success/toast 状态是否可触发。
- [ ] 播放/暂停、进度、音量、清晰度、倍速、弹幕开关和全屏模拟是否可触发。
- [ ] desktop、tablet、mobile 下 masthead、tabs、announcement 和媒体流是否可见。

## 发布清洁度

- [ ] 文件名、目录名、frontmatter、JSON 字符串、Markdown 正文和示例是否只保留第一方规则。
- [ ] 是否不包含特定域、特定品牌、特定页面、特定资产或特定业务实体。
- [ ] 是否不包含工作过程、取样过程、形成过程或关系性说明。
- [ ] 是否不包含不可授权图片、图标、文案或数据。
- [ ] 是否可以在没有其他上下文的情况下独立使用。
