# Demo6 UI Distillation

This document distills reusable video-community UI patterns from a visual review of `https://kirakira.moe/video/kv7`.
It does not copy the source site's logo, media, avatars, comments, danmaku text, or proprietary naming.

## Visual Evidence Summary

- Desktop view: a white page with a narrow left icon rail, a large video player on the left, a right-side danmaku list/tool panel, and detail metadata below the player.
- Mobile view: a compact top bar, sticky video player, three tabs for information/comments/danmaku, compressed action controls, author block, and bottom danmaku sender.
- Comments tab: a lightweight rich-text comment editor with icon tools, sort/search controls, page controls, and dense comment rows.
- Danmaku tab: a simple table with time, content, and send date columns plus a bottom sender.

## Page Skeleton

- `AppShell`: white canvas, fixed rail on desktop, top app bar and bottom navigation on mobile.
- `VideoStage`: large 16:9 player surface, CSS-only mock cover, subtle pink geometric overlay, and a compact controller bar.
- `SideDanmakuPanel`: desktop-only panel beside the player for danmaku table and sender.
- `VideoDetailTabs`: `Info`, `Comments`, and `Danmaku` tabs. Desktop keeps detail content below the stage; mobile makes this the main content switcher.
- `CreatorFollowCard`: avatar placeholder, creator name/handle, follower count, bio, and follow action.

## Component Distillation

- Player controller: play/pause, progress slider, current time/duration, quality, speed, volume slider, danmaku toggle, fullscreen toggle, and visual feedback toast.
- Info panel: title, view/date/category/source metadata, like/dislike/favorite/watch-later/share actions, tags, description, and creator card.
- Comment panel: rich-text toolbar, text field, character counter, submit button, sort toggle, search field, pagination, list rows, reply/delete/more actions.
- Danmaku panel: sortable time/content/date table, empty state, and sender with kaomoji/style/send icon actions.
- Mobile bottom sender: fixed above the safe area only on video detail when the danmaku tab is active.

## Token Mapping

- Base surface: use `--color-surface-page` and white MUI `Paper` surfaces.
- Accent: use `--color-brand-primary`, `--color-brand-soft`, and `--color-focus-ring` for active tabs, rail marks, sliders, buttons, and progress.
- Geometry: use CSS-only diagonal ribbons, plus marks, and soft circular placeholders; no real logo or mascot assets.
- Radius and density: keep `--radius-card`, `--radius-badge`, `--size-nav-rail`, `--size-nav-mobile`, and `--size-touch-min`.
- Motion: use hover title color, media micro-scale, button press scale, and reduced-motion CSS.

## Prohibited Copying

- Do not use the source site's logo, wordmark, icon art, avatars, video frames, screenshots, real title, real author, real comments, or real danmaku text.
- Do not claim the demo is connected to the source site.
- Do not implement real video streaming, authentication, upload, persistence, or API calls.
