# Runtime Decision Tree

## 1. 判断页面类型

- 用户要求首页时，选择 `homepage`。
- 用户要求营销或介绍页面时，选择 `landing`。
- 用户要求单个模块时，选择 `product-section`。
- 用户强调手机端时，选择 `mobile-page`。
- 用户要求组件规则时，选择 `component-spec`。
- 用户要求变量时，选择 `design-tokens`。

## 2. 判断用户是否提供输入

- 如果提供主色，更新 `color.brand.primary` 与相关状态 token。
- 如果提供字体，更新字体 token 并检查标题高度。
- 如果提供文案，按 `content-rules.md` 组织层级。
- 如果提供技术栈，使用对应 output mode。
- 如果提供组件需求，读取对应 component recipe。

## 3. 读取 Design Tokens

- 先读取颜色、字体、间距、圆角、阴影和动效。
- 再读取断点、容器、栅格和尺寸。
- 建立 CSS variables 或设计规范映射。

## 4. 读取 Layout Patterns

- 为页面选择 app shell。
- 选择 hero、section、grid、CTA 和 footer 组合。
- 判断是否需要公告条、筛选、内容网格和状态面板。

## 5. 读取 Component Recipes

- 为每个页面模块选择组件。
- 补齐用途、结构、token、状态、响应式和可访问性。
- 避免生成未被规则覆盖的孤立组件。

## 6. 读取 Interaction Rules

- 补齐 hover、active、focus、disabled、loading、error、success、empty。
- 设置 transition、easing 和 reduced motion。
- 为键盘和触控交互提供规则。

## 7. 读取 Responsive Rules

- 输出 desktop、tablet、mobile 三组规则。
- 检查固定导航占位。
- 检查卡片列数、字号、间距和图片比例。
- 检查移动端是否横向溢出。

## 8. 读取 Content Rules

- 调整标题层级。
- 控制段落密度。
- 组织 CTA、空状态、表单提示和错误提示。
- 替换不合适的占位文案。

## 9. 选择 Output Mode

- 未指定技术栈：输出 UI design spec。
- 指定 HTML/CSS：输出语义 HTML 和 CSS variables。
- 指定 React：输出组件结构、props 和样式。
- 指定 Vue：输出 SFC 结构、props、slots 和样式。
- 指定 Tailwind：输出 token 映射和 class 结构。
- 指定 Figma：输出可粘贴的 Figma prompt。
- 指定 Frontend Project：输出可运行项目文件树、入口、页面、组件、样式、fixtures、README 和运行命令。

## 10. 生成结果

- 先输出结构。
- 再输出 token 和组件映射。
- 再输出状态和响应式。
- 最后输出可访问性与质量检查。

## 11. 运行 Validation Checklist

- 检查美学风格。
- 检查 token 使用。
- 检查布局语法。
- 检查组件配方。
- 检查状态覆盖。
- 检查响应式与可访问性。

## 12. 运行 Release Hygiene

- 检查文件内容是否为第一方规则。
- 检查是否包含专有资产、真实业务数据或不可替换文案。
- 检查 JSON 是否有效。
- 检查 Markdown 是否结构清晰。

## 13. 完整前端项目补充判断

- 如果用户要求完整项目，必须读取 `frontend-project-rules.md`。
- 如果未指定技术栈，默认 React、TypeScript、Vite 和 CSS variables。
- 如果用户要求零依赖，切换为静态 HTML/CSS/JavaScript。
- 如果输出代码落地，必须创建所有入口、组件、样式、fixtures 和 README。
- 如果只输出方案，必须给出完整文件树和关键文件内容。
