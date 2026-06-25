# video-community-ui-design-skill

`video-community-ui-design-skill` 是一套面向 AI agent 的视频社区 UI 设计 skill。它把浅底樱粉、固定窄轨、装饰 masthead、分类横栏、公告信息条、媒体卡片流、移动顶部栏与底部导航组织成可执行的 Markdown、JSON、模板资产和质量检查。

## 能解决什么问题

- 为视频社区、内容发现、媒体产品和移动浏览页面生成统一 UI 规范。
- 为 BrandHeader、DecorativeMasthead、SidebarRail、CategoryTabs、AnnouncementBar、MediaFeedSection、MediaCard、BottomNav、Toast 和状态页生成可复用规则。
- 为 HTML/CSS、React MUI、plain React、Vue、Tailwind、Figma prompt 和完整前端项目提供输出约束。
- React MUI 输出必须使用真实 `@mui/material` 通用库；静态 HTML/CSS 只是零依赖 fallback，不冒充 Material UI。
- 让不同 agent 在没有专用插件时也能按文件顺序读取并执行。

## 适合生成的页面

- 视频社区首页
- 内容发现页
- 创作者内容页
- 媒体产品 landing page
- 产品介绍区
- 移动端内容浏览页
- 组件库规范
- 完整前端项目

## 如何被 AI Agent 使用

1. 读取 `SKILL.md` 的触发、输入、输出和运行流程。
2. 读取 `design-tokens.json` 建立 token。
3. 读取 `style-profile.md`、`layout-patterns.md`、`component-recipes.md`。
4. 读取 `interaction-rules.md`、`responsive-rules.md`、`content-rules.md`。
5. 按输出目标读取 `output-modes.md`。
6. 完整前端项目再读取 `frontend-project-rules.md` 与 `assets/frontend-template/` 或 `assets/static-template/`。
7. 生成后运行 `validation-checklist.md` 和脚本检查。

## 输入参数

- `page_type`: `homepage`、`discovery`、`landing`、`product-section`、`mobile-page`、`component-spec`、`design-tokens`。
- `audience`: 用户群体与使用场景。
- `content_model`: 内容字段、分类、状态和排序。
- `brand_overrides`: 主色、字体、圆角、密度、装饰强度、动效强度。
- `tech_stack`: `html-css`、`react`、`react-mui`、`vue`、`tailwind`、`figma-prompt`、`spec`。
- `output_mode`: `spec`、`html-css`、`react`、`vue`、`tailwind`、`figma-prompt`、`frontend-project`、`mui-frontend-project`。

## 输出形态

- UI design spec
- HTML / CSS
- React MUI
- Plain React
- Vue
- Tailwind
- Figma prompt
- Wireframe outline
- Component library spec
- Landing page structure
- Responsive layout plan
- Full frontend project

## 文件结构

```text
/
├── SKILL.md
├── README.md
├── agents/
│   └── openai.yaml
├── scripts/
│   └── validate_skill_package.py
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
├── examples/
│   ├── landing-page.md
│   ├── corporate-homepage.md
│   ├── product-section.md
│   ├── mobile-page.md
│   ├── frontend-project.md
│   └── forward-tests/
└── assets/
    ├── frontend-template/
    └── static-template/
```

## 核心设计语言

- 白色或近白色基底。
- 樱粉主色与浅粉雾面。
- 56px 桌面固定窄轨。
- 移动 56px 顶部栏和 56px 底部导航。
- 中心字标式 masthead。
- 斜向色带、星形、十字点阵和三角几何。
- 分类 tabs、公告信息条和内容流优先。
- 16:9 媒体卡片、两行标题和稳定元信息。
- 轻玻璃、低圆角、轻阴影、弹性微动效。

## 如何扩展或替换风格

- 改主色时同步更新 `color.brand.*`、focus、shadow、decoration 和 selected states。
- 改字体时保持无衬线、跨语言可读和字标可访问。
- 改圆角时保持 badge 4px、卡片/公告/弹层 4px 到 8px。
- 改装饰强度时保留 masthead、斜向色带和至少一种几何装饰。
- 改密度时保留媒体比例、卡片元信息顺序、移动触控目标和底部导航安全区。

## 如何更新 Design Tokens

1. 修改 `design-tokens.json`。
2. 同步 `assets/frontend-template/src/styles/tokens.css`。
3. 同步 `assets/static-template/styles/tokens.css`。
4. 检查组件样式是否仍使用 token 变量。
5. 运行质量检查脚本。

## 如何更新 Component Recipes

1. 修改 `component-recipes.md` 中对应组件。
2. 同步 `frontend-project-rules.md` 的项目结构。
3. 同步 React 与静态模板中的组件。
4. 更新 examples 和 prompt templates。
5. 运行完整验证。

## 质量检查

包级校验脚本位于 `scripts/validate_skill_package.py`。

```powershell
python -X utf8 "$env:USERPROFILE\.codex\skills\.system\skill-creator\scripts\quick_validate.py" .
python -X utf8 scripts\validate_skill_package.py .
git diff --check
```

React MUI 模板检查：

```powershell
cd assets\frontend-template
npm install
npm run build
```

静态模板检查：

- 直接打开 `assets/static-template/index.html`，或使用本地静态服务器。
- 检查 desktop、tablet、mobile 下 masthead、tabs、announcement、media feed、states、toast 和 bottom nav。

## 模板资产

- `assets/frontend-template/`: React、TypeScript、Vite、Material UI 和 CSS variables 项目起点，包含 MUI theme、入口、组件、fixtures、状态分支和运行说明。
- `assets/static-template/`: HTML、CSS 和原生 JavaScript 起点，适合零依赖交付或静态页面生成。

## Agent Metadata

- `agents/openai.yaml` 提供 UI 展示名称、短说明、品牌色和默认调用提示。

## Forward Tests

- `examples/frontend-project.md` 展示完整前端项目生成方式。
- `examples/forward-tests/` 提供独立任务提示，用于检查该 skill 是否能生成规范、React 项目和静态页面。

## 维护规则

- 保持 `SKILL.md` 短而可触发，细节放入模块文件。
- 保持 token、组件、模板、示例和检查清单同步。
- 不写入专有图片、专有图标、真实人物、真实机构、真实产品或真实业务数据。
- 完整项目模板必须能展示正常、loading、empty、error 和 success/toast 状态。
