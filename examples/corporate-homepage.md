# Corporate Homepage Example

## 输入需求

- 页面类型：homepage
- 目标：生成一个具备内容平台气质的企业展示首页
- 输出形式：React 结构说明
- 技术栈：React

## 使用到的 Skill 规则

- `layout-patterns.md`: app shell、compact hero、section、CTA、footer。
- `component-recipes.md`: Navigation、Hero、Feature List、Stats、CTA。
- `adaptation-rules.md`: 从轻技术感调整为企业感。
- `content-rules.md`: 标题、段落和 CTA 文案长度。

## 生成策略

页面保持浅色、低圆角和轻阴影，主色可调整为柔和蓝或青。内容先传达清晰价值，再展示功能、数据和行动入口。卡片数量保持适中，避免后台感。

## 结构草案

1. AppShell：顶部导航或桌面侧边导航。
2. Hero：主标题、短说明、两个操作、媒体槽。
3. FeatureList：三到六个能力点。
4. Stats：二到四个可替换指标。
5. ContentPreview：内容卡片或案例式卡片。
6. CTA：引导联系或开始使用。
7. Footer：链接、说明和辅助入口。

## Token 使用说明

- 企业感主色：替换 `color.brand.primary`。
- 功能卡片：`color.surface.card`、`radius.card.default`。
- 数据数字：`typography.size.hero`、`color.brand.primary`。
- 导航：`shadow.nav.soft`、`size.nav.rail`。

## 响应式说明

- desktop: hero 双列，功能三列，数据四列。
- tablet: 功能两列，数据两列。
- mobile: 全部单列，底部导航可保留三到五个入口。

## 可访问性说明

- 数据块必须包含单位和说明。
- 导航当前项使用 `aria-current`。
- 表单入口必须有 label。
- 颜色变化配合文本或图标。

## 质量检查要点

- 检查企业感替换后仍保留轻盈界面。
- 检查真实业务数字是否已替换为占位。
- 检查按钮、卡片和导航状态是否完整。
