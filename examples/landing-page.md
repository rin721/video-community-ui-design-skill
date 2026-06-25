# Landing Page Example

## 输入需求

- `page_type`: `landing`
- `audience`: 轻量媒体产品用户
- `output_mode`: `html-css`
- `brand_overrides`: 默认主色

## 使用到的 Skill 规则

- `style-profile.md`: 浅底樱粉、字标式标题、几何装饰、轻玻璃。
- `layout-patterns.md`: compact product hero、功能区、媒体展示、CTA、页脚。
- `component-recipes.md`: DecorativeMasthead、FeatureList、MediaBlock、CTA、Footer。
- `interaction-rules.md`: hover、focus、active、reduced motion。
- `responsive-rules.md`: desktop/tablet/mobile 重排。

## 生成策略

Landing page 使用紧凑 hero，不占满首屏。顶部保留字标式标题和斜向色带，下方露出功能区。主操作只保留一个强按钮，一个次按钮。媒体展示使用 16:9 可替换槽。

## 结构草案

1. TopBar / SidebarRail。
2. Compact Decorative Hero。
3. FeatureList 三到六项。
4. MediaBlock。
5. CTA。
6. Footer。

## Token 使用说明

- `color.brand.primary`: 主按钮、字标、链接。
- `color.brand.soft`: hero 背景和轻标签。
- `decoration.stripe.width`: 斜向色带。
- `radius.card.default`: 卡片、媒体槽和 CTA。
- `motion.duration.fast`: hover 和 active。

## 响应式说明

- Desktop: hero 双列，功能区三列。
- Tablet: hero 堆叠或窄双列，功能区两列。
- Mobile: 顶部栏、紧凑 masthead、单列功能、全宽按钮、底部导航可选。

## 可访问性说明

- 页面只保留一个 `h1`。
- 装饰元素 `aria-hidden="true"`。
- 按钮有明确文本。
- focus-visible 可见。
- reduced motion 下关闭位移和装饰动画。

## 质量检查要点

- Hero 是否露出下一段。
- 是否没有大幅营销图占满首屏。
- 组件是否使用 token。
- 移动端是否无横向溢出。
- 文案是否中性可替换。
