# video-community-ui-design-skill

`video-community-ui-design-skill` 是一套面向 AI agent 的视频社区 UI 设计 skill。它把轻盈内容平台的视觉语言、布局语法、组件配方、交互状态、响应式规则、内容节奏和质量检查组织成可直接读取的 Markdown 与 JSON 文件。

## 能解决的问题

- 为视频社区、内容发现、产品介绍和移动端页面生成统一 UI 规范。
- 为内容卡片、导航、公告、CTA、表单、弹层、toast 和状态反馈生成可复用规则。
- 为 HTML/CSS、React、Vue、Tailwind、Figma prompt 和 design spec 输出统一设计约束。
- 为完整前端项目输出可运行目录、入口文件、组件层、样式层、fixtures、状态分支和运行说明。
- 在缺少完整文案或媒体时，提供中性占位、比例盒、alt、空状态和错误状态规则。

## 适合生成的页面

- 视频社区首页
- 内容发现页
- 频道页或合集页
- 产品介绍区
- 轻量 landing page
- 企业展示页
- 移动端内容页面
- 组件库规范

## AI agent 使用方式

1. 先读取 `SKILL.md`。
2. 按任务类型读取 `design-tokens.json`、`style-profile.md`、`layout-patterns.md` 和 `component-recipes.md`。
3. 继续读取交互、响应式、内容和适配规则。
4. 根据 `output-modes.md` 选择输出形式。
5. 使用 `validation-checklist.md` 做最终检查。

## 输入参数准备

- `page_type`: 页面类型。
- `audience`: 用户群体。
- `content_model`: 内容对象与字段。
- `brand_overrides`: 主色、字体、密度、圆角和动效强度。
- `tech_stack`: 目标技术栈。
- `output_mode`: 输出形式。
- `accessibility_level`: 可访问性等级，默认 WCAG AA。

## 输出结果

- UI design spec
- HTML/CSS
- React 组件
- Vue 组件
- Tailwind 实现
- Figma prompt
- Wireframe outline
- Component library spec
- Landing page structure
- Responsive layout plan
- Frontend project scaffold

## 文件结构

```text
/
├── SKILL.md
├── README.md
├── design-tokens.json
├── style-profile.md
├── layout-patterns.md
├── component-recipes.md
├── interaction-rules.md
├── responsive-rules.md
├── content-rules.md
├── adaptation-rules.md
├── frontend-project-rules.md
├── prompt-templates.md
├── runtime-decision-tree.md
├── output-modes.md
├── validation-checklist.md
└── examples/
    ├── landing-page.md
    ├── corporate-homepage.md
    ├── product-section.md
    └── mobile-page.md
```

## 扩展方式

- 更新视觉风格时，先改 `design-tokens.json`，再同步 `style-profile.md`。
- 更新布局能力时，改 `layout-patterns.md` 并补充 `responsive-rules.md`。
- 更新组件时，改 `component-recipes.md` 并保持状态、响应式和可访问性字段完整。
- 更新完整项目生成能力时，改 `frontend-project-rules.md` 并同步 `output-modes.md` 与 `prompt-templates.md`。
- 更新提示词时，改 `prompt-templates.md` 并保持中性占位文案。
- 每次更新后运行 `validation-checklist.md` 中的检查项。

## 质量要求

所有生成结果必须具备轻盈浅色基底、柔和强调色、低圆角、内容优先卡片、清晰导航、可关闭动效、键盘可操作、移动端可读和可替换文案。发布态文件必须只保留独立设计系统规则。
