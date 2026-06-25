import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Bookmark, BookmarkCheck, Clock3, Eye, EyeOff, Flag, Heart, MoreVertical } from "lucide-react";
import type { MouseEvent } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { coverBackgrounds, getCreator } from "../data/selectors";
import type { VideoItem } from "../data/types";
import type { AppAction, AppState } from "../state/communityReducer";
import { Stack } from "./Stack";

export function MediaCover({ video, compact = false }: { video: VideoItem; compact?: boolean }) {
  return (
    <CardMedia
      component="div"
      role="img"
      aria-label={video.thumbnailAlt}
      sx={{
        position: "relative",
        aspectRatio: compact ? "9 / 14" : "var(--grid-media-aspect)",
        overflow: "hidden",
        borderRadius: compact ? "var(--radius-card)" : "var(--radius-card) var(--radius-card) 0 0",
        background: coverBackgrounds[video.tone],
        transition: "transform var(--motion-duration-fast) var(--motion-easing-standard), filter var(--motion-duration-fast) var(--motion-easing-standard)",
        "&::before": {
          content: '""',
          position: "absolute",
          inset: "18% 18% auto auto",
          width: "28%",
          aspectRatio: "1",
          borderRadius: "var(--radius-round)",
          border: "2px solid rgba(255,255,255,.68)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: "var(--spacing-3)",
          right: "var(--spacing-3)",
          bottom: "var(--spacing-3)",
          height: "4px",
          borderRadius: "var(--radius-round)",
          background: "rgba(255,255,255,.72)",
        },
      }}
    >
      <Chip
        label={video.duration}
        size="small"
        sx={{
          position: "absolute",
          right: "var(--spacing-2)",
          bottom: "var(--spacing-2)",
          color: "var(--color-text-strong)",
          bgcolor: "rgba(255,255,255,.82)",
          fontWeight: "var(--font-weight-semibold)",
        }}
      />
    </CardMedia>
  );
}

export function MediaCard({
  video,
  appState,
  dispatch,
  compact = false,
}: {
  video: VideoItem;
  appState: AppState;
  dispatch: React.Dispatch<AppAction>;
  compact?: boolean;
}) {
  const navigate = useNavigate();
  const creator = getCreator(video.creatorId);
  const liked = appState.likedVideoIds.includes(video.id);
  const favorite = appState.favoriteVideoIds.includes(video.id);
  const watchLater = appState.watchLaterVideoIds.includes(video.id);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const openMenu = (event: MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };

  const closeMenu = () => setAnchorEl(null);

  return (
    <Card
      elevation={0}
      sx={{
        overflow: "visible",
        bgcolor: "transparent",
        "&:hover .media-cover": {
          transform: "var(--motion-transform-media-hover)",
          filter: "brightness(1.02)",
        },
        "&:hover .media-title": {
          color: "var(--color-brand-primary)",
        },
      }}
    >
      <CardActionArea
        onClick={() => {
          dispatch({ type: "visitVideo", videoId: video.id });
          navigate(`/video/${video.id}`);
        }}
        sx={{
          borderRadius: "var(--radius-card)",
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: "3px",
          },
        }}
      >
        <Box className="media-cover">
          <MediaCover video={video} compact={compact} />
        </Box>
        <CardContent sx={{ px: 0, py: "var(--spacing-2)" }}>
          <Typography
            className="media-title"
            component="h3"
            sx={{
              display: "-webkit-box",
              m: 0,
              minHeight: "calc(var(--font-size-card-title) * 2.7)",
              overflow: "hidden",
              color: "var(--color-text-strong)",
              fontSize: "var(--font-size-card-title)",
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: 1.35,
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {video.title}
          </Typography>
          <Typography sx={{ mt: "var(--spacing-1)", color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>
            {creator.name} · {video.views} · {video.date.split(" ")[0]}
          </Typography>
        </CardContent>
      </CardActionArea>

      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="var(--spacing-1)" flexWrap="wrap">
        <Stack direction="row" alignItems="center" gap="var(--spacing-1)" flexWrap="wrap">
          <Tooltip title={liked ? "取消点赞" : "点赞"}>
            <IconButton aria-label={liked ? "取消点赞" : "点赞"} size="small" color={liked ? "primary" : "default"} onClick={() => dispatch({ type: "toggleLike", video })}>
              <Heart size={16} />
            </IconButton>
          </Tooltip>
          <Tooltip title={favorite ? "取消收藏" : "收藏"}>
            <IconButton aria-label={favorite ? "取消收藏" : "收藏"} size="small" color={favorite ? "primary" : "default"} onClick={() => dispatch({ type: "toggleFavorite", video })}>
              {favorite ? <BookmarkCheck size={16} /> : <Bookmark size={16} />}
            </IconButton>
          </Tooltip>
          <Tooltip title={watchLater ? "移出稍后看" : "稍后看"}>
            <IconButton aria-label={watchLater ? "移出稍后看" : "稍后看"} size="small" color={watchLater ? "primary" : "default"} onClick={() => dispatch({ type: "toggleWatchLater", video })}>
              <Clock3 size={16} />
            </IconButton>
          </Tooltip>
        </Stack>
        <IconButton aria-label="打开更多反馈" size="small" onClick={openMenu}>
          <MoreVertical size={16} />
        </IconButton>
      </Stack>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={closeMenu}>
        <MenuItem
          onClick={() => {
            dispatch({ type: "hideVideo", video });
            closeMenu();
          }}
        >
          <EyeOff size={16} /> 减少类似内容
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch({ type: "reportVideo", video });
            closeMenu();
          }}
        >
          <Flag size={16} /> 举报
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch({ type: "showToast", message: `已记录一次曝光：${video.title}`, severity: "info" });
            closeMenu();
          }}
        >
          <Eye size={16} /> 记录曝光
        </MenuItem>
      </Menu>
    </Card>
  );
}
