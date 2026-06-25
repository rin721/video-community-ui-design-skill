# Mobile Page Example

## 输入需求

- `page_type`: `mobile-page`
- `output_mode`: `react`
- `content_model`: media cards

## 使用到的 Skill 规则

- `responsive-rules.md`: mobile 布局、触控目标、顶部栏和底部导航。
- `component-recipes.md`: TopBar、BottomNav、CategoryTabs、AnnouncementBar、MediaCard、Toast。
- `interaction-rules.md`: touch、focus、active、reduced motion。

## 生成策略

移动端使用 56px 顶部栏、紧凑 masthead、公告信息条、分类 tabs、1 到 2 列媒体卡片和 56px 底部导航。状态反馈使用 toast 或内容区状态块。

## 结构草案

1. TopBar。
2. Compact DecorativeMasthead。
3. AnnouncementBar。
4. CategoryTabs。
5. MediaFeedSection。
6. GeometricEmptyState / GeometricErrorState。
7. BottomNav。
8. Toast。

## Token 使用说明

- `size.nav.mobileBar`: 顶部栏与底部导航。
- `layout.masthead.mobileHeight`: 移动 masthead。
- `container.content.paddingMobile`: 内容 padding。
- `size.touch.min`: 触控目标。
- `grid.media.aspect`: 卡片封面。

## 响应式说明

- 320px 到 359px: 单列卡片。
- 360px 以上: 可双列卡片，但标题必须可读。
- 横屏移动端降低 masthead 高度。
- 底部导航保留 safe-area padding。

## 可访问性说明

- 顶部菜单按钮有 `aria-label`。
- 底部导航使用 `aria-current`。
- Tabs 使用按钮或 tab 语义。
- 状态区域使用 `role="status"` 或 `role="alert"`。

## 质量检查要点

- 检查无横向溢出。
- 检查底部导航不遮挡最后一张卡片。
- 检查触控目标不小于 44px。
- 检查公告正文可换行。
