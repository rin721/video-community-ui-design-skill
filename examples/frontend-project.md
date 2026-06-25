# Frontend Project Example

## 输入需求

- `page_type`: `homepage`
- `output_mode`: `mui-frontend-project`
- `tech_stack`: `react-mui`
- `content_model`: neutral media fixtures

## 使用到的 Skill 规则

- `frontend-project-rules.md`: 完整项目结构、MUI 封装和运行要求。
- `assets/frontend-template/`: React、TypeScript、Vite、Material UI 起点。
- `design-tokens.json`: token 到 CSS variables 和 MUI theme layer。
- `component-recipes.md`: core components。
- `validation-checklist.md`: 完成交付检查。

## 生成策略

完整项目前屏必须默认展示高识别骨架：侧轨或移动导航、装饰 masthead、分类 tabs、公告、媒体卡片流。React 项目必须从 MUI primitives、slots、variants、state props、theme overrides 和 token-backed `sx` 组合。项目内必须保留 normal、loading、empty、error、success/toast 状态。

## 项目结构草案

```text
/
├── package.json
├── index.html
├── src/
│   ├── main.tsx
│   ├── App.tsx
│   ├── theme.ts
│   ├── data/fixtures.ts
│   ├── pages/HomePage.tsx
│   ├── components/
│   │   ├── AppShell.tsx
│   │   ├── Navigation.tsx
│   │   ├── DecorativeMasthead.tsx
│   │   ├── CategoryTabs.tsx
│   │   ├── Announcement.tsx
│   │   ├── MediaFeedSection.tsx
│   │   ├── MediaCard.tsx
│   │   ├── StateBlock.tsx
│   │   ├── Toast.tsx
│   │   ├── CTA.tsx
│   │   └── Footer.tsx
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       └── app.css
└── README.md
```

## Token 使用说明

- `--color-brand-primary`: 字标、链接、active、按钮。
- `--layout-masthead-height`: desktop masthead。
- `--layout-masthead-mobile-height`: mobile masthead。
- `--decoration-stripe-width`: 斜向色带。
- `--grid-feed-min`: 媒体网格。

## MUI 映射说明

- `SidebarRail`: `Drawer` + `Box` + `IconButton`。
- `TopBar`: `AppBar` + `Toolbar`。
- `CategoryTabs`: `Tabs` + `Tab`。
- `Announcement`: `Paper` + `Alert`。
- `MediaCard`: `Card` + `CardActionArea` + `CardMedia` + `CardContent`。
- `Toast`: `Snackbar` + `Alert`。
- `BottomNav`: `BottomNavigation` + `BottomNavigationAction`。

## 响应式说明

- desktop: 56px 左侧导航和自动填充卡片网格。
- tablet: 降低 masthead 高度，卡片 2 到 3 列。
- mobile: 顶部栏、底部导航、1 到 2 列卡片，无横向溢出。

## 可访问性说明

- Landmarks 完整。
- 图标按钮有名称。
- 装饰隐藏给辅助技术。
- 状态反馈可读。
- reduced motion 可用。

## 质量检查要点

- `npm run build` 通过。
- `python -X utf8 scripts/validate_skill_package.py .` 通过。
- 模板首屏不是通用说明页，而是完整浏览型页面。
