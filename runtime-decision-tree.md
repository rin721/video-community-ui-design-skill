# Runtime Decision Tree

## 1. 判断页面类型

- `homepage`: 使用装饰 masthead、分类 tabs、公告信息条、媒体流、功能区、CTA 和页脚。
- `discovery`: 强化分类、筛选、媒体网格和 loading/empty/error 分支。
- `landing`: 使用紧凑 hero、功能区、媒体展示、CTA 和页脚。
- `product-section`: 输出可嵌入分区，保留小型装饰标题和媒体槽。
- `mobile-page`: 使用顶部栏、公告、分类、卡片和底部导航。
- `component-spec`: 输出组件、token、状态和可访问性规范。
- `frontend-project`: 读取完整项目规则和模板资产。
- `mui-frontend-project`: 读取完整项目规则、MUI 封装映射和 React 模板资产。

## 2. 判断输入完整度

- 有品牌色时派生完整主色体系。
- 无品牌色时使用默认樱粉体系。
- 有真实文案时检查是否可公开复用；不可复用时改为占位。
- 无内容模型时使用媒体卡片默认字段。
- 有技术栈时选择对应 output mode。
- 无技术栈时输出 UI design spec。

## 3. 读取 Design Tokens

先读取 `design-tokens.json`，建立：

- `color.*`
- `typography.*`
- `spacing.*`
- `radius.*`
- `shadow.*`
- `motion.*`
- `breakpoint.*`
- `layout.*`
- `decoration.*`

## 4. 读取 Layout Grammar

读取 `layout-patterns.md`，选择：

- app shell
- navigation frame
- decorative masthead
- category section
- announcement section
- media feed section
- state page
- CTA / footer

## 5. 读取 Component Recipes

按页面需求读取：

- 核心：AppShell、BrandHeader、DecorativeMasthead、SidebarRail、TopBar、BottomNav、CategoryTabs、AnnouncementBar、MediaFeedSection、MediaCard。
- 状态：Skeleton、GeometricEmptyState、GeometricErrorState、Toast。
- 业务扩展：FeatureList、CTA、Stats、PricingBlock、Form、Modal。

## 6. 读取 Interaction Rules

为所有可交互组件补齐：

- hover
- active
- focus-visible
- disabled
- loading
- error
- empty
- success
- drawer / offcanvas
- toast
- reduced motion

## 7. 读取 Responsive Rules

分别输出：

- desktop layout
- tablet layout
- mobile layout
- 容器 padding
- 网格列数
- 导航切换
- 字号变化
- 长文本处理
- 触控目标

## 8. 读取 Content Rules

检查：

- 标题层级
- 副标题长度
- 公告文案
- 分类命名
- 卡片元信息顺序
- CTA 文案长度
- 空状态和错误状态文案
- 占位内容是否中性

## 9. 选择 Output Mode

- `spec`: 输出结构化 UI 设计规范。
- `html-css`: 输出语义 HTML、CSS variables 和组件样式。
- `react`: 默认输出 MUI-style React 组件、状态、props、theme token 和 `sx`；用户明确要求 plain React 时输出普通 React + CSS variables。
- `react-mui`: 输出真实 MUI primitives、`ThemeProvider`、`createTheme({ cssVariables: true })`、slots、variants 和 state props。
- `vue`: 输出 Vue SFC 和 scoped style。
- `tailwind`: 输出 token 映射和 utility 组合。
- `figma-prompt`: 输出可用于画面生成的结构提示。
- `frontend-project`: 使用完整项目模板；React 完整项目默认走 MUI composition。
- `mui-frontend-project`: 使用 `assets/frontend-template/`，并保留 MUI dependencies、theme layer 和 primitive mapping。

## 10. 生成结果

生成时必须包含：

- 视觉框架
- token 调用
- 组件结构
- 状态矩阵
- 响应式规则
- 可访问性说明
- 质量检查项

完整项目还必须包含入口文件、样式入口、fixtures、状态分支和运行说明。

## 11. 运行 Validation Checklist

用 `validation-checklist.md` 检查：

- 美学风格
- 视觉框架
- design tokens
- component recipes
- interactions
- responsive
- content
- accessibility
- release cleanliness

## 12. 运行清洁度检查

输出或写入前确认：

- 无特定品牌、域名、页面名、专有素材和真实业务数据。
- 无工作过程、取样过程、形成过程或关系性说明。
- 无不可授权图片、图标、文案或业务实体。
- 文件和示例能独立使用。
