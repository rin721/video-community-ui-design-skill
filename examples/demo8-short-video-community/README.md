# Demo8 Short Video Community

Demo8 is a complete mock short-video community frontend built with React, TypeScript, Vite, Material UI, lucide-react, react-router-dom, and the skill token layer.

All data is local mock data. There is no API client, authentication, real upload, persistent database, or real video playback. Covers and player visuals are CSS geometric placeholders.

## Routes

- `/` discovery home with decorative masthead, announcement, category tabs, topic chips, state controls, following feed, and media feed.
- `/explore` keyword search, category filter, topic filter, sorting, and empty state.
- `/feed` continuous short-video browsing surface with local feedback actions.
- `/video/:id` mock player, controls, mobile tabs, video info, comments, replies, related videos, danmaku overlay, and danmaku table.
- `/creators` creator directory with follow state.
- `/creator/:creatorId` creator profile and creator videos.
- `/me` local profile, favorites, liked videos, and watch-later items.
- `/notifications` notification list with unread state.
- `/upload` mock upload draft with validation, visibility, dialog, and toast.
- `/history` local watch history.
- `/collections` mock collections and favorites.
- `/topics/:topicId` topic detail and topic videos.

## Run

```bash
pnpm install
pnpm build
pnpm dev
```

The dev server defaults to `http://127.0.0.1:5173/` unless Vite selects another available port.

## Mock Data

Core fixtures live in `src/data/mock.ts`; public data types live in `src/data/types.ts`; reducer actions live in `src/state/communityReducer.ts`.

Replace the fixtures to adapt the demo. Keep content neutral and avoid real people, brands, proprietary images, real screenshots, real comments, real danmaku text, or private user data.

## Verification Notes

- Desktop uses a fixed left rail navigation.
- Mobile uses a fixed top app bar and bottom navigation.
- Video detail uses a white player stage, CSS geometry cover, thin progress rail, compact controls, and `信息 / 评论 / 弹幕` tabs.
- Mobile video detail keeps the player sticky below the top app bar and keeps the danmaku sender above the bottom navigation.
- Home exposes ready, loading, empty, and error state switches.
- Search, category, topic, sorting, follows, comments, replies, danmakus, notification read state, upload success, reporting, and uninterested feedback are simulated with local reducer state.
