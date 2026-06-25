# Style Profile

## 风格关键词

- 浅底樱粉
- 中心字标式首屏
- `size.nav.rail` 固定窄轨
- 斜向色带
- 星形/十字/三角几何
- 分类横栏
- 公告信息条
- 图片优先媒体流
- 白底播放器舞台
- 粉色几何播放器占位
- 细进度控制条
- 移动 sticky 播放器
- 信息/评论/弹幕三 tab
- 平面媒体链接卡
- MUI-style 点击面封装
- 低圆角
- 轻玻璃
- 弹性微动效
- 高可读内容密度

## 美学风格

界面使用白色或近白色基底，樱粉作为高识别强调色。视觉气质应明亮、亲和、年轻、轻技术感，带有轻二次元社区的活泼感，但主体必须保持内容浏览效率。装饰用于建立气质，不承担业务信息。

## 视觉框架

视觉框架由五层组成：

- Shell 层：固定窄轨、移动顶部栏、移动底部导航、滚动容器。
- Masthead 层：字标式标题、斜向色带、星形、十字点阵、三角角标和轻色块。
- Content 层：分类 tabs、公告信息条、分区标题、媒体网格、功能区和 CTA。
- Media 层：16:9 封面、白底播放器舞台、渐变/几何占位、弹幕 overlay、头像/作者、元信息和媒体失败状态。
- Feedback 层：页面细进度、toast、tooltip、flyout、empty、error、success。

每一层都必须有明确 z-index、间距和状态边界。导航、浮层、装饰和内容不得互相遮挡。

## 设计系统

设计系统以 semantic tokens 和 decorative tokens 为核心。组件不得直接绑定单点视觉值。颜色、字体、间距、圆角、阴影、断点、容器、栅格、动效、装饰尺寸和状态都必须通过 token 调用。组件 recipe 必须描述结构、变体、状态、响应式、可访问性和禁用项。

## 完整组件派生

基础控件派生路径如下：

- Primitive: Button、IconButton、TextBox、Badge、Progress、Avatar、Divider。
- Shell: AppShell、SidebarRail、TopBar、BottomNav、Offcanvas、ScrollContainer。
- Brand: BrandHeader、DecorativeMasthead、WordmarkText、AccentStripe、StarAccent、PlusGrid、TriangleMark。
- Navigation: CategoryTabs、TabItem、RailItem、BottomNavItem、FlyoutMenu。
- Content: AnnouncementBar、MediaFeedSection、MediaCard、VideoPlayerStage、PlayerControlBar、PlayerProgressRail、PlayerDanmakuOverlay、MobilePlayerTabs、FeatureList、Stats、MediaBlock。
- Overlay: Modal、Drawer、Flyout、Tooltip、Toast。
- State: Skeleton、GeometricEmptyState、GeometricErrorState、SuccessState、LoadingIndicator。
- Conversion: CTA、PricingBlock、PlanCard、ComparisonRow。

派生组件必须继承同一圆角、阴影、状态、焦点和 motion 规则。

## 交互与动效

交互应轻、快、可预期。导航项进入可使用短促 jump-in；首页媒体卡片保持平面，hover 只让封面槽微缩放、标题变主色并显示清晰 focus；Paper/CTA 类卡片才允许轻上移。图标按钮 hover 显示浅粉圆形背景；active 使用小幅缩放；设置或工具图标可轻旋转；抽屉打开时内容层可位移并缩放；toast 使用底部细进度；循环装饰必须低透明度并在 reduced motion 下关闭。

## 品牌表达

品牌表达不依赖专有标识，而依赖可替换的视觉语言：

- 字标式大标题表达轻快、年轻和可记忆性。
- 斜向色带和条纹表达运动感与媒体流动感。
- 星形、十字和三角表达轻二次元与创作者社区气质。
- 粉色柔光表达亲和和温度。
- 图标化窄轨表达常驻入口和轻技术感。
- 图片优先的平面媒体链接卡表达内容驱动，公告、搜索面板和浮层才使用 Paper 表面。
- 视频详情页通过白底播放器舞台、细进度条、紧凑控制条、三 tab 信息架构和作者关注卡表达内容播放语境。
- 短文案和紧凑元信息表达低负担浏览。

## 品牌气质

界面应呈现友好、明亮、活泼、轻技术感和社区感。用户应先感知到清爽的内容场，再识别操作入口。装饰应像轻量舞台，不能像营销页背景，也不能像后台管理边框。

