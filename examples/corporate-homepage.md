# Corporate Homepage Example

## 输入需求

- `page_type`: `homepage`
- `audience`: 内容服务团队和创作者
- `output_mode`: `spec`
- `brand_overrides`: 降低装饰强度，提高中性色比例

## 使用到的 Skill 规则

- `style-profile.md`: 亲和、明亮、轻技术感。
- `layout-patterns.md`: masthead、分类、公告、媒体流、功能区、CTA、页脚。
- `component-recipes.md`: BrandHeader、DecorativeMasthead、CategoryTabs、AnnouncementBar、MediaFeedSection、CTA。
- `adaptation-rules.md`: 企业感调整。

## 生成策略

企业首页保留高识别骨架，但降低星点密度和粉色面积。Masthead 使用短品牌占位，公告改为服务更新，媒体卡片改为内容方案或资源条目。

## 结构草案

1. SidebarRail / TopBar。
2. DecorativeMasthead。
3. CategoryTabs。
4. AnnouncementBar。
5. MediaFeedSection。
6. FeatureList。
7. CTA。
8. Footer。

## Token 使用说明

- `color.brand.primary`: 激活项、链接和主按钮。
- `color.surface.card`: 公告和卡片。
- `shadow.nav.glow`: 固定导航。
- `opacity.decorative.subtle`: 低装饰强度。

## 响应式说明

- Desktop: 56px 窄轨，4 到 5 列卡片。
- Tablet: 2 到 3 列卡片，masthead 降高。
- Mobile: 顶部栏、底部导航、单列或双列卡片。

## 可访问性说明

- 导航项使用可访问名称。
- 当前项使用 `aria-current`。
- 公告可用 `role="status"`。
- 卡片主链接包含标题。

## 质量检查要点

- 企业感是否来自密度和中性色，而不是移除视觉系统。
- Masthead、tabs、announcement、media feed 是否仍存在。
- CTA 是否不过度销售化。
- 示例内容是否中性。
