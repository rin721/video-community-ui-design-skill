# Prompt Templates

## 生成官网首页

```text
Use video-community-ui-design-skill to generate a homepage UI design spec.

Inputs:
- page_type: homepage
- audience: [用户群体]
- content_model: media cards with title, creator, views, duration, date, category
- output_mode: spec

Requirements:
- Use decorative masthead, rail navigation, category tabs, announcement bar, media feed, CTA, and footer.
- Include design tokens, component recipes, interactions, responsive rules, accessibility notes, and validation checklist.
- Use neutral replaceable content.
```

## 生成 Landing Page

```text
Use video-community-ui-design-skill to create a landing page for a lightweight media product.

Inputs:
- page_type: landing
- output_mode: html-css
- brand_overrides: [可选主色/字体/密度]

Requirements:
- Keep a compact decorative hero and visible next section.
- Include feature list, media block, CTA, footer, mobile layout, focus-visible, and reduced motion.
- Keep the visual system light, soft, geometric, and content-first.
```

## 生成产品介绍区

```text
Use video-community-ui-design-skill to design a product section.

Inputs:
- page_type: product-section
- section_goal: [介绍内容]
- output_mode: spec

Requirements:
- Use a small wordmark-style heading, subtle diagonal accent, media block, feature list, and light CTA.
- Include token usage, responsive behavior, and accessibility notes.
```

## 生成移动端页面

```text
Use video-community-ui-design-skill to generate a mobile media discovery page.

Inputs:
- page_type: mobile-page
- output_mode: react

Requirements:
- Use `size.nav.mobileBar` top bar, compact masthead, announcement bar, category tabs, 1-2 column media cards, `size.nav.mobileBar` bottom navigation, toast, loading, empty, and error states.
- Avoid horizontal overflow and preserve `size.touch.min` touch targets.
```

## 生成组件规范

```text
Use video-community-ui-design-skill to produce a component library spec.

Inputs:
- page_type: component-spec
- components: BrandHeader, DecorativeMasthead, SidebarRail, CategoryTabs, AnnouncementBar, MediaFeedSection, MediaCard, BottomNav, Toast, GeometricState

Requirements:
- For each component, include usage, visual structure, token dependencies, states, responsive rules, accessibility rules, implementation hints, and anti-patterns.
```

## 生成 Design Tokens

```text
Use video-community-ui-design-skill to generate design tokens.

Inputs:
- page_type: design-tokens
- brand_overrides: [主色/字体/圆角/动效强度]

Requirements:
- Include color, typography, spacing, radius, shadow, border, motion, breakpoint, zIndex, opacity, blur, container, grid, size, layout, and decoration tokens.
- Use semantic names only.
```

## 生成 React 实现

```text
Use video-community-ui-design-skill to create a React implementation with the real Material UI library.

Inputs:
- tech_stack: react-mui
- output_mode: mui-frontend-project
- content_model: neutral media fixtures

Requirements:
- Use assets/frontend-template as the project shape.
- Install/use @mui/material, @emotion/react, and @emotion/styled.
- Add a src/theme.ts layer with createTheme({ cssVariables: true }) and wrap the app with ThemeProvider + CssBaseline.
- Assemble UI from actual MUI primitives, slots, variants, state props, ownerState/theme overrides, and token-backed sx; do not hand-roll MUI-equivalent DOM/CSS.
- Map SidebarRail to Drawer/Box/IconButton, TopBar to AppBar/Toolbar, CategoryTabs to Tabs/Tab, Announcement to Alert/Paper/Stack, MediaCard to Card/CardActionArea/CardMedia/CardContent, Toast to Snackbar/Alert, and BottomNav to BottomNavigation.
- Keep homepage MediaCard roots flat (`elevation={0}`, transparent root) with hover on title/media slot only; reserve Paper shadows and hover lift for Announcement, overlays, CTA, or framed cards.
- Use SoftIconButton/PillToggle/RippleSurface anatomy: IconButton for round rail/detail actions, Tabs indicator for homepage categories, pills only for search/filter tags, and CardActionArea/TouchRipple for media clicks.
- Include AppShell, Navigation, DecorativeMasthead, CategoryTabs, Announcement, MediaFeedSection, MediaCard, StateBlock, Toast, CTA, and Footer.
- Include normal, loading, empty, error, and success/toast states.
- Provide npm install, npm run dev, and npm run build commands.
```

## 生成 Vue 实现

```text
Use video-community-ui-design-skill to create Vue SFC components for a media discovery page.

Requirements:
- Map tokens to CSS variables.
- Use props, slots, emits, scoped styles, responsive rules, and reduced motion.
- Include masthead, tabs, announcement, media feed, states, and mobile navigation.
```

## 生成 HTML/CSS 实现

```text
Use video-community-ui-design-skill to create a static HTML/CSS page.

Inputs:
- tech_stack: html-css
- output_mode: frontend-project

Requirements:
- Use assets/static-template as the project shape.
- Include semantic HTML, a CSS variable token layer mapped from `design-tokens.json`, component CSS that consumes token variables, light JavaScript states, no build dependency, and direct-open instructions.
- This mode is a zero-dependency generic static fallback. Do not call it MUI and do not imply it implements Material UI components.
- Use semantic HTML with generic component slots: shell, navigation, tabs, alert-like surface, media card body, toast-like status, and bottom navigation.
- Homepage media cards should be flat clickable surfaces: no heavy card shadow, no large lift, token-backed body padding, visible focus ring, title/media hover, and separate handling for nested author/tag actions.
- Keep raw `px`, `rgb()`, `#hex`, shadow, breakpoint, z-index, and motion values inside the token layer or documented fallback only; component selectors should use variables such as `--size-nav-rail`, `--layout-masthead-height`, and `--grid-feed-min`.
```

## 替换色彩风格

```text
Use video-community-ui-design-skill to adapt the color system.

Inputs:
- brand_overrides.primary: [新主色]

Requirements:
- Recalculate brand soft, mist, hover, pressed, focus ring, shadows, decorative accents, and selected states.
- Validate contrast and state visibility.
```

## 替换组件风格

```text
Use video-community-ui-design-skill to adjust component density and motion.

Inputs:
- density: [high|medium|low]
- motion_strength: [static|light|spring]

Requirements:
- Preserve token-backed navigation sizing, masthead visibility, category tabs, announcement, media card metadata order, focus-visible, touch targets, and reduced motion.
```

## 运行质量检查

```text
Use video-community-ui-design-skill to validate a generated page or project.

Check:
- aesthetic style
- visual framework
- design tokens
- component recipes
- interactions
- responsive rules
- accessibility
- neutral content
- release cleanliness
- build or direct-open readiness
```
