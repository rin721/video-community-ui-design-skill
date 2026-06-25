# Prompt Templates

## 生成官网首页

```text
Use video-community-ui-design-skill to generate a UI design spec for a homepage.
Input:
- page_type: homepage
- audience: [目标用户]
- content_model: [内容对象与字段]
- brand_overrides: [可选主色、字体、密度]
- output_mode: spec
Requirements:
- Include app shell, navigation, announcement, media card grid, feature section, CTA, footer.
- Use semantic design tokens.
- Include hover, focus, loading, empty, error, success states.
- Include desktop, tablet, mobile rules.
- Include accessibility notes and validation checklist.
```

## 生成 Landing Page

```text
使用 video-community-ui-design-skill 生成 landing page。
输入：
- page_type: landing
- audience: [目标用户]
- value_message: [核心价值]
- tech_stack: [html-css/react/vue/tailwind/spec]
输出：
- hero、功能区、媒体展示、优势列表、CTA、页脚
- design tokens 使用说明
- 组件状态
- 响应式规则
- 可访问性检查项
```

## 生成产品介绍区

```text
Use video-community-ui-design-skill to create a product-section UI.
Input:
- section_goal: [介绍目标]
- features: [功能列表]
- media_need: [媒体槽需求]
- output_mode: [spec/react/vue/html-css]
Return:
- section structure
- media block recipe
- feature list recipe
- CTA recipe
- responsive behavior
- accessibility requirements
```

## 生成移动端页面

```text
使用 video-community-ui-design-skill 生成移动端内容页面。
必须包含：
- 56px 顶部栏
- 56px 底部导航
- 可读内容卡片
- 单列或双列卡片重排
- 44px 以上触控目标
- loading、empty、error 状态
- reduced motion 处理
```

## 生成组件规范

```text
Use video-community-ui-design-skill to generate a component library spec.
Components:
- Button
- Navigation
- Card
- Form
- Modal
- Tag
- Toast
For each component include:
- usage
- anatomy
- tokens
- variants
- states
- responsive rules
- accessibility rules
- implementation notes
```

## 生成 Design Tokens

```text
使用 video-community-ui-design-skill 输出 design tokens。
包含：
- color
- typography
- spacing
- radius
- shadow
- border
- motion
- breakpoint
- zIndex
- opacity
- blur
- container
- grid
每个 token 包含 name、value、role、usage、confidence、modifiable、fallback。
```

## 生成 React 实现

```text
Use video-community-ui-design-skill to implement a React page.
Constraints:
- Use semantic HTML.
- Define CSS variables from design tokens.
- Create components for AppShell, Navigation, Announcement, MediaCard, CardGrid, CTA, Footer.
- Include loading, empty, error, success states.
- Include keyboard focus and aria labels.
- Avoid horizontal overflow on mobile.
```

## 生成完整前端项目

```text
Use video-community-ui-design-skill to generate a complete frontend project.
Input:
- output_mode: frontend-project
- tech_stack: react
- page_type: homepage
- audience: [目标用户]
- content_model: [内容字段]
Must include:
- package.json
- index.html
- src/main.tsx
- src/App.tsx
- src/pages/HomePage.tsx
- src/components/*
- src/styles/tokens.css
- src/styles/base.css
- src/styles/app.css
- src/data/fixtures.ts
- README.md
Design requirements:
- aesthetic style
- visual framework
- design system
- component derivation
- interaction and motion
- brand expression
- desktop/tablet/mobile responsive behavior
- loading, empty, error, success states
- WCAG AA accessibility notes
Verification:
- provide npm install, npm run dev, npm run build
- ensure no horizontal overflow on mobile
- ensure token variables are used in component styles
```

## 生成 Vue 实现

```text
Use video-community-ui-design-skill to implement a Vue page.
Constraints:
- Use SFC components.
- Use props for variants and states.
- Use slots for card content and actions.
- Define scoped styles with token variables.
- Include responsive rules and accessibility attributes.
```

## 生成 HTML CSS 实现

```text
使用 video-community-ui-design-skill 输出纯 HTML/CSS。
要求：
- 语义化 HTML
- CSS variables
- 16:9 媒体卡片
- 固定导航与移动底部导航
- focus-visible
- reduced motion
- 响应式断点
```

## 替换色彩风格

```text
使用 video-community-ui-design-skill 调整色彩。
输入：
- new_primary: [新主色]
- mood: [高级感/极简感/企业感/产品感]
输出：
- 更新后的 color token
- 需要同步调整的 hover、pressed、focus、shadow、ripple
- 视觉一致性检查
```

## 替换组件风格

```text
Use video-community-ui-design-skill to adapt component style.
Input:
- component: [组件名称]
- density: [compact/standard/relaxed]
- radius: [4px-10px]
- motion: [static/light/spring]
Return:
- updated recipe
- affected tokens
- state rules
- responsive notes
- validation items
```

## 运行质量检查

```text
使用 video-community-ui-design-skill 检查生成结果。
检查：
- token 是否完整使用
- layout grammar 是否一致
- component recipe 是否覆盖状态
- mobile 是否可读
- keyboard 是否可操作
- focus 是否可见
- reduced motion 是否可用
- 是否存在专有资产、真实业务数据或不可替换文案
```
