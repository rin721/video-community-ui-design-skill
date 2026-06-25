import {
  Alert,
  AppBar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Paper,
  Select,
  Slider,
  Snackbar,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import {
  Bell,
  Bookmark,
  BookmarkCheck,
  CheckCircle2,
  Clock3,
  Compass,
  EyeOff,
  Flag,
  Heart,
  History,
  Home,
  Library,
  MessageCircle,
  MoreVertical,
  Pause,
  Play,
  Reply,
  Search,
  Send,
  Sparkles,
  Star,
  ThumbsDown,
  Trash2,
  Upload,
  User,
  Volume2,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useEffect, useMemo, useReducer, useState, type ElementType, type FormEvent, type MouseEvent, type ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  categories,
  collections,
  comments as initialComments,
  creators,
  danmakus as initialDanmakus,
  draftUpload,
  initialPlayerState,
  notifications as initialNotifications,
  profile,
  replies as initialReplies,
  topics,
  videos,
} from "./data/mock";
import type {
  CollectionItem,
  CommentItem,
  CreatorProfile,
  DanmakuItem,
  NotificationItem,
  PlayerState,
  ReplyItem,
  UploadDraft,
  VideoItem,
  VideoTone,
  ViewState,
} from "./data/mock";

type ToastState = {
  message: string;
  severity: "success" | "info" | "error";
};

type UploadErrors = Partial<Record<keyof UploadDraft, string>>;

type AppState = {
  likedVideoIds: string[];
  dislikedVideoIds: string[];
  favoriteVideoIds: string[];
  watchLaterVideoIds: string[];
  historyVideoIds: string[];
  hiddenVideoIds: string[];
  followedCreatorIds: string[];
  comments: CommentItem[];
  replies: ReplyItem[];
  danmakus: DanmakuItem[];
  notifications: NotificationItem[];
  collections: CollectionItem[];
  draft: UploadDraft;
  player: PlayerState;
  toast: ToastState | null;
};

type AppAction =
  | { type: "showToast"; message: string; severity?: ToastState["severity"] }
  | { type: "closeToast" }
  | { type: "updatePlayer"; patch: Partial<PlayerState> }
  | { type: "visitVideo"; videoId: string }
  | { type: "toggleLike"; video: VideoItem }
  | { type: "toggleDislike"; video: VideoItem }
  | { type: "toggleFavorite"; video: VideoItem }
  | { type: "toggleWatchLater"; video: VideoItem }
  | { type: "toggleFollow"; creator: CreatorProfile }
  | { type: "addComment"; videoId: string; body: string }
  | { type: "deleteComment"; commentId: string }
  | { type: "addReply"; commentId: string; body: string }
  | { type: "deleteReply"; replyId: string }
  | { type: "addDanmaku"; video: VideoItem; body: string }
  | { type: "markNotificationRead"; notificationId: string }
  | { type: "markAllNotificationsRead" }
  | { type: "updateDraft"; key: keyof UploadDraft; value: string }
  | { type: "resetDraft" }
  | { type: "uploadSuccess" }
  | { type: "hideVideo"; video: VideoItem }
  | { type: "reportVideo"; video: VideoItem };

const initialState: AppState = {
  likedVideoIds: ["video-02", "video-07"],
  dislikedVideoIds: [],
  favoriteVideoIds: ["video-01", "video-03", "video-11"],
  watchLaterVideoIds: ["video-05", "video-10"],
  historyVideoIds: ["video-01", "video-02", "video-07"],
  hiddenVideoIds: [],
  followedCreatorIds: ["creator-02", "creator-05"],
  comments: initialComments,
  replies: initialReplies,
  danmakus: initialDanmakus,
  notifications: initialNotifications,
  collections,
  draft: draftUpload,
  player: initialPlayerState,
  toast: null,
};

const navigationItems: Array<{ label: string; path: string; icon: LucideIcon }> = [
  { label: "首页", path: "/", icon: Home },
  { label: "探索", path: "/explore", icon: Search },
  { label: "投稿", path: "/upload", icon: Upload },
  { label: "通知", path: "/notifications", icon: Bell },
  { label: "历史", path: "/history", icon: History },
  { label: "合集", path: "/collections", icon: Library },
  { label: "我的", path: "/me", icon: User },
];

const coverBackgrounds: Record<VideoTone, string> = {
  rose:
    "linear-gradient(135deg, rgba(255,255,255,.5) 0 18%, transparent 18% 30%, rgba(255,255,255,.32) 30% 38%, transparent 38%), linear-gradient(145deg, #ffc9d7, #f06e8e 54%, #9fd2ec)",
  mint:
    "linear-gradient(135deg, rgba(255,255,255,.46) 0 16%, transparent 16% 28%, rgba(255,255,255,.28) 28% 36%, transparent 36%), linear-gradient(145deg, #b8eadf, #72cbb8 48%, #f9c4d4)",
  gold:
    "linear-gradient(135deg, rgba(255,255,255,.48) 0 17%, transparent 17% 28%, rgba(255,255,255,.3) 28% 36%, transparent 36%), linear-gradient(145deg, #ffe0a6, #f4b95f 48%, #f5a9c0)",
  sky:
    "linear-gradient(135deg, rgba(255,255,255,.5) 0 18%, transparent 18% 30%, rgba(255,255,255,.32) 30% 38%, transparent 38%), linear-gradient(145deg, #b7dcf4, #86bce7 48%, #f4adc5)",
  violet:
    "linear-gradient(135deg, rgba(255,255,255,.5) 0 18%, transparent 18% 30%, rgba(255,255,255,.32) 30% 38%, transparent 38%), linear-gradient(145deg, #d8c9f6, #b79ae8 48%, #f0a9c4)",
  mono:
    "linear-gradient(135deg, rgba(255,255,255,.45) 0 17%, transparent 17% 30%, rgba(255,255,255,.26) 30% 38%, transparent 38%), linear-gradient(145deg, #ded9dc, #9f969d 52%, #f4c1d0)",
};

const railButtonSx = {
  color: "var(--color-text-muted)",
  transition:
    "color var(--motion-duration-fast) var(--motion-easing-standard), background-color var(--motion-duration-fast) var(--motion-easing-standard), transform var(--motion-duration-fast) var(--motion-easing-standard)",
  "&:hover, &[aria-current='page']": {
    color: "var(--color-brand-primary)",
    bgcolor: "var(--color-brand-soft)",
  },
  "&:active": {
    transform: "var(--motion-transform-press-scale)",
  },
};

type LocalStackProps = {
  component?: ElementType;
  direction?: unknown;
  alignItems?: unknown;
  justifyContent?: unknown;
  gap?: unknown;
  flexWrap?: unknown;
  sx?: unknown;
  children?: ReactNode;
  [key: string]: unknown;
};

function Stack({
  component = "div",
  direction = "column",
  alignItems,
  justifyContent,
  gap,
  flexWrap,
  sx,
  children,
  ...props
}: LocalStackProps) {
  const sxList = Array.isArray(sx) ? sx : [sx].filter(Boolean);

  return (
    <Box
      component={component}
      sx={[
        {
          display: "flex",
          flexDirection: direction,
          alignItems,
          justifyContent,
          gap,
          flexWrap,
        },
        ...sxList,
      ]}
      {...props}
    >
      {children}
    </Box>
  );
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "showToast":
      return { ...state, toast: { message: action.message, severity: action.severity ?? "success" } };
    case "closeToast":
      return { ...state, toast: null };
    case "updatePlayer":
      return {
        ...state,
        player: { ...state.player, ...action.patch },
        toast:
          action.patch.fullscreen !== undefined
            ? { message: "已模拟切换全屏状态", severity: "info" }
            : state.toast,
      };
    case "visitVideo":
      return {
        ...state,
        historyVideoIds: [action.videoId, ...state.historyVideoIds.filter((id) => id !== action.videoId)].slice(0, 12),
      };
    case "toggleLike": {
      const liked = state.likedVideoIds.includes(action.video.id);
      return {
        ...state,
        likedVideoIds: liked
          ? state.likedVideoIds.filter((id) => id !== action.video.id)
          : [...state.likedVideoIds, action.video.id],
        dislikedVideoIds: state.dislikedVideoIds.filter((id) => id !== action.video.id),
        toast: { message: liked ? "已取消点赞" : `已点赞：${action.video.title}`, severity: "success" },
      };
    }
    case "toggleDislike": {
      const disliked = state.dislikedVideoIds.includes(action.video.id);
      return {
        ...state,
        dislikedVideoIds: disliked
          ? state.dislikedVideoIds.filter((id) => id !== action.video.id)
          : [...state.dislikedVideoIds, action.video.id],
        likedVideoIds: state.likedVideoIds.filter((id) => id !== action.video.id),
        toast: { message: disliked ? "已撤销点踩" : "已记录点踩反馈", severity: "info" },
      };
    }
    case "toggleFavorite": {
      const favorite = state.favoriteVideoIds.includes(action.video.id);
      return {
        ...state,
        favoriteVideoIds: favorite
          ? state.favoriteVideoIds.filter((id) => id !== action.video.id)
          : [...state.favoriteVideoIds, action.video.id],
        toast: { message: favorite ? "已取消收藏" : "已加入收藏", severity: "success" },
      };
    }
    case "toggleWatchLater": {
      const saved = state.watchLaterVideoIds.includes(action.video.id);
      return {
        ...state,
        watchLaterVideoIds: saved
          ? state.watchLaterVideoIds.filter((id) => id !== action.video.id)
          : [...state.watchLaterVideoIds, action.video.id],
        toast: { message: saved ? "已移出稍后看" : "已加入稍后看", severity: "success" },
      };
    }
    case "toggleFollow": {
      const followed = state.followedCreatorIds.includes(action.creator.id);
      return {
        ...state,
        followedCreatorIds: followed
          ? state.followedCreatorIds.filter((id) => id !== action.creator.id)
          : [...state.followedCreatorIds, action.creator.id],
        toast: { message: followed ? `已取消关注 ${action.creator.name}` : `已关注 ${action.creator.name}`, severity: "success" },
      };
    }
    case "addComment":
      return {
        ...state,
        comments: [
          {
            id: `comment-${Date.now()}`,
            videoId: action.videoId,
            author: profile.name,
            handle: profile.handle,
            body: action.body.trim(),
            date: "刚刚",
            likes: 0,
            owned: true,
          },
          ...state.comments,
        ],
        toast: { message: "评论已发布", severity: "success" },
      };
    case "deleteComment":
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.commentId),
        replies: state.replies.filter((reply) => reply.commentId !== action.commentId),
        toast: { message: "已删除自己的评论", severity: "info" },
      };
    case "addReply":
      return {
        ...state,
        replies: [
          ...state.replies,
          {
            id: `reply-${Date.now()}`,
            commentId: action.commentId,
            author: profile.name,
            handle: profile.handle,
            body: action.body.trim(),
            date: "刚刚",
            owned: true,
          },
        ],
        toast: { message: "回复已发布", severity: "success" },
      };
    case "deleteReply":
      return {
        ...state,
        replies: state.replies.filter((reply) => reply.id !== action.replyId),
        toast: { message: "已删除自己的回复", severity: "info" },
      };
    case "addDanmaku": {
      const timeSeconds = Math.round((state.player.progress / 100) * action.video.durationSeconds);
      return {
        ...state,
        danmakus: [
          ...state.danmakus,
          {
            id: `danmaku-${Date.now()}`,
            videoId: action.video.id,
            time: formatSeconds(timeSeconds),
            timeSeconds,
            body: action.body.trim(),
            date: "刚刚",
          },
        ],
        toast: { message: "弹幕已发送", severity: "success" },
      };
    }
    case "markNotificationRead":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.notificationId ? { ...notification, read: true } : notification,
        ),
      };
    case "markAllNotificationsRead":
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
        toast: { message: "通知已全部标记为已读", severity: "success" },
      };
    case "updateDraft":
      return { ...state, draft: { ...state.draft, [action.key]: action.value } };
    case "resetDraft":
      return { ...state, draft: draftUpload, toast: { message: "投稿草稿已重置", severity: "info" } };
    case "uploadSuccess":
      return {
        ...state,
        draft: draftUpload,
        notifications: [
          {
            id: `notice-${Date.now()}`,
            type: "upload",
            title: "投稿已进入 mock 队列",
            body: "这是本地状态模拟，不会上传真实文件。",
            date: "刚刚",
            read: false,
          },
          ...state.notifications,
        ],
        toast: { message: "投稿成功，已加入本地 mock 队列", severity: "success" },
      };
    case "hideVideo":
      return {
        ...state,
        hiddenVideoIds: state.hiddenVideoIds.includes(action.video.id)
          ? state.hiddenVideoIds
          : [...state.hiddenVideoIds, action.video.id],
        toast: { message: "已减少类似内容推荐", severity: "info" },
      };
    case "reportVideo":
      return { ...state, toast: { message: "举报已记录到本地 mock 反馈", severity: "info" } };
    default:
      return state;
  }
}

