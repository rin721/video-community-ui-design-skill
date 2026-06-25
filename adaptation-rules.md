# Adaptation Rules

## 替换主色

- 修改 `color.brand.primary` 后，同步派生 `brand.soft`、`brand.mist`、`brand.hover`、`brand.pressed`、`focus.ring`、`shadow.nav.glow` 和装饰色。
- 主色应保持柔和、明亮、亲和，避免高饱和霓虹和大面积深色。
- 状态色不随主色替换，除非用户明确要求。

## 替换字体

- 界面字体优先使用跨语言可读的无衬线。
- 字标字体可以更有个性，但必须保证清晰和可访问。
- 字标不得使用图片替代文本。
- 字距保持 0 或正值，不使用负字距。

## 调整圆角

- 默认 badge 使用 `radius.badge.default`，卡片/公告/弹层使用 `radius.card.default`，图标按钮使用圆形控制圆角 token。
- 若提高亲和度，可在 `radius.card.default` 的 token 默认值上调。
- 若提高克制感，可让 `radius.card.default` 靠近 `radius.badge.default`。
- 禁止把所有卡片改成大圆角胶囊。

## 调整卡片风格

- 必须保留 16:9 媒体槽、两行标题和元信息顺序。
- 可在无图片场景使用渐变占位、纹理占位或色块占位。
- 可降低阴影，但 hover 状态仍需可见。
- 不得用厚边框或重阴影替代轻盈浏览感。

## 调整页面密度

- 高密度：减少 section 间距，保持媒体卡片最小列宽仍由 `grid.feed.min` 或其高密度派生 token 控制。
- 中密度：使用 `grid.feed.min` 的默认媒体卡片最小列宽。
- 低密度：扩大卡片间距和 masthead 留白，但首屏仍需露出内容入口。
- 移动端不得为密度牺牲标题可读性。

## 调整动效强度

- 静态：关闭 jump-in、漂移、旋转和缩放，仅保留颜色与焦点。
- 轻动效：保留 hover 上移、active 缩放和 toast 进度。
- 弹性微动效：允许导航项 jump-in、offcanvas 位移和设置图标旋转。
- 所有强度都必须支持 reduced motion。

## 风格方向转换

- 科技感：降低星点密度，提高线性图标和信息色比例。
- 高级感：减少装饰数量，增加留白和更细的分割线。
- 极简感：保留 masthead 字标和分类 tabs，移除大部分点阵。
- 企业感：提高中性色比例，保留轻粉作为辅助强调。
- 产品感：加强功能区和 CTA，但不得压过内容流。

## 可替换 Token

- `color.brand.*`
- `typography.font.*`
- `typography.weight.brand`
- `radius.card.default`
- `shadow.*`
- `decoration.*`
- `opacity.decorative.*`
- `motion.duration.*`
- `container.*`

## 不建议替换的结构规则

- `size.nav.rail` 侧轨和 `size.nav.mobileBar` 移动导航高度。
- 16:9 媒体比例。
- 分类 tabs、公告和媒体流的浏览入口关系。
- 卡片元信息顺序。
- focus-visible、触控目标和 reduced motion。
- Masthead 不占满首屏的规则。

## 替换后验证一致性

- 页面是否仍然浅底、轻盈、内容优先。
- Masthead 是否仍有字标式标题、斜向色带和几何装饰。
- 导航是否仍有桌面窄轨和移动底栏。
- 媒体卡片是否仍稳定可扫读。
- 颜色替换后对比度是否满足 WCAG AA。
- 移动端是否没有横向溢出或遮挡。

## 避免组件失衡

- 不要只改按钮颜色而忘记 tabs、导航、focus 和装饰。
- 不要只放大 masthead 而让媒体流掉出首屏。
- 不要增加装饰数量导致公告和卡片被弱化。
- 不要用真实图片填满所有占位后丢失 token 控制。
- 不要删除状态分支以换取视觉简洁。
