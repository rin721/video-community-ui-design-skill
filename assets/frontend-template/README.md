# Frontend Template

Reusable React, TypeScript, Vite, Material UI, and CSS variables template for the video-community UI skill.

## Includes

- MUI theme layer in `src/theme.ts` using `createTheme({ cssVariables: true })`.
- Decorative masthead with wordmark text, diagonal stripes, plus grid, and geometric marks.
- MUI `Drawer`, `AppBar`, `BottomNavigation`, `Tabs`, `Alert`, `Card`, `Snackbar`, and token-backed `sx` styling.
- Category tabs, announcement bar, media feed grid, CTA, footer, toast, loading, empty, and error states.
- Neutral fixtures only.
- `focus-visible` and reduced-motion behavior.

## Run

```bash
npm install
npm run dev
npm run build
```

## Adapt

- Replace `src/data/fixtures.ts` with neutral or user-provided content.
- Map `design-tokens.json` values into `src/styles/tokens.css` and align defaults in `src/theme.ts`.
- Keep page composition inside MUI primitives, slots, variants, state props, and `sx` boundaries.
- Keep masthead, tabs, announcement, media feed, loading, empty, error, and success branches visible during review.
- Keep `focus-visible` and reduced-motion behavior when changing components.