function getCreator(creatorId: string) {
  return creators.find((creator) => creator.id === creatorId) ?? creators[0];
}

function formatSeconds(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function visibleVideos(state: AppState) {
  return videos.filter((video) => !state.hiddenVideoIds.includes(video.id));
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Stack direction="row" alignItems="center" gap="var(--spacing-2)" sx={{ minWidth: 0 }}>
      <Box
        aria-hidden="true"
        sx={{
          width: compact ? "var(--spacing-4)" : "var(--spacing-5)",
          height: compact ? "var(--spacing-4)" : "var(--spacing-5)",
          bgcolor: "var(--color-brand-primary)",
          clipPath:
            "polygon(50% 0, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%)",
          flex: "0 0 auto",
        }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography
          component={compact ? "span" : "h1"}
          sx={{
            display: "block",
            m: 0,
            color: "var(--color-brand-primary)",
            fontSize: compact ? "var(--font-size-title)" : "var(--font-size-display)",
            fontWeight: "var(--font-weight-brand)",
            lineHeight: "var(--line-height-tight)",
          }}
        >
          PINKFLOW
        </Typography>
        {!compact ? (
          <Typography sx={{ color: "var(--color-text-muted)", fontWeight: "var(--font-weight-semibold)" }}>
            mock short video community
          </Typography>
        ) : null}
      </Box>
    </Stack>
  );
}

function DecorativeMasthead() {
  return (
    <Box
      component="section"
      aria-label="社区品牌区"
      sx={{
        position: "relative",
        display: { xs: "none", sm: "grid" },
        height: "var(--layout-masthead-height)",
        placeItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--color-border-subtle)",
        background:
          "linear-gradient(180deg, rgba(255,246,249,.92), rgba(255,255,255,.74)), repeating-linear-gradient(135deg, rgba(240,110,142,.12) 0 10px, transparent 10px 34px)",
        "&::before": {
          content: '""',
          position: "absolute",
          right: "10%",
          top: "20px",
          width: "min(640px, 56vw)",
          height: "72px",
          borderRadius: "var(--radius-badge)",
          bgcolor: "rgba(240, 110, 142, .16)",
          transform: "rotate(-12deg)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: "11%",
          bottom: "24px",
          width: "120px",
          height: "72px",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(240,110,142,.28) 0 2px, transparent 2px 14px), repeating-linear-gradient(0deg, rgba(240,110,142,.2) 0 2px, transparent 2px 14px)",
          opacity: ".7",
        },
      }}
    >
      <BrandMark />
    </Box>
  );
}

function PageFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        pl: { xs: 0, sm: "var(--size-nav-rail)" },
        pt: { xs: "var(--size-nav-mobile)", sm: 0 },
        pb: { xs: "calc(var(--size-nav-mobile) + var(--spacing-8))", sm: "var(--spacing-8)" },
        bgcolor: "var(--color-surface-page)",
      }}
    >
      {children}
    </Box>
  );
}

