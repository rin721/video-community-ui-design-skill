# Product Section Example

## 输入需求

- `page_type`: `product-section`
- `output_mode`: `spec`
- `section_goal`: 展示一个媒体产品能力区

## 使用到的 Skill 规则

- `layout-patterns.md`: compact product hero、feature-section、media block。
- `component-recipes.md`: BrandHeader、MediaBlock、FeatureList、CTA。
- `design-tokens.json`: media ratio、brand colors、radius、motion。

## 生成策略

产品分区使用小型字标标题、短说明、3 到 4 个功能点和一个 16:9 媒体槽。装饰只放在标题角落或背景边缘。

## 结构草案

1. Section heading。
2. Short body copy。
3. FeatureList。
4. MediaBlock。
5. Small CTA。

## Token 使用说明

- `typography.size.sectionTitle`: 分区标题。
- `color.brand.soft`: 轻背景。
- `grid.media.aspect`: 媒体槽。
- `radius.card.default`: 媒体和功能卡。
- `motion.transform.cardHover`: 可点击功能 hover。

## 响应式说明

- Desktop: 文案与媒体双列。
- Tablet: 功能区两列。
- Mobile: 全部单列，媒体置于标题后。

## 可访问性说明

- Section 使用 `aria-labelledby`。
- 媒体槽有 alt 文本或描述。
- CTA 文案明确。
- 动效可关闭。

## 质量检查要点

- 分区是否可嵌入任意页面。
- 装饰是否不遮挡文本。
- 功能项是否短而可扫读。
