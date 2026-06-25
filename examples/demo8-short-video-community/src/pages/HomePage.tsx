import { Box, Button, Chip } from "@mui/material";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Announcement } from "../components/Announcement";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { CategoryTabs } from "../components/CategoryTabs";
import { DecorativeMasthead } from "../components/DecorativeMasthead";
import { MediaFeedSection } from "../components/MediaFeedSection";
import { Stack } from "../components/Stack";
import { categories, topics } from "../data/mock";
import { visibleVideos } from "../data/selectors";
import type { ViewState } from "../data/types";
import type { CommunityPageProps } from "./pageTypes";

export function HomePage({ appState, dispatch }: CommunityPageProps) {
  const [category, setCategory] = useState("all");
  const [viewState, setViewState] = useState<ViewState>("ready");
  const navigate = useNavigate();
  const items = useMemo(() => {
    const source = visibleVideos(appState);
    return category === "all" ? source : source.filter((video) => video.category === category);
  }, [appState, category]);
  const followedItems = visibleVideos(appState).filter((video) => appState.followedCreatorIds.includes(video.creatorId)).slice(0, 6);

  return (
    <PageFrame>
      <DecorativeMasthead />
      <CategoryTabs items={categories} value={category} onChange={setCategory} />
      <ContentContainer>
        <Box sx={{ display: "grid", gap: "var(--spacing-5)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Announcement onAction={() => navigate("/feed")} />
          <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)" aria-label="话题入口">
            {topics.map((topic) => (
              <Chip key={topic.id} label={topic.label} color="primary" variant="outlined" onClick={() => navigate(`/topics/${topic.id}`)} />
            ))}
          </Stack>
          <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)">
            {(["ready", "loading", "empty", "error"] as ViewState[]).map((state) => (
              <Button key={state} variant={viewState === state ? "contained" : "outlined"} onClick={() => setViewState(state)}>
                {state}
              </Button>
            ))}
          </Stack>
          <MediaFeedSection
            title="推荐视频"
            eyebrow="Discovery"
            items={viewState === "empty" ? [] : items}
            viewState={viewState === "ready" && items.length === 0 ? "empty" : viewState}
            appState={appState}
            dispatch={dispatch}
            action={<Button variant="outlined" onClick={() => navigate("/explore")}>高级筛选</Button>}
          />
          <MediaFeedSection
            title="关注动态"
            eyebrow="Following"
            items={followedItems}
            viewState={followedItems.length ? "ready" : "empty"}
            appState={appState}
            dispatch={dispatch}
            action={<Button variant="outlined" onClick={() => navigate("/creators")}>找创作者</Button>}
          />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}
