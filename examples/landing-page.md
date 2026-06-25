# Landing Page Example

## 输入需求

- 页面类型：landing
- 目标：展示一个轻量内容服务的价值、功能和行动入口
- 输出形式：UI design spec
- 技术栈：未指定

## 使用到的 Skill 规则

- `style-profile.md`: 轻盈浅色、柔和强调色、内容优先。
- `layout-patterns.md`: `media-led-hero`、功能列表、媒体展示、soft panel CTA。
- `component-recipes.md`: Hero、Feature List、Media Block、CTA、Footer。
- `responsive-rules.md`: desktop 双列，mobile 堆叠。
- `validation-checklist.md`: token、状态、响应式和可访问性。

## 生成策略

页面先用短 hero 建立价值，再用功能列表解释能力，随后用媒体块展示内容形态，最后使用柔和 CTA 引导行动。整体不使用大面积深色背景，重点信息通过标题、媒体比例和主色按钮建立。

## 结构草案

1. 顶部导航：短名称、主入口、一个主操作。
2. Hero：标题、说明、主按钮、次按钮、16:9 媒体槽。
3. 功能区：三到六个功能点，每项包含图标、短标题、短说明。
4. 媒体展示：内容卡片网格或精选轨道。
5. CTA：浅强调背景、短说明、一个主操作。
6. 页脚：链接组和说明。

## Token 使用说明

- 主按钮：`color.brand.primary`、`radius.badge.default`、`shadow.control.subtle`。
- 媒体槽：`grid.media.aspect`、`radius.card.default`。
- 分区间距：`spacing.section.lg`。
- 标题：`typography.size.hero` 和 `typography.weight.black`。

## 响应式说明

- desktop: hero 双列，功能区三列，媒体网格自动填充。
- tablet: hero 保持双列或上下堆叠，功能区两列。
- mobile: hero 堆叠，CTA 按钮全宽，卡片单列或双列。

## 可访问性说明

- 页面只有一个 `h1`。
- CTA 使用明确按钮文本。
- 媒体图像提供 alt。
- 所有操作有 focus-visible。
- 动效支持 reduced motion。

## 质量检查要点

- 检查移动端是否无横向溢出。
- 检查图片比例是否稳定。
- 检查 CTA 是否不遮挡底部导航。
- 检查中性占位文案是否可替换。
