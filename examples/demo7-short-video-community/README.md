# Demo7 Short Video Community

Demo7 is a complete mock short-video community frontend built with React, TypeScript, Vite, Material UI, lucide-react, and the skill token layer.

The player component is distilled from a visual review of `https://kirakira.moe/video/kv7`. See `PLAYER_UI_DISTILLATION.md` for the desktop/mobile player observations, token mapping, and anti-copying constraints.

All data is local mock data. There is no API client, no authentication, no real upload, no persistent database, and no real video playback. Do not copy the reference site's logo, screenshots, video frames, real title, real users, real comments, real danmaku text, or proprietary naming into this demo.

## Routes

- `/` discovery home with decorative masthead, announcement, category tabs, topic chips, state controls, and media feed.
- `/explore` keyword search, category filter, topic filter, sorting, and empty state.
- `/video/:id` distilled mock player, compact playback controls, danmaku overlay, sticky mobile player tabs, video info, creator card, related videos, rich comments, replies, and danmaku table.
- `/profile/:creatorId` creator profile and creator videos.
- `/me` local profile, favorites, liked videos, and watch-later items.
- `/notifications` notification list with unread state.
- `/upload` mock upload draft with validation, visibility, source type, dialog, and toast.
- `/history` local watch history.
- `/collections` mock collections and favorites.
- `/topics/:topicId` topic detail and topic videos.

## Run

```bash
pnpm install
pnpm build
pnpm dev
```

## Mock Data

Core fixtures live in `src/data/mock.ts`:

- `videos`
- `creators`
- `categories`
- `topics`
- `comments`
- `replies`
- `danmakus`
- `notifications`
- `collections`
- `profile`
- `draftUpload`

Replace those fixtures to adapt the demo. Keep content neutral and avoid real people, brands, proprietary images, or real user data.

## Verification Notes

- Desktop uses a fixed left rail navigation.
- Mobile uses a fixed top app bar and bottom navigation.
- Video detail uses a distilled white player stage, CSS geometry cover, thin progress rail, compact player controls, and `信息 / 评论 / 弹幕` tabs.
- Mobile video detail keeps the player sticky below the top app bar and keeps the danmaku sender above the bottom navigation.
- Home exposes ready, loading, empty, and error state switches.
- Search, category, topic, and sorting are local state only.
- Likes, dislikes, favorites, watch later, follows, comments, replies, danmakus, notification read state, upload success, reporting, and uninterested feedback are simulated with `useReducer`.
- Covers are CSS gradient placeholders with accessible labels.
- Player validation should cover play/pause, progress, volume, quality, speed, danmaku visibility, fullscreen simulation, tab switching, comment publish, and danmaku publish.
