# Demo6 Distilled Video Community

Demo6 is a mock short-video community frontend built from the distillation in `UI_DISTILLATION.md`.

The source page informed generic UI patterns only: left rail, white video detail canvas, player controls, information/comments/danmaku tabs, rich comment editor, danmaku table, and author follow card. This demo does not copy source branding, assets, video frames, avatars, comments, or danmaku text.

## Routes

- `/` discovery feed.
- `/explore` search, category filter, and sorting.
- `/video/:id` distilled player detail page.
- `/video/:id?tab=comments` comment panel.
- `/video/:id?tab=danmaku` danmaku panel.
- `/upload` mock upload form.
- `/notifications` notification list.
- `/profile/:creatorId` creator profile.
- `/me` local profile.
- `/history` watch history.
- `/collections` favorites.

## Run

```bash
pnpm install
pnpm build
pnpm dev
```

## Mock Data

Mock fixtures live in `src/data/mock.ts`. Replace those fixtures to adapt the demo while keeping content neutral and non-proprietary.

## Verification

- Desktop: player and right danmaku panel sit side by side.
- Mobile: player is sticky, tabs control information/comments/danmaku, and the danmaku sender sits above the safe area.
- All interactions are local state only: play, progress, quality, speed, volume, danmaku toggle, comments, danmaku send, likes, favorites, watch later, follow, upload validation, notifications, search, loading, empty, error, and success toast.