## 视觉密度

- 桌面端采用中等偏高内容密度，同屏应能看到分类、公告和多张媒体卡片。
- 平板端保留核心装饰，但减少空白和横向色带面积。
- 移动端优先保证标题、封面、作者和元信息完整，允许 1 到 2 列卡片。
- 组件之间不使用厚重边界，依靠留白、弱阴影、浅背景、字号层级和装饰区域组织信息。
- 首页媒体网格不使用连续卡片阴影墙；高密度来自 16:9 封面、两行标题、12px 级元信息和稳定点击面。

## 空间感

- 主背景保持干净，装饰集中在 masthead、窄轨中段、状态页和局部浮层。
- 主内容区域使用 `spacing.4` 到 `spacing.8` 的局部间距，section 间距使用 `spacing.6` 到 `spacing.section.lg`。
- 桌面端内容应避开 `size.nav.rail` 固定窄轨，左侧保留稳定边界。
- 移动端顶部栏与底部导航固定，内容区预留安全内边距。
- Masthead 必须露出下方内容，不得占满首屏。

## 色彩倾向

- 主色使用柔和樱粉，避免霓虹、高饱和紫或大面积渐变。
- 中性色偏温，文字使用深灰黑而非纯黑。
- 浅粉用于选中背景、装饰色块、信息条和轻提示。
- 状态色保持清晰：成功绿、警告橙、错误红、信息蓝。
- 背景以白色或近白色为主，局部可使用轻粉雾面。

## 字体气质

- 使用干净的无衬线字体，并优先保证跨语言可读性。
- 字标式标题可使用 700 到 800 字重、紧凑行高和轻微字距控制，字距不得为负。
- 卡片标题使用 600 左右字重，最多两行。
- 元信息使用 `typography.size.caption`，小图标或短标签辅助扫描。

## 图像与图标风格

- 图像以 16:9 内容封面为主，使用 object-fit cover。
- 无图片时使用柔和渐变占位，避免真实素材依赖。
- 播放器无真实视频时使用 CSS 几何占位、粉色进度和非交互弹幕 overlay，不使用截图或真实帧画面。
- 图标应为实心或线面混合，尺寸从 `size.control.icon` 和组件局部 icon token 派生。
- 图标按钮使用圆形点击面，激活状态使用浅粉背景和主色图标。
- 分类首页 tab 使用文本、短底线和主色选中；筛选/tag 场景才使用胶囊填充控件。
- 装饰图形使用星形、十字点、斜线、三角和低透明度色块。

## 适合的使用场景

- 视频内容社区
- 媒体内容导航
- 创作者主页
- 内容发现首页
- 轻量产品介绍
- 移动内容浏览
- 社区运营页面
- 组件规范和前端项目模板

## 不适合的使用场景

- 高压销售页面
- 深色重质感后台
- 复杂数据仪表盘
- 法律、医疗、金融等强严肃界面
- 以大幅摄影或沉浸叙事为核心的页面

## 可替换风格参数

- 主色可替换为柔和蓝、青、紫或绿，但装饰、focus、shadow 和 selection 必须同步派生。
- 字体可替换为系统无衬线或品牌无衬线。
- 圆角可在 `radius.badge.default`、`radius.card.default` 和圆形控制 token 之间调整。
- 装饰强度可在低、中、高之间调整；高强度也不得压过内容。
- 动效可在静态、轻动效、弹性微动效之间调整。

## 视觉一致性判断标准

- 首屏是否同时呈现 masthead、分类、公告和内容入口。
- 移动首页是否用 TopBar、公告、内容标题和底部导航建立入口，而不是强行塞入桌面 masthead。
- 媒体卡片是否像 MUI `CardActionArea` 一样有可点击反馈、焦点环、ripple/press 状态和 nested action 处理，而不是静态图片加文字。
- 导航是否保持 `size.nav.rail` 轻量边界和明确激活状态。
- 装饰是否使用斜向色带、星点、十字和三角，而不是通用渐变块。
- 主内容是否仍然比装饰更重要。
- 媒体卡片是否保持 16:9 封面、两行标题和稳定元信息。
- 移动端是否没有横向溢出，底部导航是否不遮挡内容。
- 视频详情移动端是否保持 sticky 播放器、紧贴的 `信息 / 评论 / 弹幕` tabs 和可触达的底部弹幕输入。
- 所有交互状态是否可见且不过度夸张。
