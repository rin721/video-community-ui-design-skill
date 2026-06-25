# Static Template

Zero-dependency HTML, CSS, and JavaScript template for the video-community UI skill.

## Run

Open `index.html` directly, or serve the folder with any local static server if browser fetch restrictions block `data/fixtures.json`.

## Adapt

- Replace `data/fixtures.json` with neutral or user-provided content.
- Map `design-tokens.json` values into `styles/tokens.css`.
- Keep loading, empty, error, and success branches testable.
- Keep `focus-visible` and `prefers-reduced-motion` behavior when changing styles.
