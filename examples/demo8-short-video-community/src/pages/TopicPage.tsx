import { Box, Paper, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { MediaFeedSection } from "../components/MediaFeedSection";
import { StateBlock } from "../components/StateBlock";
import { topics } from "../data/mock";
import { coverBackgrounds, visibleVideos } from "../data/selectors";
import type { CommunityPageProps } from "./pageTypes";

export function TopicPage({ appState, dispatch }: CommunityPageProps) {
  const { topicId } = useParams();
  const topic = topics.find((item) => item.id === topicId);
  if (!topic) {
    return (
      <PageFrame>
        <ContentContainer compact>
          <Box sx={{ pt: "var(--spacing-6)" }}>
            <StateBlock state="error" title="话题不存在" body="当前 mock 数据里没有这个话题。" />
          </Box>
        </ContentContainer>
      </PageFrame>
    );
  }
  const items = visibleVideos(appState).filter((video) => topic.videoIds.includes(video.id));
  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Paper elevation={0} sx={{ p: "var(--spacing-5)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", background: `linear-gradient(145deg, rgba(255,255,255,.94), rgba(255,255,255,.82)), ${coverBackgrounds[topic.tone]}` }}>
            <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
              {topic.label}
            </Typography>
            <Typography sx={{ mt: "var(--spacing-2)", color: "var(--color-text-muted)", maxWidth: "68ch" }}>{topic.description}</Typography>
          </Paper>
          <MediaFeedSection title="话题视频" items={items} viewState={items.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}
