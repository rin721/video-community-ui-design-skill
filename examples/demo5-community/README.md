# Demo5 Short Video Community

Demo5 is a complete mock short-video community frontend built with React, TypeScript, Vite, Material UI, and the skill token layer.

It uses real MUI primitives for navigation, tabs, cards, alerts, snackbars, dialogs, lists, text fields, selects, and bottom navigation. All community data is local mock data; there is no API client, no authentication, and no real upload.

## Routes

- `/` discovery home with decorative masthead, category tabs, announcement, media feed, and state controls.
- `/explore` search, category filtering, and sorting.
- `/video/:id` video detail, creator summary, like, favorite, follow, and comments.
- `/upload` mock upload form with validation, dialog, and toast.
- `/notifications` notification list with unread state.
- `/profile/:creatorId` creator profile and creator videos.
- `/me` local profile, favorites, and liked videos.

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
- `comments`
- `categories`
- `notifications`
- `profile`
- `draftUpload`

Replace those fixtures to adapt the demo. Keep content neutral and avoid real people, brands, proprietary images, or real user data.

## Verification Notes

- Desktop uses the fixed rail navigation.
- Mobile uses the top app bar and bottom navigation.
- The home page exposes ready, loading, empty, and error state switches.
- Likes, favorites, follows, comments, notification read state, and upload success are simulated with React local state.
- Covers are CSS gradient placeholders with accessible labels.
