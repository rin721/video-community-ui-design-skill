import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { Bookmark, EyeOff, Flag, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { MediaCover } from "../components/MediaCard";
import { Stack } from "../components/Stack";
import { getCreator, visibleVideos } from "../data/selectors";
import type { CommunityPageProps } from "./pageTypes";

export function FeedPage({ appState, dispatch }: CommunityPageProps) {
  const navigate = useNavigate();
  const items = visibleVideos(appState).slice(0, 8);

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            连续刷看
          </Typography>
          {items.map((video) => {
            const creator = getCreator(video.creatorId);
            return (
              <Paper key={video.id} elevation={0} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 420px) 1fr" }, gap: "var(--spacing-4)", p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
                <MediaCover video={video} compact />
                <Stack justifyContent="space-between" gap="var(--spacing-3)">
                  <Box>
                    <Chip label={creator.name} color="primary" variant="outlined" size="small" />
                    <Typography component="h2" sx={{ mt: "var(--spacing-2)", mb: "var(--spacing-1)", fontSize: "var(--font-size-title)", fontWeight: "var(--font-weight-brand)" }}>
                      {video.title}
                    </Typography>
                    <Typography sx={{ color: "var(--color-text-muted)" }}>{video.description}</Typography>
                  </Box>
                  <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)">
                    <Button variant="contained" startIcon={<Heart size={16} />} onClick={() => dispatch({ type: "toggleLike", video })}>喜欢</Button>
                    <Button variant="outlined" startIcon={<Bookmark size={16} />} onClick={() => dispatch({ type: "toggleWatchLater", video })}>稍后看</Button>
                    <Button variant="outlined" startIcon={<EyeOff size={16} />} onClick={() => dispatch({ type: "hideVideo", video })}>不感兴趣</Button>
                    <Button variant="outlined" startIcon={<Flag size={16} />} onClick={() => dispatch({ type: "reportVideo", video })}>举报</Button>
                    <Button variant="text" onClick={() => {
                      dispatch({ type: "visitVideo", videoId: video.id });
                      navigate(`/video/${video.id}`);
                    }}>打开详情</Button>
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}