function ContentContainer({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
  return (
    <Box
      sx={{
        width: "min(100%, var(--container-content-max))",
        boxSizing: "border-box",
        mx: "auto",
        px: {
          xs: "var(--container-padding-mobile)",
          sm: "var(--container-padding-tablet)",
          lg: compact ? "var(--container-padding-desktop)" : 0,
        },
      }}
    >
      {children}
    </Box>
  );
}

function Navigation({ unreadCount }: { unreadCount: number }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeItem =
    navigationItems.find((item) =>
      item.path === "/" ? location.pathname === "/" : location.pathname.startsWith(item.path),
    ) ?? navigationItems[0];

  return (
    <>
      <AppBar
        component="header"
        position="fixed"
        elevation={0}
        sx={{
          display: { xs: "flex", sm: "none" },
          minHeight: "var(--size-nav-mobile)",
          color: "var(--color-text-strong)",
          bgcolor: "var(--color-surface-glass)",
          borderBottom: "1px solid var(--color-border-subtle)",
          boxShadow: "var(--shadow-nav-glow)",
          backdropFilter: "blur(16px)",
        }}
      >
        <Toolbar disableGutters sx={{ minHeight: "var(--size-nav-mobile)", px: "var(--spacing-3)", justifyContent: "space-between" }}>
          <IconButton aria-label="打开探索" sx={railButtonSx} onClick={() => navigate("/explore")}>
            <Search size={19} />
          </IconButton>
          <BrandMark compact />
          <IconButton aria-label="打开通知" sx={railButtonSx} onClick={() => navigate("/notifications")}>
            <Badge color="primary" badgeContent={unreadCount}>
              <Bell size={19} />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        component="aside"
        variant="permanent"
        aria-label="桌面主导航"
        sx={{
          display: { xs: "none", sm: "block" },
          width: "var(--size-nav-rail)",
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: "var(--size-nav-rail)",
            boxSizing: "border-box",
            display: "grid",
            gridTemplateRows: "auto 1fr auto",
            alignItems: "center",
            py: "var(--spacing-2)",
            overflow: "hidden",
            bgcolor: "var(--color-surface-glass)",
            borderRight: "1px solid var(--color-border-subtle)",
            boxShadow: "var(--shadow-nav-glow)",
            backdropFilter: "blur(16px)",
          },
        }}
      >
        <Stack component="nav" aria-label="主入口" gap="var(--spacing-2)" alignItems="center">
          {navigationItems.map((item) => {
            const Icon = item.icon;
            const selected = activeItem.path === item.path;
            return (
              <Tooltip key={item.path} title={item.label} placement="right">
                <IconButton
                  aria-label={item.label}
                  aria-current={selected ? "page" : undefined}
                  onClick={() => navigate(item.path)}
                  sx={railButtonSx}
                >
                  {item.path === "/notifications" ? (
                    <Badge color="primary" variant={unreadCount ? "dot" : "standard"}>
                      <Icon size={19} />
                    </Badge>
                  ) : (
                    <Icon size={19} />
                  )}
                </IconButton>
              </Tooltip>
            );
          })}
        </Stack>

        <Box
          aria-hidden="true"
          sx={{
            justifySelf: "center",
            display: "inline-flex",
            width: "max-content",
            alignItems: "center",
            gap: "var(--spacing-3)",
            color: "var(--color-brand-primary)",
            transform: "rotate(-90deg)",
          }}
        >
          <Sparkles size={18} />
          <Typography sx={{ fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            PINKFLOW
          </Typography>
        </Box>

        <Tooltip title="我的主页" placement="right">
          <IconButton aria-label="我的主页" onClick={() => navigate("/me")} sx={railButtonSx}>
            <User size={19} />
          </IconButton>
        </Tooltip>
      </Drawer>

      <BottomNavigation
        component="nav"
        aria-label="移动底部导航"
        showLabels
        value={activeItem.path}
        onChange={(_, value: string) => navigate(value)}
        sx={{
          position: "fixed",
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          display: { xs: "flex", sm: "none" },
          minHeight: "var(--size-nav-mobile)",
          bgcolor: "var(--color-surface-glass)",
          borderTop: "1px solid var(--color-border-subtle)",
          boxShadow: "var(--shadow-nav-glow)",
          backdropFilter: "blur(16px)",
        }}
      >
        {navigationItems.slice(0, 5).map((item) => {
          const Icon = item.icon;
          return (
            <BottomNavigationAction
              key={item.path}
              label={item.label}
              value={item.path}
              icon={
                item.path === "/notifications" ? (
                  <Badge color="primary" badgeContent={unreadCount}>
                    <Icon size={19} />
                  </Badge>
                ) : (
                  <Icon size={19} />
                )
              }
              aria-current={activeItem.path === item.path ? "page" : undefined}
              sx={{
                minWidth: 0,
                color: "var(--color-text-muted)",
                "&.Mui-selected, &[aria-current='page']": { color: "var(--color-brand-primary)" },
              }}
            />
          );
        })}
      </BottomNavigation>
    </>
  );
}

function CategoryTabs({ activeCategory, onCategoryChange }: { activeCategory: string; onCategoryChange: (value: string) => void }) {
  return (
    <Box sx={{ width: "100%", minWidth: 0, overflow: "hidden", borderBottom: "1px solid var(--color-border-subtle)" }}>
      <Tabs
        value={activeCategory}
        onChange={(_, value: string) => onCategoryChange(value)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="内容分类"
        sx={{
          maxWidth: "100%",
          minWidth: 0,
          minHeight: "var(--layout-category-height)",
          "& .MuiTabs-indicator": {
            height: "3px",
            borderRadius: "var(--radius-badge) var(--radius-badge) 0 0",
            bgcolor: "var(--color-brand-primary)",
          },
        }}
      >
        {categories.map((category) => (
          <Tab key={category.id} value={category.id} label={`${category.label} ${category.count}`} />
        ))}
      </Tabs>
    </Box>
  );
}

function Announcement() {
  return (
    <Paper elevation={0} sx={{ minWidth: 0, borderRadius: "var(--radius-card)", border: "1px solid rgba(240,110,142,.18)", overflow: "hidden" }}>
      <Alert
        severity="info"
        action={<Chip label="Mock" color="primary" variant="outlined" />}
        sx={{
          minWidth: 0,
          alignItems: "center",
          color: "var(--color-text-strong)",
          bgcolor: "var(--color-surface-card)",
          "& .MuiAlert-icon": { color: "var(--color-brand-primary)" },
          "& .MuiAlert-message": { minWidth: 0, overflowWrap: "anywhere" },
          "& .MuiAlert-action": { flexShrink: 0, pl: "var(--spacing-1)" },
        }}
      >
        <Typography component="strong" sx={{ display: "block", mb: ".25rem" }}>
          社区公告
        </Typography>
        Demo7 使用本地 mock 模拟短视频社区的浏览、播放器、评论、弹幕、通知、投稿和个人内容管理。
      </Alert>
    </Paper>
  );
}

function VideoCover({ video, large = false }: { video: VideoItem; large?: boolean }) {
  return (
    <CardMedia
      component="div"
      role="img"
      aria-label={video.thumbnailAlt}
      className="demo7-cover"
      sx={{
        position: "relative",
        width: "100%",
        maxWidth: "100%",
        aspectRatio: "var(--grid-media-aspect)",
        height: large ? { xs: 220, md: 410 } : undefined,
        overflow: "hidden",
        borderRadius: large ? 0 : "var(--radius-card)",
        background: coverBackgrounds[video.tone],
        boxShadow: "inset 0 0 38px rgba(255,255,255,.55)",
        transformOrigin: "center",
        transition: "transform var(--motion-duration-fast) var(--motion-easing-standard)",
        "&::before": {
          content: '""',
          position: "absolute",
          right: "9%",
          top: "18%",
          width: "42%",
          height: "18%",
          bgcolor: "rgba(255,255,255,.42)",
          transform: "rotate(-18deg)",
          borderRadius: "var(--radius-badge)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: "10%",
          bottom: "14%",
          width: "96px",
          height: "64px",
          border: "3px solid rgba(255,255,255,.56)",
          borderRadius: "var(--radius-card)",
          transform: "rotate(8deg)",
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
          height: "22px",
          color: "#fff",
          bgcolor: "rgba(34,32,36,.62)",
          fontWeight: "var(--font-weight-semibold)",
          fontVariantNumeric: "tabular-nums",
        }}
      />
    </CardMedia>
  );
}

function FeedbackMenu({ video, dispatch }: { video: VideoItem; dispatch: React.Dispatch<AppAction> }) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);
  const close = () => setAnchorEl(null);

  return (
    <>
      <Tooltip title="更多反馈">
        <IconButton aria-label={`更多反馈：${video.title}`} onClick={(event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)} sx={railButtonSx}>
          <MoreVertical size={18} />
        </IconButton>
      </Tooltip>
      <Menu anchorEl={anchorEl} open={open} onClose={close}>
        <MenuItem
          onClick={() => {
            dispatch({ type: "hideVideo", video });
            close();
          }}
        >
          <EyeOff size={16} /> <Box component="span" sx={{ ml: "var(--spacing-2)" }}>不感兴趣</Box>
        </MenuItem>
        <MenuItem
          onClick={() => {
            dispatch({ type: "reportVideo", video });
            close();
          }}
        >
          <Flag size={16} /> <Box component="span" sx={{ ml: "var(--spacing-2)" }}>举报</Box>
        </MenuItem>
      </Menu>
    </>
  );
}

function VideoCard({ video, state, dispatch }: { video: VideoItem; state: AppState; dispatch: React.Dispatch<AppAction> }) {
  const navigate = useNavigate();
  const creator = getCreator(video.creatorId);
  const liked = state.likedVideoIds.includes(video.id);
  const favorite = state.favoriteVideoIds.includes(video.id);
  const watchLater = state.watchLaterVideoIds.includes(video.id);

  return (
    <Card
      sx={{
        bgcolor: "transparent",
        overflow: "visible",
        "&:hover .demo7-cover": { transform: "var(--motion-transform-media-hover)" },
        "&:hover .demo7-title": { color: "var(--color-brand-hover)" },
      }}
    >
      <CardActionArea onClick={() => navigate(`/video/${video.id}`)} aria-label={`打开视频：${video.title}`} sx={{ borderRadius: "var(--radius-card)" }}>
        <VideoCover video={video} />
        <CardContent sx={{ px: "var(--spacing-1)", pt: "var(--spacing-2)", pb: 0 }}>
          <Typography
            className="demo7-title"
            component="h3"
            sx={{
              display: "-webkit-box",
              minHeight: "2.9em",
              m: 0,
              overflow: "hidden",
              color: "var(--color-text-strong)",
              fontSize: "var(--font-size-card-title)",
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: "var(--line-height-tight)",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {video.title}
          </Typography>
          <Typography sx={{ mt: "var(--spacing-1)", color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>
            {creator.name} · {video.views} 播放
          </Typography>
          <Typography sx={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>
            {video.sourceType === "original" ? "原创" : "转载"} · {video.date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Stack direction="row" gap="var(--spacing-1)" alignItems="center" flexWrap="wrap" sx={{ mt: "var(--spacing-1)", px: "var(--spacing-1)" }}>
        <Tooltip title="点赞">
          <IconButton color={liked ? "primary" : "default"} aria-label={`点赞 ${video.title}`} onClick={() => dispatch({ type: "toggleLike", video })} sx={railButtonSx}>
            <Heart size={18} fill={liked ? "currentColor" : "none"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="收藏">
          <IconButton color={favorite ? "primary" : "default"} aria-label={`收藏 ${video.title}`} onClick={() => dispatch({ type: "toggleFavorite", video })} sx={railButtonSx}>
            <Star size={18} fill={favorite ? "currentColor" : "none"} />
          </IconButton>
        </Tooltip>
        <Tooltip title="稍后看">
          <IconButton color={watchLater ? "primary" : "default"} aria-label={`稍后看 ${video.title}`} onClick={() => dispatch({ type: "toggleWatchLater", video })} sx={railButtonSx}>
            <Clock3 size={18} />
          </IconButton>
        </Tooltip>
        <FeedbackMenu video={video} dispatch={dispatch} />
      </Stack>
    </Card>
  );
}

function StateBlock({ state, title, body }: { state: ViewState; title: string; body: string }) {
  const Icon = state === "error" ? Flag : state === "empty" ? Compass : Sparkles;
  const color = state === "error" ? "error" : "info";
  return (
    <Paper
      role={state === "error" ? "alert" : "status"}
      elevation={0}
      sx={{
        p: "var(--spacing-6)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-subtle)",
        bgcolor: "var(--color-surface-card)",
        boxShadow: "var(--shadow-card-soft)",
      }}
    >
      <Stack direction="row" alignItems="flex-start" gap="var(--spacing-3)">
        <Chip color={color} icon={<Icon size={16} />} label={state} />
        <Box>
          <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            {title}
          </Typography>
          <Typography sx={{ mt: "var(--spacing-1)", color: "var(--color-text-muted)" }}>{body}</Typography>
        </Box>
      </Stack>
    </Paper>
  );
}

function VideoGrid({ items, viewState, appState, dispatch }: { items: VideoItem[]; viewState: ViewState; appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  if (viewState === "loading") return <StateBlock state="loading" title="正在加载发现流" body="这是本地 loading 状态模拟，切换 ready 即可恢复内容流。" />;
  if (viewState === "error") return <StateBlock state="error" title="内容加载失败" body="这是本地错误状态模拟，可返回 ready 状态恢复内容流。" />;
  if (viewState === "empty" || !items.length) return <StateBlock state="empty" title="没有找到内容" body="换一个分类、话题、关键词或排序方式再试。" />;

  return (
    <Box
      sx={{
        minWidth: 0,
        display: "grid",
        gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(auto-fit, minmax(var(--grid-feed-min), 1fr))" },
        gap: { xs: "14px", sm: "var(--grid-feed-gap)" },
        "@media (max-width: 359px)": { gridTemplateColumns: "1fr" },
      }}
    >
      {items.map((video) => (
        <VideoCard key={video.id} video={video} state={appState} dispatch={dispatch} />
      ))}
    </Box>
  );
}

function TopicChips() {
  const navigate = useNavigate();
  return (
    <Stack direction="row" gap="var(--spacing-2)" flexWrap="wrap" sx={{ minWidth: 0 }}>
      {topics.map((topic) => (
        <Chip
          key={topic.id}
          label={topic.label}
          color="primary"
          variant="outlined"
          onClick={() => navigate(`/topics/${topic.id}`)}
          sx={{ bgcolor: "var(--color-surface-card)" }}
        />
      ))}
    </Stack>
  );
}

function HomePage({ appState, dispatch }: { appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const [viewState, setViewState] = useState<ViewState>("ready");
  const [activeCategory, setActiveCategory] = useState("all");
  const items = visibleVideos(appState).filter((video) => activeCategory === "all" || video.category === activeCategory);

  return (
    <PageFrame>
      <DecorativeMasthead />
      <ContentContainer>
        <Box sx={{ minWidth: 0, display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <BrandMark />
          </Box>
          <Announcement />
          <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
          <TopicChips />
          <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)" aria-label="状态切换">
            {(["ready", "loading", "empty", "error"] as ViewState[]).map((state) => (
              <Button key={state} variant={viewState === state ? "contained" : "outlined"} onClick={() => setViewState(state)}>
                {state}
              </Button>
            ))}
          </Stack>
          <VideoGrid items={viewState === "ready" ? items : []} viewState={viewState} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function filterVideos(query: string, category: string, topic: string, sort: string, appState: AppState) {
  const normalized = query.trim().toLowerCase();
  const items = visibleVideos(appState).filter((video) => {
    const creator = getCreator(video.creatorId);
    const matchesCategory = category === "all" || video.category === category;
    const matchesTopic = topic === "all" || video.topicIds.includes(topic);
    const matchesQuery =
      !normalized ||
      video.title.toLowerCase().includes(normalized) ||
      creator.name.toLowerCase().includes(normalized) ||
      video.tags.some((tag) => tag.toLowerCase().includes(normalized));
    return matchesCategory && matchesTopic && matchesQuery;
  });
  if (sort === "popular") return [...items].sort((a, b) => b.likes - a.likes);
  if (sort === "favorites") return [...items].sort((a, b) => b.favorites - a.favorites);
  if (sort === "duration") return [...items].sort((a, b) => a.durationSeconds - b.durationSeconds);
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

function ExplorePage({ appState, dispatch }: { appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [topic, setTopic] = useState("all");
  const [sort, setSort] = useState("latest");
  const items = useMemo(() => filterVideos(query, category, topic, sort, appState), [query, category, topic, sort, appState]);

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            探索
          </Typography>
          <Paper
            elevation={0}
            sx={{
              display: "grid",
              gridTemplateColumns: { xs: "1fr", md: "1fr 170px 170px 170px" },
              gap: "var(--spacing-3)",
              p: "var(--spacing-3)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border-subtle)",
              bgcolor: "var(--color-surface-card)",
            }}
          >
            <TextField label="搜索视频、创作者或标签" value={query} onChange={(event) => setQuery(event.target.value)} />
            <FormControl>
              <InputLabel id="explore-category-label">分类</InputLabel>
              <Select labelId="explore-category-label" label="分类" value={category} onChange={(event: SelectChangeEvent) => setCategory(event.target.value)}>
                {categories.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="explore-topic-label">话题</InputLabel>
              <Select labelId="explore-topic-label" label="话题" value={topic} onChange={(event: SelectChangeEvent) => setTopic(event.target.value)}>
                <MenuItem value="all">全部话题</MenuItem>
                {topics.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="explore-sort-label">排序</InputLabel>
              <Select labelId="explore-sort-label" label="排序" value={sort} onChange={(event: SelectChangeEvent) => setSort(event.target.value)}>
                <MenuItem value="latest">最新</MenuItem>
                <MenuItem value="popular">点赞最多</MenuItem>
                <MenuItem value="favorites">收藏最多</MenuItem>
                <MenuItem value="duration">时长最短</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          <VideoGrid items={items} viewState={items.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function VideoPlayerStage({ video, appState, dispatch }: { video: VideoItem; appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const videoDanmakus = appState.danmakus.filter((item) => item.videoId === video.id);
  const currentSeconds = Math.round((appState.player.progress / 100) * video.durationSeconds);
  const controlIconSx = {
    color: "var(--color-text-muted)",
    minWidth: "var(--size-touch-min)",
    minHeight: "var(--size-touch-min)",
    "&:hover": { color: "var(--color-brand-primary)", bgcolor: "var(--color-brand-soft)" },
  };

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        borderRadius: { xs: 0, sm: "var(--radius-card)" },
        border: { xs: 0, sm: "1px solid var(--color-border-subtle)" },
        bgcolor: "var(--color-surface-card)",
        boxShadow: { xs: "none", sm: "var(--shadow-card-soft)" },
      }}
    >
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="var(--spacing-2)" sx={{ px: "var(--spacing-3)", py: "var(--spacing-2)" }}>
        <Typography sx={{ color: "var(--color-brand-primary)", fontSize: "var(--font-size-small)", fontWeight: "var(--font-weight-brand)", letterSpacing: 0 }}>
          MOCK PLAYER
        </Typography>
        <Chip size="small" variant="outlined" label={appState.player.fullscreen ? "全屏模拟中" : "几何占位"} />
      </Stack>

      <Box sx={{ position: "relative", overflow: "hidden", bgcolor: "var(--color-surface-page)" }}>
        <VideoCover video={video} large />
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            pointerEvents: "none",
            background:
              "radial-gradient(circle at 76% 20%, var(--color-brand-soft) 0 28px, transparent 29px), radial-gradient(circle at 46% 52%, rgba(240,110,142,.12) 0 42px, transparent 43px)",
          }}
        />
        <Typography
          aria-hidden="true"
          sx={{
            position: "absolute",
            left: "var(--spacing-4)",
            top: "var(--spacing-4)",
            color: "var(--color-brand-primary)",
            fontWeight: "var(--font-weight-brand)",
          }}
        >
          SOFT PLAYER
        </Typography>
        {appState.player.danmakuVisible ? (
          <Box aria-hidden="true" sx={{ position: "absolute", inset: 0, overflow: "hidden", pointerEvents: "none" }}>
            {videoDanmakus.slice(0, 4).map((item, index) => (
              <Chip
                key={item.id}
                label={item.body}
                size="small"
                sx={{
                  position: "absolute",
                  top: `${18 + index * 15}%`,
                  left: 0,
                  color: "var(--color-text-strong)",
                  bgcolor: "rgba(255,255,255,.78)",
                  animation: "demo7-danmaku-float var(--motion-duration-danmaku) linear infinite",
                  animationDelay: `${index * 700}ms`,
                }}
              />
            ))}
          </Box>
        ) : null}
        <IconButton
          aria-label={appState.player.playing ? "暂停" : "播放"}
          onClick={() => dispatch({ type: "updatePlayer", patch: { playing: !appState.player.playing } })}
          sx={{
            position: "absolute",
            left: "50%",
            top: "50%",
            color: "var(--color-surface-card)",
            bgcolor: "rgba(34,32,36,.48)",
            transform: "translate(-50%, -50%)",
            "&:hover": { bgcolor: "rgba(34,32,36,.72)" },
          }}
        >
          {appState.player.playing ? <Pause size={24} /> : <Play size={24} />}
        </IconButton>
      </Box>

      <Box sx={{ px: "var(--spacing-3)", pt: "var(--spacing-1)", pb: "var(--spacing-3)" }}>
        <Slider
          aria-label="播放进度"
          value={appState.player.progress}
          onChange={(_, value) => dispatch({ type: "updatePlayer", patch: { progress: value as number } })}
          size="small"
          sx={{ display: "block", py: 0, color: "var(--color-brand-primary)" }}
        />
        <Stack direction="row" gap="var(--spacing-1)" alignItems="center" flexWrap="wrap" sx={{ minWidth: 0 }}>
          <Tooltip title={appState.player.playing ? "暂停" : "播放"}>
            <IconButton aria-label={appState.player.playing ? "暂停" : "播放"} onClick={() => dispatch({ type: "updatePlayer", patch: { playing: !appState.player.playing } })} sx={controlIconSx}>
              {appState.player.playing ? <Pause size={18} /> : <Play size={18} />}
            </IconButton>
          </Tooltip>
          <Typography sx={{ minWidth: 92, color: "var(--color-text-muted)", fontSize: "var(--font-size-small)", fontVariantNumeric: "tabular-nums" }}>
            {formatSeconds(currentSeconds)} / {video.duration}
          </Typography>
          <Stack direction="row" alignItems="center" gap="var(--spacing-1)" sx={{ width: { xs: 122, sm: 156 }, minWidth: 0 }}>
            <Volume2 size={18} />
            <Slider aria-label="音量" value={appState.player.volume} onChange={(_, value) => dispatch({ type: "updatePlayer", patch: { volume: value as number } })} size="small" />
          </Stack>
          <FormControl size="small" sx={{ minWidth: { xs: 92, sm: 112 } }}>
            <InputLabel id="quality-label">清晰度</InputLabel>
            <Select labelId="quality-label" label="清晰度" value={appState.player.quality} onChange={(event: SelectChangeEvent) => dispatch({ type: "updatePlayer", patch: { quality: event.target.value } })}>
              <MenuItem value="480P">480P</MenuItem>
              <MenuItem value="720P">720P</MenuItem>
              <MenuItem value="1080P">1080P</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: { xs: 88, sm: 104 } }}>
            <InputLabel id="speed-label">倍速</InputLabel>
            <Select labelId="speed-label" label="倍速" value={appState.player.speed} onChange={(event: SelectChangeEvent) => dispatch({ type: "updatePlayer", patch: { speed: event.target.value } })}>
              <MenuItem value="0.75x">0.75x</MenuItem>
              <MenuItem value="1.0x">1.0x</MenuItem>
              <MenuItem value="1.25x">1.25x</MenuItem>
              <MenuItem value="1.5x">1.5x</MenuItem>
            </Select>
          </FormControl>
          <Tooltip title={appState.player.danmakuVisible ? "隐藏弹幕" : "显示弹幕"}>
            <IconButton
              aria-label={appState.player.danmakuVisible ? "隐藏弹幕" : "显示弹幕"}
              color={appState.player.danmakuVisible ? "primary" : "default"}
              onClick={() => dispatch({ type: "updatePlayer", patch: { danmakuVisible: !appState.player.danmakuVisible } })}
              sx={controlIconSx}
            >
              <MessageCircle size={18} />
            </IconButton>
          </Tooltip>
          <Tooltip title="全屏模拟">
            <IconButton aria-label="全屏模拟" onClick={() => dispatch({ type: "updatePlayer", patch: { fullscreen: !appState.player.fullscreen } })} sx={controlIconSx}>
              <Compass size={18} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Box>
    </Paper>
  );
}

function ActionBar({ video, appState, dispatch }: { video: VideoItem; appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const liked = appState.likedVideoIds.includes(video.id);
  const disliked = appState.dislikedVideoIds.includes(video.id);
  const favorite = appState.favoriteVideoIds.includes(video.id);
  const watchLater = appState.watchLaterVideoIds.includes(video.id);
  return (
    <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)">
      <Button variant={liked ? "contained" : "outlined"} startIcon={<Heart size={16} fill={liked ? "currentColor" : "none"} />} onClick={() => dispatch({ type: "toggleLike", video })}>
        点赞
      </Button>
      <Button variant={disliked ? "contained" : "outlined"} startIcon={<ThumbsDown size={16} />} onClick={() => dispatch({ type: "toggleDislike", video })}>
        点踩
      </Button>
      <Button variant={favorite ? "contained" : "outlined"} startIcon={<Star size={16} fill={favorite ? "currentColor" : "none"} />} onClick={() => dispatch({ type: "toggleFavorite", video })}>
        收藏
      </Button>
      <Button variant={watchLater ? "contained" : "outlined"} startIcon={<Clock3 size={16} />} onClick={() => dispatch({ type: "toggleWatchLater", video })}>
        稍后看
      </Button>
      <Button variant="outlined" startIcon={<Flag size={16} />} onClick={() => dispatch({ type: "reportVideo", video })}>
        举报
      </Button>
    </Stack>
  );
}

function InfoPanel({ video, appState, dispatch }: { video: VideoItem; appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const creator = getCreator(video.creatorId);
  const navigate = useNavigate();
  const followed = appState.followedCreatorIds.includes(creator.id);
  const related = visibleVideos(appState).filter((item) => item.id !== video.id && item.topicIds.some((topicId) => video.topicIds.includes(topicId))).slice(0, 4);

  return (
    <Stack gap="var(--spacing-4)">
      <Box>
        <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
          {video.title}
        </Typography>
        <Typography sx={{ mt: "var(--spacing-1)", color: "var(--color-text-muted)" }}>
          {video.views} 播放 · {video.likes} 点赞 · {video.favorites} 收藏 · {video.date}
        </Typography>
      </Box>
      <ActionBar video={video} appState={appState} dispatch={dispatch} />
      <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" gap="var(--spacing-3)">
          <Box>
            <Stack direction="row" alignItems="center" gap="var(--spacing-2)">
              <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
                {creator.name}
              </Typography>
              {creator.verified ? <Chip size="small" color="primary" label="认证" /> : null}
            </Stack>
            <Typography sx={{ color: "var(--color-text-muted)" }}>{creator.handle} · {creator.followers} 关注者</Typography>
            <Typography sx={{ mt: "var(--spacing-2)" }}>{creator.bio}</Typography>
          </Box>
          <Stack direction="row" gap="var(--spacing-2)" alignItems="center">
            <Button variant="outlined" onClick={() => navigate(`/profile/${creator.id}`)}>主页</Button>
            <Button variant={followed ? "contained" : "outlined"} onClick={() => dispatch({ type: "toggleFollow", creator })}>
              {followed ? "已关注" : "关注"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
        <Typography sx={{ mb: "var(--spacing-2)" }}>{video.description}</Typography>
        <Stack direction="row" flexWrap="wrap" gap="var(--spacing-1)">
          {video.tags.map((tag) => <Chip key={tag} label={`#${tag}`} size="small" />)}
          {video.topicIds.map((topicId) => {
            const topic = topics.find((item) => item.id === topicId);
            return topic ? <Chip key={topic.id} label={topic.label} color="primary" variant="outlined" size="small" onClick={() => navigate(`/topics/${topic.id}`)} /> : null;
          })}
        </Stack>
      </Paper>
      {related.length ? (
        <Box>
          <Typography component="h2" sx={{ mb: "var(--spacing-3)", fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            相关推荐
          </Typography>
          <VideoGrid items={related} viewState="ready" appState={appState} dispatch={dispatch} />
        </Box>
      ) : null}
    </Stack>
  );
}

function CommentPanel({ video, appState, dispatch }: { video: VideoItem; appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const [body, setBody] = useState("");
  const [replyBodies, setReplyBodies] = useState<Record<string, string>>({});
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<"score" | "date">("score");
  const normalizedQuery = query.trim().toLowerCase();
  const videoComments = appState.comments
    .filter((comment) => comment.videoId === video.id)
    .filter((comment) => !normalizedQuery || comment.author.toLowerCase().includes(normalizedQuery) || comment.handle.toLowerCase().includes(normalizedQuery) || comment.body.toLowerCase().includes(normalizedQuery))
    .sort((a, b) => sort === "score" ? b.likes - a.likes : b.date.localeCompare(a.date));

  return (
    <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", minWidth: 0 }}>
      <Stack direction="row" alignItems="center" gap="var(--spacing-2)" sx={{ mb: "var(--spacing-3)" }}>
        <MessageCircle size={20} color="var(--color-brand-primary)" />
        <Typography component="h2" sx={{ fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
          评论 {videoComments.length}
        </Typography>
      </Stack>
      <Stack
        component="form"
        direction="column"
        gap="var(--spacing-2)"
        sx={{ p: "var(--spacing-3)", border: "1px solid var(--color-border-subtle)", borderRadius: "var(--radius-card)", bgcolor: "var(--color-surface-page)", minWidth: 0 }}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (body.trim().length < 4) return;
          dispatch({ type: "addComment", videoId: video.id, body });
          setBody("");
        }}
      >
        <TextField label="写一条友好的评论" value={body} onChange={(event) => setBody(event.target.value)} error={body.trim().length > 0 && body.trim().length < 4} helperText={body.trim().length > 0 && body.trim().length < 4 ? "评论至少 4 个字符" : `${body.length}/240`} multiline minRows={3} fullWidth />
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap="var(--spacing-2)" flexWrap="wrap" sx={{ minWidth: 0 }}>
          <Stack direction="row" gap="var(--spacing-1)" flexWrap="wrap" sx={{ minWidth: 0 }}>
            {["B", "I", "U", "S", "@", "颜", "图"].map((tool) => (
              <Button key={tool} size="small" variant="text" sx={{ minWidth: "var(--size-touch-min)" }}>{tool}</Button>
            ))}
          </Stack>
          <Button type="submit" variant="contained" startIcon={<Send size={16} />} disabled={body.trim().length < 4}>发布</Button>
        </Stack>
      </Stack>

      <Stack direction="row" alignItems="center" gap="var(--spacing-2)" flexWrap="wrap" sx={{ mt: "var(--spacing-3)", minWidth: 0 }}>
        <Button variant={sort === "score" ? "contained" : "outlined"} size="small" onClick={() => setSort("score")}>评分</Button>
        <Button variant={sort === "date" ? "contained" : "outlined"} size="small" onClick={() => setSort("date")}>发送日期</Button>
        <TextField label="搜索评论" size="small" value={query} onChange={(event) => setQuery(event.target.value)} sx={{ flex: "1 1 180px", minWidth: 0 }} />
        <Chip color="primary" label="1" />
      </Stack>

      <List aria-label="评论列表" sx={{ mt: "var(--spacing-2)", minWidth: 0 }}>
        {videoComments.length ? videoComments.map((comment) => {
          const replies = appState.replies.filter((reply) => reply.commentId === comment.id);
          return (
            <ListItem key={comment.id} alignItems="flex-start" divider sx={{ display: "block", px: 0 }}>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap="var(--spacing-2)">
                <ListItemText
                  primary={<Typography component="span" sx={{ fontWeight: "var(--font-weight-semibold)" }}>{comment.author} · {comment.handle}</Typography>}
                  secondary={<>{comment.body} · {comment.date} · {comment.likes} 点赞</>}
                />
                {comment.owned ? (
                  <IconButton aria-label="删除自己的评论" onClick={() => dispatch({ type: "deleteComment", commentId: comment.id })} sx={railButtonSx}>
                    <Trash2 size={17} />
                  </IconButton>
                ) : null}
              </Stack>
              {replies.length ? (
                <Box sx={{ ml: { xs: 0, sm: "var(--spacing-5)" }, mt: "var(--spacing-2)", display: "grid", gap: "var(--spacing-1)" }}>
                  {replies.map((reply) => (
                    <Paper key={reply.id} elevation={0} sx={{ p: "var(--spacing-2)", bgcolor: "var(--color-surface-inset)", borderRadius: "var(--radius-card)" }}>
                      <Stack direction="row" justifyContent="space-between" gap="var(--spacing-2)">
                        <Typography sx={{ color: "var(--color-text-muted)" }}>
                          <Box component="strong" sx={{ color: "var(--color-text-strong)" }}>{reply.author}</Box>：{reply.body} · {reply.date}
                        </Typography>
                        {reply.owned ? (
                          <IconButton aria-label="删除自己的回复" onClick={() => dispatch({ type: "deleteReply", replyId: reply.id })} sx={railButtonSx}>
                            <Trash2 size={16} />
                          </IconButton>
                        ) : null}
                      </Stack>
                    </Paper>
                  ))}
                </Box>
              ) : null}
              <Stack
                component="form"
                direction={{ xs: "column", sm: "row" }}
                gap="var(--spacing-2)"
                sx={{ mt: "var(--spacing-2)" }}
                onSubmit={(event: FormEvent<HTMLFormElement>) => {
                  event.preventDefault();
                  const replyBody = replyBodies[comment.id] ?? "";
                  if (replyBody.trim().length < 3) return;
                  dispatch({ type: "addReply", commentId: comment.id, body: replyBody });
                  setReplyBodies((current) => ({ ...current, [comment.id]: "" }));
                }}
              >
                <TextField size="small" label="回复" value={replyBodies[comment.id] ?? ""} onChange={(event) => setReplyBodies((current) => ({ ...current, [comment.id]: event.target.value }))} fullWidth />
                <Button type="submit" variant="outlined" startIcon={<Reply size={16} />} disabled={(replyBodies[comment.id] ?? "").trim().length < 3}>回复</Button>
              </Stack>
            </ListItem>
          );
        }) : (
          <ListItem>
            <ListItemText primary="还没有评论" secondary="发布第一条 mock 评论，验证评论区状态。" />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

function DanmakuPanel({
  video,
  appState,
  dispatch,
  compact = false,
  hideMobileSender = false,
}: {
  video: VideoItem;
  appState: AppState;
  dispatch: React.Dispatch<AppAction>;
  compact?: boolean;
  hideMobileSender?: boolean;
}) {
  const [body, setBody] = useState("");
  const items = appState.danmakus.filter((item) => item.videoId === video.id).sort((a, b) => a.timeSeconds - b.timeSeconds);

  return (
    <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
      <Stack direction="row" alignItems="center" justifyContent="space-between" gap="var(--spacing-2)" sx={{ mb: "var(--spacing-3)" }}>
        <Typography component="h2" sx={{ fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
          弹幕 {items.length}
        </Typography>
        <Chip label={appState.player.danmakuVisible ? "显示中" : "已隐藏"} color={appState.player.danmakuVisible ? "primary" : "default"} size="small" />
      </Stack>
      <Stack
        component="form"
        direction={{ xs: "column", sm: compact ? "column" : "row" }}
        gap="var(--spacing-2)"
        sx={{ display: hideMobileSender ? { xs: "none", sm: "flex" } : "flex" }}
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (body.trim().length < 2) return;
          dispatch({ type: "addDanmaku", video, body });
          setBody("");
        }}
      >
        <TextField size="small" label="发送弹幕" value={body} onChange={(event) => setBody(event.target.value)} fullWidth />
        <Button type="submit" variant="contained" startIcon={<Send size={16} />} disabled={body.trim().length < 2}>发送</Button>
      </Stack>
      <Box sx={{ mt: "var(--spacing-3)", overflowX: "auto" }}>
        <Table size="small" aria-label="弹幕表格" sx={{ minWidth: { xs: 320, sm: "auto" } }}>
          <TableHead>
            <TableRow>
              <TableCell>时间</TableCell>
              <TableCell>内容</TableCell>
              <TableCell>发送日期</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.length ? items.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.time}</TableCell>
                <TableCell>{item.body}</TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            )) : (
              <TableRow>
                <TableCell colSpan={3}>暂无弹幕，发送一条 mock 弹幕验证本地状态。</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Paper>
  );
}

function MobileDanmakuSender({ video, dispatch }: { video: VideoItem; dispatch: React.Dispatch<AppAction> }) {
  const [body, setBody] = useState("");

  return (
    <Paper
      component="form"
      elevation={0}
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (body.trim().length < 2) return;
        dispatch({ type: "addDanmaku", video, body });
        setBody("");
      }}
      sx={{
        position: "fixed",
        left: 0,
        right: 0,
        bottom: "calc(var(--size-nav-mobile) + env(safe-area-inset-bottom) + var(--spacing-2))",
        zIndex: (theme) => theme.zIndex.appBar - 1,
        display: { xs: "grid", sm: "none" },
        gridTemplateColumns: "minmax(0, 1fr) auto",
        gap: "var(--spacing-2)",
        mx: "var(--spacing-2)",
        p: "var(--spacing-2)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-card)",
        bgcolor: "var(--color-surface-card)",
        boxShadow: "var(--shadow-elevated)",
      }}
    >
      <TextField size="small" label="发送弹幕" value={body} onChange={(event) => setBody(event.target.value)} />
      <Tooltip title="发送弹幕">
        <span>
          <IconButton type="submit" color="primary" aria-label="发送弹幕" disabled={body.trim().length < 2}>
            <Send size={18} />
          </IconButton>
        </span>
      </Tooltip>
    </Paper>
  );
}

function VideoDetailPage({ appState, dispatch }: { appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const { id } = useParams();
  const location = useLocation();
  const video = videos.find((item) => item.id === id);
  const requestedTab = new URLSearchParams(location.search).get("tab");
  const normalizedTab = requestedTab === "comments" || requestedTab === "danmaku" ? requestedTab : "info";
  const [activeTab, setActiveTab] = useState(normalizedTab);

  useEffect(() => {
    if (video) dispatch({ type: "visitVideo", videoId: video.id });
  }, [video, dispatch]);

  useEffect(() => {
    setActiveTab(normalizedTab);
  }, [normalizedTab]);

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
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Box
            sx={{
              position: { xs: "sticky", sm: "static" },
              top: { xs: "var(--size-nav-mobile)", sm: "auto" },
              zIndex: { xs: 2, sm: "auto" },
              bgcolor: "var(--color-surface-page)",
              mx: { xs: "calc(var(--container-padding-mobile) * -1)", sm: 0 },
            }}
          >
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) var(--layout-player-side)" }, gap: { xs: 0, lg: "var(--spacing-4)" } }}>
              <VideoPlayerStage video={video} appState={appState} dispatch={dispatch} />
              <Box sx={{ display: { xs: "none", lg: "block" } }}>
                <DanmakuPanel video={video} appState={appState} dispatch={dispatch} compact />
              </Box>
            </Box>
            <Tabs value={activeTab} onChange={(_, value: string) => setActiveTab(value)} aria-label="视频详情标签" sx={{ borderBottom: "1px solid var(--color-border-subtle)", px: { xs: "var(--container-padding-mobile)", sm: 0 }, bgcolor: "var(--color-surface-page)", "& .MuiTabs-indicator": { bgcolor: "var(--color-brand-primary)" } }}>
              <Tab value="info" label="信息" />
              <Tab value="comments" label="评论" />
              <Tab value="danmaku" label="弹幕" />
            </Tabs>
          </Box>
          {activeTab === "info" ? <InfoPanel video={video} appState={appState} dispatch={dispatch} /> : null}
          {activeTab === "comments" ? <CommentPanel video={video} appState={appState} dispatch={dispatch} /> : null}
          {activeTab === "danmaku" ? <DanmakuPanel video={video} appState={appState} dispatch={dispatch} hideMobileSender /> : null}
          {activeTab === "danmaku" ? <MobileDanmakuSender video={video} dispatch={dispatch} /> : null}
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function UploadPage({ appState, dispatch }: { appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const [errors, setErrors] = useState<UploadErrors>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const draft = appState.draft;
  const updateDraft = (key: keyof UploadDraft, value: string) => {
    dispatch({ type: "updateDraft", key, value });
    setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const validate = () => {
    const next: UploadErrors = {};
    if (draft.title.trim().length < 6) next.title = "标题至少 6 个字符";
    if (!draft.category) next.category = "请选择分类";
    if (draft.description.trim().length < 12) next.description = "简介至少 12 个字符";
    if (draft.tags.trim().length < 2) next.tags = "请填写至少一个标签";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ mb: "var(--spacing-2)", fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            投稿中心
          </Typography>
          <Typography sx={{ mb: "var(--spacing-4)", color: "var(--color-text-muted)" }}>
            表单只写入本地 reducer，用来验证草稿、校验、确认弹窗和成功通知。
          </Typography>
          <Paper
            component="form"
            noValidate
            elevation={0}
            sx={{
              display: "grid",
              gap: "var(--spacing-3)",
              p: "var(--spacing-4)",
              borderRadius: "var(--radius-card)",
              border: "1px solid var(--color-border-subtle)",
              bgcolor: "var(--color-surface-card)",
              boxShadow: "var(--shadow-card-soft)",
            }}
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (!validate()) {
                dispatch({ type: "showToast", message: "请先修正投稿表单", severity: "error" });
                return;
              }
              setDialogOpen(true);
            }}
          >
            <TextField label="视频标题" value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} error={Boolean(errors.title)} helperText={errors.title ?? "建议 12 到 28 个字，便于移动端扫描。"} required />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: "var(--spacing-3)" }}>
              <FormControl error={Boolean(errors.category)}>
                <InputLabel id="upload-category-label">分类</InputLabel>
                <Select labelId="upload-category-label" label="分类" value={draft.category} onChange={(event: SelectChangeEvent) => updateDraft("category", event.target.value)}>
                  {categories.filter((item) => item.id !== "all").map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="upload-source-label">来源</InputLabel>
                <Select labelId="upload-source-label" label="来源" value={draft.sourceType} onChange={(event: SelectChangeEvent) => updateDraft("sourceType", event.target.value)}>
                  <MenuItem value="original">原创</MenuItem>
                  <MenuItem value="repost">转载</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="upload-visibility-label">可见性</InputLabel>
                <Select labelId="upload-visibility-label" label="可见性" value={draft.visibility} onChange={(event: SelectChangeEvent) => updateDraft("visibility", event.target.value)}>
                  <MenuItem value="public">公开</MenuItem>
                  <MenuItem value="unlisted">仅链接可见</MenuItem>
                  <MenuItem value="private">私密</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField label="简介" value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} error={Boolean(errors.description)} helperText={errors.description ?? "说明内容、标签和可替换素材来源。"} multiline minRows={4} required />
            <TextField label="标签" value={draft.tags} onChange={(event) => updateDraft("tags", event.target.value)} error={Boolean(errors.tags)} helperText={errors.tags ?? "用逗号分隔，例如：剪辑, 社区, 新手"} />
            <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)">
              <Button type="submit" variant="contained" startIcon={<Upload size={16} />}>模拟发布</Button>
              <Button type="button" variant="outlined" onClick={() => {
                setErrors({});
                dispatch({ type: "resetDraft" });
              }}>重置草稿</Button>
            </Stack>
          </Paper>
        </Box>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="upload-success-title">
          <DialogTitle id="upload-success-title">投稿已模拟提交</DialogTitle>
          <DialogContent>
            <Typography>这个 demo 不会上传真实文件，但已经验证表单校验、提交确认、通知写入和成功 toast。</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>继续编辑</Button>
            <Button variant="contained" onClick={() => {
              setDialogOpen(false);
              dispatch({ type: "uploadSuccess" });
            }}>完成</Button>
          </DialogActions>
        </Dialog>
      </ContentContainer>
    </PageFrame>
  );
}

function NotificationsPage({ appState, dispatch }: { appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const unread = appState.notifications.filter((item) => !item.read).length;
  const navigate = useNavigate();
  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap="var(--spacing-3)" sx={{ mb: "var(--spacing-4)" }}>
            <Box>
              <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
                通知
              </Typography>
              <Typography sx={{ color: "var(--color-text-muted)" }}>{unread} 条未读通知</Typography>
            </Box>
            <Button variant="outlined" disabled={!unread} onClick={() => dispatch({ type: "markAllNotificationsRead" })}>全部已读</Button>
          </Stack>
          <Paper elevation={0} sx={{ borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", overflow: "hidden" }}>
            <List disablePadding aria-label="通知列表">
              {appState.notifications.map((item) => (
                <ListItemButton
                  key={item.id}
                  divider
                  selected={!item.read}
                  onClick={() => {
                    dispatch({ type: "markNotificationRead", notificationId: item.id });
                    if (item.videoId) navigate(`/video/${item.videoId}`);
                  }}
                >
                  <ListItemText
                    primary={<Stack direction="row" alignItems="center" gap="var(--spacing-2)"><Typography component="span" sx={{ fontWeight: "var(--font-weight-semibold)" }}>{item.title}</Typography>{!item.read ? <Chip label="未读" color="primary" size="small" /> : null}</Stack>}
                    secondary={`${item.body} · ${item.date}`}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function ProfileHeader({ creator, followed, onToggleFollow, mine = false }: { creator: CreatorProfile; followed: boolean; onToggleFollow: () => void; mine?: boolean }) {
  return (
    <Paper elevation={0} sx={{ position: "relative", overflow: "hidden", mb: "var(--spacing-4)", p: "var(--spacing-5)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", boxShadow: "var(--shadow-card-soft)" }}>
      <Box aria-hidden="true" sx={{ position: "absolute", inset: "auto var(--spacing-4) var(--spacing-4) auto", width: "112px", height: "72px", borderRadius: "var(--radius-card)", bgcolor: "var(--color-brand-soft)", background: coverBackgrounds[creator.tone], opacity: .72, transform: "rotate(-10deg)" }} />
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap="var(--spacing-4)" sx={{ position: "relative" }}>
        <Box>
          <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            {mine ? profile.name : creator.name}
          </Typography>
          <Typography sx={{ color: "var(--color-text-muted)" }}>{mine ? profile.handle : creator.handle}</Typography>
          <Typography sx={{ mt: "var(--spacing-2)", maxWidth: "62ch" }}>{mine ? profile.bio : creator.bio}</Typography>
          <Stack direction="row" gap="var(--spacing-2)" flexWrap="wrap" sx={{ mt: "var(--spacing-3)" }}>
            <Chip label={`${mine ? profile.followers : creator.followers} 关注者`} />
            <Chip label={`${mine ? profile.following : creator.following} 正在关注`} />
            <Chip label={`${mine ? profile.videos : creator.videos} 视频`} />
          </Stack>
        </Box>
        {!mine ? (
          <Button variant={followed ? "contained" : "outlined"} onClick={onToggleFollow}>
            {followed ? "已关注" : "关注"}
          </Button>
        ) : null}
      </Stack>
    </Paper>
  );
}

function CreatorProfilePage({ appState, dispatch }: { appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const { creatorId } = useParams();
  const creator = creators.find((item) => item.id === creatorId);
  if (!creator) {
    return (
      <PageFrame>
        <ContentContainer compact>
          <Box sx={{ pt: "var(--spacing-6)" }}>
            <StateBlock state="error" title="创作者不存在" body="当前 mock 数据里没有这个创作者。" />
          </Box>
        </ContentContainer>
      </PageFrame>
    );
  }
  const items = visibleVideos(appState).filter((video) => video.creatorId === creator.id);
  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <ProfileHeader creator={creator} followed={appState.followedCreatorIds.includes(creator.id)} onToggleFollow={() => dispatch({ type: "toggleFollow", creator })} />
          <VideoGrid items={items} viewState={items.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function MePage({ appState, dispatch }: { appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const pseudoCreator = creators[0];
  const favoriteItems = videos.filter((video) => appState.favoriteVideoIds.includes(video.id));
  const likedItems = videos.filter((video) => appState.likedVideoIds.includes(video.id));
  const watchLaterItems = videos.filter((video) => appState.watchLaterVideoIds.includes(video.id));
  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <ProfileHeader creator={pseudoCreator} followed mine onToggleFollow={() => undefined} />
          <Stack gap="var(--spacing-6)">
            <Box>
              <Typography component="h2" sx={{ mb: "var(--spacing-3)", fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
                我的收藏
              </Typography>
              <VideoGrid items={favoriteItems} viewState={favoriteItems.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
            </Box>
            <Box>
              <Typography component="h2" sx={{ mb: "var(--spacing-3)", fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
                最近点赞
              </Typography>
              <VideoGrid items={likedItems} viewState={likedItems.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
            </Box>
            <Box>
              <Typography component="h2" sx={{ mb: "var(--spacing-3)", fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
                稍后观看
              </Typography>
              <VideoGrid items={watchLaterItems} viewState={watchLaterItems.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
            </Box>
          </Stack>
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function LibraryPage({ kind, appState, dispatch }: { kind: "history" | "collections"; appState: AppState; dispatch: React.Dispatch<AppAction> }) {
  const historyItems = appState.historyVideoIds.map((id) => videos.find((video) => video.id === id)).filter((video): video is VideoItem => Boolean(video));
  const favoriteItems = videos.filter((video) => appState.favoriteVideoIds.includes(video.id));
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
          <VideoGrid items={kind === "history" ? historyItems : favoriteItems} viewState={(kind === "history" ? historyItems : favoriteItems).length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function TopicPage({ appState, dispatch }: { appState: AppState; dispatch: React.Dispatch<AppAction> }) {
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
          <VideoGrid items={items} viewState={items.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function Toast({ toast, onClose }: { toast: ToastState | null; onClose: () => void }) {
  return (
    <Snackbar open={Boolean(toast)} autoHideDuration={2600} onClose={onClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert severity={toast?.severity ?? "success"} variant="filled" onClose={onClose}>
        {toast?.message}
      </Alert>
    </Snackbar>
  );
}

function AppRoutes() {
  const [appState, dispatch] = useReducer(reducer, initialState);
  const unreadCount = appState.notifications.filter((notification) => !notification.read).length;

  return (
    <>
      <Navigation unreadCount={unreadCount} />
      <Routes>
        <Route path="/" element={<HomePage appState={appState} dispatch={dispatch} />} />
        <Route path="/explore" element={<ExplorePage appState={appState} dispatch={dispatch} />} />
        <Route path="/video/:id" element={<VideoDetailPage appState={appState} dispatch={dispatch} />} />
        <Route path="/profile/:creatorId" element={<CreatorProfilePage appState={appState} dispatch={dispatch} />} />
        <Route path="/me" element={<MePage appState={appState} dispatch={dispatch} />} />
        <Route path="/notifications" element={<NotificationsPage appState={appState} dispatch={dispatch} />} />
        <Route path="/upload" element={<UploadPage appState={appState} dispatch={dispatch} />} />
        <Route path="/history" element={<LibraryPage kind="history" appState={appState} dispatch={dispatch} />} />
        <Route path="/collections" element={<LibraryPage kind="collections" appState={appState} dispatch={dispatch} />} />
        <Route path="/topics/:topicId" element={<TopicPage appState={appState} dispatch={dispatch} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast toast={appState.toast} onClose={() => dispatch({ type: "closeToast" })} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
