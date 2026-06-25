import { Box, Chip, Paper, Typography } from "@mui/material";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { MediaFeedSection } from "../components/MediaFeedSection";
import { Stack } from "../components/Stack";
import { videosByIds } from "../data/selectors";
import type { CommunityPageProps } from "./pageTypes";

export function LibraryPage({
  kind,
  appState,
  dispatch,
}: CommunityPageProps & {
  kind: "history" | "collections";
}) {
  const historyItems = videosByIds(appState.historyVideoIds);
  const favoriteItems = videosByIds(appState.favoriteVideoIds);

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            {kind === "history" ? "观看历史" : "合集与收藏"}
          </Typography>
          {kind === "collections" ? (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: "var(--spacing-3)" }}>
              {appState.collections.map((collection) => (
                <Paper key={collection.id} elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
                  <Stack direction="row" justifyContent="space-between" gap="var(--spacing-2)">
                    <Box>
                      <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>{collection.title}</Typography>
                      <Typography sx={{ color: "var(--color-text-muted)" }}>{collection.description}</Typography>
                    </Box>
                    <Chip label={collection.visibility === "public" ? "公开" : "私密"} color={collection.visibility === "public" ? "primary" : "default"} size="small" />
                  </Stack>
                  <Typography sx={{ mt: "var(--spacing-2)", color: "var(--color-text-muted)" }}>{collection.videoIds.length} 个视频</Typography>
                </Paper>
              ))}
            </Box>
          ) : null}
          <MediaFeedSection
            title={kind === "history" ? "最近观看" : "收藏视频"}
            items={kind === "history" ? historyItems : favoriteItems}
            viewState={(kind === "history" ? historyItems : favoriteItems).length ? "ready" : "empty"}
            appState={appState}
            dispatch={dispatch}
          />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}
