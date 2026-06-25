import { Box, Tab, Tabs } from "@mui/material";
import { useMemo, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { CommentPanel, DanmakuPanel, InfoPanel } from "../components/CommunityPanels";
import { MediaFeedSection } from "../components/MediaFeedSection";
import { StateBlock } from "../components/StateBlock";
import { VideoPlayerStage } from "../components/VideoPlayer";
import { videos } from "../data/mock";
import { visibleVideos } from "../data/selectors";
import type { CommunityPageProps } from "./pageTypes";

type DetailTab = "info" | "comments" | "danmaku";

export function VideoDetailPage({ appState, dispatch }: CommunityPageProps) {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<DetailTab>("info");
  const video = videos.find((item) => item.id === id);

  const related = useMemo(() => {
    if (!video) return [];
    return visibleVideos(appState)
      .filter((item) => item.id !== video.id && item.topicIds.some((topicId) => video.topicIds.includes(topicId)))
      .slice(0, 4);
  }, [appState, video]);

  if (!id) return <Navigate to="/" replace />;
  if (!video) {
    return (
      <PageFrame>
        <ContentContainer compact>
          <Box sx={{ pt: "var(--spacing-6)" }}>
            <StateBlock state="error" title="视频不存在" body="当前 mock 数据里没有这个视频。" />
          </Box>
        </ContentContainer>
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-3)", sm: "var(--spacing-6)" } }}>
          <Box
            sx={{
              position: { xs: "sticky", sm: "static" },
              top: { xs: "var(--size-nav-mobile)", sm: "auto" },
              zIndex: { xs: 4, sm: "auto" },
              bgcolor: "var(--color-surface-page)",
              pb: { xs: "var(--spacing-2)", sm: 0 },
            }}
          >
            <VideoPlayerStage video={video} appState={appState} dispatch={dispatch} />
            <Tabs value={activeTab} onChange={(_, value: DetailTab) => setActiveTab(value)} variant="fullWidth" aria-label="视频详情面板" sx={{ display: { xs: "flex", md: "none" }, mt: "var(--spacing-2)", bgcolor: "var(--color-surface-card)", borderRadius: "var(--radius-card)" }}>
              <Tab value="info" label="信息" />
              <Tab value="comments" label="评论" />
              <Tab value="danmaku" label="弹幕" />
            </Tabs>
          </Box>

          <Box sx={{ display: { xs: "none", md: "grid" }, gridTemplateColumns: "minmax(0, 1fr) var(--layout-player-side)", gap: "var(--spacing-4)", alignItems: "start" }}>
            <InfoPanel video={video} appState={appState} dispatch={dispatch} />
            <Box sx={{ display: "grid", gap: "var(--spacing-4)" }}>
              <CommentPanel video={video} appState={appState} dispatch={dispatch} />
              <DanmakuPanel video={video} appState={appState} dispatch={dispatch} />
            </Box>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            {activeTab === "info" ? <InfoPanel video={video} appState={appState} dispatch={dispatch} /> : null}
            {activeTab === "comments" ? <CommentPanel video={video} appState={appState} dispatch={dispatch} /> : null}
            {activeTab === "danmaku" ? <DanmakuPanel video={video} appState={appState} dispatch={dispatch} /> : null}
          </Box>

          <MediaFeedSection title="相关推荐" items={related} viewState={related.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}
