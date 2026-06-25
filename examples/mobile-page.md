# Mobile Page Example

## 输入需求

- 页面类型：mobile-page
- 目标：生成一个移动端视频内容浏览页面
- 输出形式：Tailwind 结构说明
- 技术栈：Tailwind

## 使用到的 Skill 规则

- `responsive-rules.md`: mobile 布局、触控目标、底部导航。
- `component-recipes.md`: Navigation、Card、Tag、Form、Toast。
- `interaction-rules.md`: touch、focus、loading、empty。
- `content-rules.md`: 卡片标题和元信息顺序。

## 生成策略

移动端使用 56px 顶部栏、内容容器和 56px 底部导航。内容卡片默认单列；如果宽度足够且标题可读，可使用双列。搜索和筛选保持轻量，底部导航只放主入口。

## 结构草案

1. TopBar：菜单、短名称、用户入口。
2. SearchRow：搜索输入和筛选按钮。
3. Tags：可横向滚动的辅助筛选。
4. CardGrid：单列或双列内容卡片。
5. Empty/Error/Loading：局部状态。
6. BottomNav：三到五个主入口。

## Token 使用说明

- 顶部栏：`size.nav.mobileBar`、`blur.glass`。
- 底部导航：`size.nav.mobileBar`、`shadow.nav.soft`。
- 卡片：`radius.card.default`、`grid.media.aspect`。
- 触控：`size.touch.min`。

## 响应式说明

- 390px 以下优先单列。
- 390px 到 639px 可双列，但标题至少可显示两行。
- 横屏时减少 section 间距。
- 底部导航避开安全区。

## 可访问性说明

- 底部导航项有文本或 aria-label。
- 当前项使用 `aria-current`。
- 搜索框有 label。
- 错误和空状态有明确文本。

## 质量检查要点

- 检查无横向溢出。
- 检查底部导航不遮挡最后一张卡片。
- 检查触控目标不小于 44px。
- 检查 reduced motion 是否关闭非必要动效。
