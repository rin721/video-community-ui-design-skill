# Demo7 Player UI Distillation

This document distills reusable player-component UI patterns from a visual review of `https://kirakira.moe/video/kv7`.
It does not copy the source site's logo, screenshots, video frames, real users, comments, danmaku text, or proprietary naming.

## Visual Evidence Summary

- Desktop player: a large white player stage dominates the page, with a soft-pink geometric loading/cover field, a very thin progress rail near the bottom, compact controls, and a light left rail outside the player component.
- Desktop controls: the controller is visually quiet and icon-first: play, progress, current time/duration, speed or quality control, volume, danmaku toggle, and fullscreen.
- Mobile player: a compact top bar sits above a sticky player; the progress rail is directly under the visual stage, controls collapse into a short row of icons and small text, and `信息 / 评论 / 弹幕` tabs sit immediately below.
- Mobile detail tabs: information keeps action buttons short, comments keep the rich editor and search controls dense, and danmaku uses a compact time/content/date table with a bottom sender.

## Distilled Player Components

- `VideoPlayerStage`: white or near-white player surface, CSS-only geometric cover, optional danmaku overlay, and no real media asset dependency.
- `PlayerProgressRail`: MUI `Slider` or equivalent semantic progress control with a thin track and brand-primary active segment.
- `PlayerControlBar`: play/pause, time readout, quality, speed, volume, danmaku toggle, and fullscreen controls; desktop uses one horizontal rail, mobile wraps without horizontal page overflow.
- `PlayerDanmakuOverlay`: non-interactive overlay chips or text rows, hidden from assistive tech, reduced-motion aware.
- `PlayerSettingMenu`: compact control for quality/speed settings using real MUI `Select` or `Menu`, not custom div popups.
- `MobilePlayerTabs`: MUI `Tabs` for `信息 / 评论 / 弹幕`, placed directly after the sticky player on mobile.

## Token Mapping

- Surface: `--color-surface-page`, `--color-surface-card`, `--color-border-subtle`.
- Accent: `--color-brand-primary`, `--color-brand-soft`, `--color-focus-ring`.
- Geometry: CSS-only plus marks, diagonal strips, half circles, rings, and low-opacity line shapes.
- Density: `--size-nav-mobile`, `--size-touch-min`, `--radius-card`, `--radius-badge`, `--spacing-*`.
- Motion: `--motion-duration-fast`, `--motion-duration-danmaku`, `--motion-transform-press-scale`, with reduced-motion support.

## Demo7 Alignment Checklist

- `/video/:id` uses a token-backed mock player stage instead of a real video frame.
- Desktop keeps the player and right-side danmaku table in a two-column stage.
- Mobile keeps the player sticky and places the detail tabs directly below the player.
- Control state is local mock state: play/pause, progress, quality, speed, volume, danmaku visibility, fullscreen simulation.
- Danmaku and comments are local mock data; sending new rows never calls an API.

## Prohibited Copying

- Do not store target screenshots in the repository.
- Do not reuse the source site's logo, wordmark, mascot art, video frame, avatar, title, author, comments, danmaku text, or proprietary component names.
- Do not claim the demo is connected to the source site.
- Do not add real streaming, authentication, upload, persistence, or API clients.
