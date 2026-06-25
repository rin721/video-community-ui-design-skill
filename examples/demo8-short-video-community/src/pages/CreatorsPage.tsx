import { Box, Button, Chip, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { MediaFeedSection } from "../components/MediaFeedSection";
import { Stack } from "../components/Stack";
import { creators, profile, videos } from "../data/mock";
import { coverBackgrounds, visibleVideos } from "../data/selectors";
import type { CreatorProfile } from "../data/types";
import type { CommunityPageProps } from "./pageTypes";

function CreatorCard({
  creator,
  followed,
  onToggleFollow,
}: {
  creator: CreatorProfile;
  followed: boolean;
  onToggleFollow: () => void;
}) {
  const navigate = useNavigate();
  return (
    <Paper elevation={0} sx={{ position: "relative", overflow: "hidden", p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
      <Box aria-hidden="true" sx={{ position: "absolute", right: "var(--spacing-3)", top: "var(--spacing-3)", width: "92px", height: "56px", borderRadius: "var(--radius-card)", background: coverBackgrounds[creator.tone], opacity: .66, transform: "rotate(-9deg)" }} />
      <Stack gap="var(--spacing-3)" sx={{ position: "relative" }}>
        <Box>
          <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            {creator.name}
          </Typography>
          <Typography sx={{ color: "var(--color-text-muted)" }}>{creator.handle}</Typography>
        </Box>
        <Typography>{creator.bio}</Typography>
        <Stack direction="row" gap="var(--spacing-1)" flexWrap="wrap">
          <Chip label={`${creator.followers} 关注者`} size="small" />
          <Chip label={`${creator.videos} 视频`} size="small" />
          {creator.verified ? <Chip label="认证" color="primary" size="small" /> : null}
        </Stack>
        <Stack direction="row" gap="var(--spacing-2)">
          <Button variant="outlined" onClick={() => navigate(`/creator/${creator.id}`)}>主页</Button>
          <Button variant={followed ? "contained" : "outlined"} onClick={onToggleFollow}>{followed ? "已关注" : "关注"}</Button>
        </Stack>
      </Stack>
    </Paper>
  );
}

export function CreatorsPage({ appState, dispatch }: CommunityPageProps) {
  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            创作者目录
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" }, gap: "var(--spacing-3)" }}>
            {creators.map((creator) => (
              <CreatorCard
                key={creator.id}
                creator={creator}
                followed={appState.followedCreatorIds.includes(creator.id)}
                onToggleFollow={() => dispatch({ type: "toggleFollow", creator })}
              />
            ))}
          </Box>
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

export function CreatorProfilePage({ appState, dispatch }: CommunityPageProps) {
  const navigate = useNavigate();
  const { creatorId = "" } = useParams();
  const creator = creators.find((item) => item.id === creatorId);
  if (!creator) {
    return (
      <PageFrame>
        <ContentContainer compact>
          <Box sx={{ pt: "var(--spacing-6)" }}>
            <Typography component="h1">创作者不存在</Typography>
          </Box>
        </ContentContainer>
      </PageFrame>
    );
  }
  const items = visibleVideos(appState).filter((video) => video.creatorId === creator.id);
  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <CreatorCard creator={creator} followed={appState.followedCreatorIds.includes(creator.id)} onToggleFollow={() => dispatch({ type: "toggleFollow", creator })} />
          <Button variant="text" sx={{ justifySelf: "start" }} onClick={() => navigate("/creators")}>返回创作者目录</Button>
          <MediaFeedSection title="创作者作品" items={items} viewState={items.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

export function MePage({ appState, dispatch }: CommunityPageProps) {
  const favoriteItems = videos.filter((video) => appState.favoriteVideoIds.includes(video.id));
  const likedItems = videos.filter((video) => appState.likedVideoIds.includes(video.id));
  const watchLaterItems = videos.filter((video) => appState.watchLaterVideoIds.includes(video.id));
  const pseudoCreator = creators[0];

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-5)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Paper elevation={0} sx={{ p: "var(--spacing-5)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
            <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
              {profile.name}
            </Typography>
            <Typography sx={{ color: "var(--color-text-muted)" }}>{profile.handle}</Typography>
            <Typography sx={{ mt: "var(--spacing-2)" }}>{profile.bio}</Typography>
            <Stack direction="row" gap="var(--spacing-1)" flexWrap="wrap" sx={{ mt: "var(--spacing-3)" }}>
              <Chip label={`${profile.followers} 关注者`} />
              <Chip label={`${profile.following} 正在关注`} />
              <Chip label={`${profile.videos} 视频`} />
              <Chip label={pseudoCreator.name} color="primary" variant="outlined" />
            </Stack>
          </Paper>
          <MediaFeedSection title="我的收藏" items={favoriteItems} viewState={favoriteItems.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
          <MediaFeedSection title="最近点赞" items={likedItems} viewState={likedItems.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
          <MediaFeedSection title="稍后观看" items={watchLaterItems} viewState={watchLaterItems.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}
