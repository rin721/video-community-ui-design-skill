# Frontend Project Example

## 输入需求

- 页面类型：homepage
- 输出形式：frontend-project
- 技术栈：React、TypeScript、Vite、CSS variables
- 目标：生成一个可运行的视频社区风格前端项目

## 使用到的 Skill 规则

- `frontend-project-rules.md`: 项目目录、入口、组件、样式、fixtures 和运行命令。
- `design-tokens.json`: token 到 CSS variables 的映射。
- `layout-patterns.md`: app shell、导航、内容网格和状态框架。
- `component-recipes.md`: AppShell、Navigation、Announcement、MediaCard、CardGrid、CTA、Footer、Toast、StateBlock。
- `interaction-rules.md`: hover、active、focus、loading、reduced motion。
- `responsive-rules.md`: desktop、tablet、mobile。
- `validation-checklist.md`: 完整项目验收。

## 生成策略

项目使用页面级组件承载信息架构，使用基础组件承载交互，使用 `tokens.css` 承载设计系统。fixtures 提供中性内容，占位媒体使用稳定比例盒。所有组件都必须覆盖正常、加载、空、错误和成功反馈。

## 结构草案

```text
/
├── package.json
├── index.html
├── tsconfig.json
├── vite.config.ts
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── data/
│   │   └── fixtures.ts
│   ├── styles/
│   │   ├── tokens.css
│   │   ├── base.css
│   │   └── app.css
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── Navigation.tsx
│   │   ├── Announcement.tsx
│   │   ├── MediaCard.tsx
│   │   ├── CardGrid.tsx
│   │   ├── Button.tsx
│   │   ├── SearchFilter.tsx
│   │   ├── StateBlock.tsx
│   │   └── Toast.tsx
│   └── pages/
│       └── HomePage.tsx
└── README.md
```

## Token 使用说明

- `tokens.css` 定义颜色、字体、间距、圆角、阴影、断点和动效变量。
- `app.css` 调用 token 变量，不直接写无语义视觉值。
- 组件通过 class 或 data-state 表达状态。

## 响应式说明

- desktop: 左侧导航和自动填充卡片网格。
- tablet: 降低容器 padding，卡片 2 到 3 列。
- mobile: 顶部栏、底部导航、1 到 2 列卡片，无横向溢出。

## 可访问性说明

- 使用 `header`、`nav`、`main`、`section`、`article`、`footer`。
- 图标按钮提供 `aria-label`。
- 当前导航项提供 `aria-current`。
- 状态提示使用 `role="status"` 或 `role="alert"`。
- 表单控件提供 label。

## 质量检查要点

- `npm run build` 可执行。
- token 变量在样式中实际使用。
- 所有卡片媒体有稳定比例。
- loading、empty、error、success 状态可切换。
- 移动端没有横向溢出。
