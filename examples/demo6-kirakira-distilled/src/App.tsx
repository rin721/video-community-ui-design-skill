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
  SvgIcon,
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
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { useMemo, useState, type FormEvent, type MouseEvent, type ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import {
  categories,
  comments as initialComments,
  creators,
  danmakus as initialDanmakus,
  draftUpload,
  initialPlayerState,
  notifications as initialNotifications,
  profile,
  videos,
} from "./data/mock";
import type {
  CommentItem,
  CreatorProfile,
  DanmakuItem,
  NotificationItem,
  PlayerState,
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
  followedCreatorIds: string[];
  comments: CommentItem[];
  danmakus: DanmakuItem[];
  notifications: NotificationItem[];
  player: PlayerState;
  toast: ToastState | null;
};

type AppActions = {
  showToast: (message: string, severity?: ToastState["severity"]) => void;
  closeToast: () => void;
  updatePlayer: (patch: Partial<PlayerState>) => void;
  toggleLike: (video: VideoItem) => void;
  toggleDislike: (video: VideoItem) => void;
  toggleFavorite: (video: VideoItem) => void;
  toggleWatchLater: (video: VideoItem) => void;
  toggleFollow: (creator: CreatorProfile) => void;
  addComment: (videoId: string, body: string) => void;
  deleteComment: (commentId: string) => void;
  addDanmaku: (video: VideoItem, body: string) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
};

function HomeIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4v-9.5Z" /></SvgIcon>;
}

function SearchIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M10.5 4a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 10.5 4Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" /></SvgIcon>;
}

function UploadIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M11 17h2V8.8l3.1 3.1 1.4-1.4L12 5l-5.5 5.5 1.4 1.4L11 8.8V17ZM5 19h14v2H5v-2Z" /></SvgIcon>;
}

function BellIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M12 22a2.6 2.6 0 0 0 2.45-1.75h-4.9A2.6 2.6 0 0 0 12 22Zm7-5-1.6-1.6V11a5.42 5.42 0 0 0-4.15-5.35V4a1.25 1.25 0 0 0-2.5 0v1.65A5.42 5.42 0 0 0 6.6 11v4.4L5 17v1h14v-1Z" /></SvgIcon>;
}

function UserIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z" /></SvgIcon>;
}

function StarIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="m12 3 2.7 5.48 6.05.88-4.38 4.27 1.03 6.02L12 16.8l-5.4 2.85 1.03-6.02-4.38-4.27 6.05-.88L12 3Z" /></SvgIcon>;
}

function HistoryIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M12 5a7 7 0 1 1-6.15 10.35l1.75-1A5 5 0 1 0 7.1 9H10v2H4V5h2v2.2A6.98 6.98 0 0 1 12 5Zm1 3h-2v5l4 2 .9-1.65L13 11.9V8Z" /></SvgIcon>;
}

function PlayIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M8 5v14l11-7L8 5Z" /></SvgIcon>;
}

function PauseIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z" /></SvgIcon>;
}

function HeartIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M12 21s-7-4.35-9.5-8.8C.7 9 .9 5.5 3.55 3.7 6.1 1.98 9 3.2 12 6.2c3-3 5.9-4.22 8.45-2.5C23.1 5.5 23.3 9 21.5 12.2 19 16.65 12 21 12 21Z" /></SvgIcon>;
}

function ThumbDownIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M3 14h4V4H3v10Zm18-1c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L12.17 4 5.59 10.59C5.22 10.95 5 11.45 5 12v8h9c.83 0 1.54-.5 1.84-1.22L18.86 12H19c1.1 0 2 .9 2 1Z" /></SvgIcon>;
}

function CommentIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M5 5h14v10H8.8L5 18.2V5Zm2 2v6.8l1.05-.8H17V7H7Z" /></SvgIcon>;
}

function DanmakuIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M4 6h16v3H4V6Zm2 5h12v3H6v-3Zm3 5h6v3H9v-3Z" /></SvgIcon>;
}

function MoreIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M12 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /></SvgIcon>;
}

function VolumeIcon(props: SvgIconProps) {
  return <SvgIcon viewBox="0 0 24 24" {...props}><path d="M4 9v6h4l5 4V5L8 9H4Zm11.5 3a4.5 4.5 0 0 0-1.5-3.35v6.7A4.5 4.5 0 0 0 15.5 12Zm1.5-6.4v2.15a7 7 0 0 1 0 8.5v2.15a9 9 0 0 0 0-12.8Z" /></SvgIcon>;
}

const navigationItems = [
  { label: "首页", path: "/", icon: HomeIcon },
  { label: "探索", path: "/explore", icon: SearchIcon },
  { label: "投稿", path: "/upload", icon: UploadIcon },
  { label: "通知", path: "/notifications", icon: BellIcon },
  { label: "历史", path: "/history", icon: HistoryIcon },
  { label: "收藏", path: "/collections", icon: StarIcon },
  { label: "我的", path: "/me", icon: UserIcon },
];

const toneFilter: Record<VideoTone, string> = {
  rose: "none",
  gold: "hue-rotate(28deg) saturate(.94)",
  blue: "hue-rotate(158deg) saturate(.78)",
  mint: "hue-rotate(88deg) saturate(.72)",
  violet: "hue-rotate(235deg) saturate(.85)",
  mono: "saturate(.35) contrast(.96)",
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

function getCreator(creatorId: string) {
  return creators.find((creator) => creator.id === creatorId) ?? creators[0];
}

function formatSeconds(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
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

function ContentContainer({ children }: { children: ReactNode }) {
  return (
    <Box
      sx={{
        width: "min(100%, var(--container-content-max))",
        boxSizing: "border-box",
        mx: "auto",
        px: {
          xs: "var(--container-padding-mobile)",
          sm: "var(--container-padding-tablet)",
          lg: "var(--container-padding-desktop)",
        },
      }}
    >
      {children}
    </Box>
  );
}

function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Box sx={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-2)", minWidth: 0 }}>
      <Box
        aria-hidden="true"
        sx={{
          width: compact ? "var(--spacing-4)" : "var(--spacing-5)",
          height: compact ? "var(--spacing-4)" : "var(--spacing-5)",
          bgcolor: "var(--color-brand-primary)",
          clipPath:
            "polygon(50% 0, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%)",
        }}
      />
      <Typography sx={{ color: "var(--color-brand-primary)", fontSize: compact ? 20 : 28, fontWeight: "var(--font-weight-brand)" }}>
        PINKDAN
      </Typography>
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
          <IconButton aria-label="打开菜单" sx={railButtonSx}>
            <SearchIcon fontSize="small" />
          </IconButton>
          <BrandMark compact />
          <IconButton aria-label="打开通知" sx={railButtonSx} onClick={() => navigate("/notifications")}>
            <Badge color="primary" badgeContent={unreadCount}>
              <BellIcon fontSize="small" />
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
        <Box component="nav" aria-label="主入口" sx={{ display: "grid", gap: "var(--spacing-2)", justifyItems: "center" }}>
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
                      <Icon fontSize="small" />
                    </Badge>
                  ) : (
                    <Icon fontSize="small" />
                  )}
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>

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
          <Box sx={{ width: "var(--spacing-4)", height: "var(--spacing-4)", bgcolor: "var(--color-brand-primary)", borderRadius: "var(--radius-badge)" }} />
          <Typography sx={{ fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>PINKDAN</Typography>
        </Box>

        <Tooltip title="我的主页" placement="right">
          <IconButton aria-label="我的主页" onClick={() => navigate("/me")} sx={railButtonSx}>
            <UserIcon fontSize="small" />
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
                    <Icon fontSize="small" />
                  </Badge>
                ) : (
                  <Icon fontSize="small" />
                )
              }
              aria-current={activeItem.path === item.path ? "page" : undefined}
              sx={{ minWidth: 0, color: "var(--color-text-muted)", "&.Mui-selected, &[aria-current='page']": { color: "var(--color-brand-primary)" } }}
            />
          );
        })}
      </BottomNavigation>
    </>
  );
}

function VideoCover({ video, large = false }: { video: VideoItem; large?: boolean }) {
  return (
    <CardMedia
      component="div"
      role="img"
      aria-label={video.thumbnailAlt}
      className="demo6-cover"
      sx={{
        position: "relative",
        aspectRatio: "var(--grid-media-aspect)",
        minHeight: large ? { xs: 216, md: 420 } : undefined,
        overflow: "hidden",
        borderRadius: large ? 0 : "var(--radius-card)",
        background:
          "radial-gradient(circle at 20% 72%, rgba(255,255,255,.7) 0 10%, transparent 11%), radial-gradient(circle at 74% 26%, rgba(255,255,255,.48) 0 13%, transparent 14%), linear-gradient(118deg, rgba(255,255,255,.52) 0 18%, transparent 19% 28%, rgba(255,255,255,.32) 29% 35%, transparent 36%), linear-gradient(135deg, rgb(252,199,209), rgb(239,164,198) 48%, rgb(181,216,230))",
        boxShadow: "inset 0 0 38px rgba(255,255,255,.55)",
        filter: toneFilter[video.tone],
        transformOrigin: "center",
        transition: "transform var(--motion-duration-fast) var(--motion-easing-standard)",
        "&::before": {
          content: '""',
          position: "absolute",
          right: "10%",
          top: "20%",
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
          width: "90px",
          height: "90px",
          border: "3px solid rgba(255,255,255,.56)",
          borderRadius: "var(--radius-round)",
        },
      }}
    />
  );
}

function VideoCard({ video, appState, actions }: { video: VideoItem; appState: AppState; actions: AppActions }) {
  const navigate = useNavigate();
  const creator = getCreator(video.creatorId);
  return (
    <Card sx={{ bgcolor: "transparent", overflow: "visible", "&:hover .demo6-cover": { transform: "var(--motion-transform-media-hover)" }, "&:hover .demo6-title": { color: "var(--color-brand-hover)" } }}>
      <CardActionArea onClick={() => navigate(`/video/${video.id}`)} aria-label={`打开视频：${video.title}`} sx={{ borderRadius: "var(--radius-card)" }}>
        <VideoCover video={video} />
        <CardContent sx={{ px: "var(--spacing-1)", pt: "var(--spacing-2)", pb: 0 }}>
          <Typography className="demo6-title" component="h3" sx={{ display: "-webkit-box", minHeight: "2.9em", m: 0, overflow: "hidden", color: "var(--color-text-strong)", fontSize: "var(--font-size-card-title)", fontWeight: "var(--font-weight-semibold)", WebkitBoxOrient: "vertical", WebkitLineClamp: 2 }}>
            {video.title}
          </Typography>
          <Typography sx={{ mt: "var(--spacing-1)", color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>{creator.name}</Typography>
          <Typography sx={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>{video.views} 播放 · {video.duration}</Typography>
        </CardContent>
      </CardActionArea>
      <Box sx={{ display: "flex", gap: "var(--spacing-1)", mt: "var(--spacing-1)", px: "var(--spacing-1)" }}>
        <Tooltip title="喜欢">
          <IconButton color={appState.likedVideoIds.includes(video.id) ? "primary" : "default"} aria-label={`喜欢 ${video.title}`} onClick={() => actions.toggleLike(video)} sx={railButtonSx}>
            <HeartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title="收藏">
          <IconButton color={appState.favoriteVideoIds.includes(video.id) ? "primary" : "default"} aria-label={`收藏 ${video.title}`} onClick={() => actions.toggleFavorite(video)} sx={railButtonSx}>
            <StarIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
    </Card>
  );
}

function VideoGrid({ items, state, appState, actions }: { items: VideoItem[]; state: ViewState; appState: AppState; actions: AppActions }) {
  if (state === "loading") return <StateBlock state="loading" title="正在加载发现流" body="这是本地 loading 状态模拟，切换 ready 即可恢复内容流。" />;
  if (state === "error") return <StateBlock state="error" title="内容加载失败" body="这是本地错误状态模拟，可返回 ready 状态恢复内容流。" />;
  if (state === "empty" || !items.length) return <StateBlock state="empty" title="没有找到内容" body="换一个分类、关键词或排序方式再试试。" />;
  return (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(auto-fit, minmax(var(--grid-feed-min), 1fr))" }, gap: { xs: "14px", sm: "var(--grid-feed-gap)" }, "@media (max-width: 359px)": { gridTemplateColumns: "1fr" } }}>
      {items.map((video) => <VideoCard key={video.id} video={video} appState={appState} actions={actions} />)}
    </Box>
  );
}

function StateBlock({ state, title, body }: { state: ViewState; title: string; body: string }) {
  const color = state === "error" ? "error" : state === "success" ? "success" : "info";
  return (
    <Paper role={state === "error" ? "alert" : "status"} elevation={0} sx={{ p: "var(--spacing-6)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", boxShadow: "var(--shadow-card-soft)" }}>
      <Chip color={color} label={state} sx={{ mb: "var(--spacing-3)" }} />
      <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>{title}</Typography>
      <Typography sx={{ mt: "var(--spacing-2)", color: "var(--color-text-muted)" }}>{body}</Typography>
    </Paper>
  );
}

function PlayerMenu({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (value: string) => void }) {
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  return (
    <>
      <Button size="small" variant="text" aria-haspopup="menu" onClick={(event: MouseEvent<HTMLButtonElement>) => setAnchor(event.currentTarget)}>{value}</Button>
      <Menu anchorEl={anchor} open={Boolean(anchor)} onClose={() => setAnchor(null)}>
        {options.map((option) => (
          <MenuItem key={option} selected={option === value} onClick={() => { onChange(option); setAnchor(null); }}>
            {label} {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

function DistilledPlayer({ video, appState, actions }: { video: VideoItem; appState: AppState; actions: AppActions }) {
  const current = Math.round((appState.player.progress / 100) * video.durationSeconds);
  const visibleDanmakus = appState.danmakus.filter((item) => item.videoId === video.id).slice(0, 3);

  return (
    <Paper elevation={0} sx={{ overflow: "hidden", borderRadius: { xs: 0, sm: "var(--radius-card)" }, border: { xs: 0, sm: "1px solid var(--color-border-subtle)" }, bgcolor: "#fff", boxShadow: { xs: "none", sm: "var(--shadow-card-soft)" } }}>
      <Box sx={{ position: "relative", overflow: "hidden" }}>
        <VideoCover video={video} large />
        {appState.player.danmakuVisible ? (
          <Box aria-label="模拟弹幕层" sx={{ position: "absolute", inset: "12% 0 auto 0", pointerEvents: "none", display: "grid", gap: "var(--spacing-2)", color: "#fff", textShadow: "0 1px 6px rgba(34,32,36,.42)" }}>
            {visibleDanmakus.map((item, index) => (
              <Typography key={item.id} sx={{ width: "max-content", px: "var(--spacing-2)", py: "var(--spacing-1)", borderRadius: "var(--radius-badge)", bgcolor: "rgba(34,32,36,.18)", animation: `demo6-danmaku-float ${10 + index * 2}s linear infinite`, animationDelay: `${index * -2}s` }}>
                {item.body}
              </Typography>
            ))}
          </Box>
        ) : null}
      </Box>

      <Box sx={{ display: "grid", gridTemplateColumns: "auto 1fr auto auto auto auto auto", alignItems: "center", gap: "var(--spacing-2)", px: "var(--spacing-2)", py: "var(--spacing-1)", borderTop: "1px solid var(--color-border-subtle)", "@media (max-width: 720px)": { gridTemplateColumns: "auto 1fr auto auto", rowGap: "var(--spacing-1)" } }}>
        <Tooltip title={appState.player.playing ? "暂停" : "播放"}>
          <IconButton aria-label={appState.player.playing ? "暂停" : "播放"} onClick={() => actions.updatePlayer({ playing: !appState.player.playing })} sx={railButtonSx}>
            {appState.player.playing ? <PauseIcon fontSize="small" /> : <PlayIcon fontSize="small" />}
          </IconButton>
        </Tooltip>
        <Slider
          aria-label="播放进度"
          value={appState.player.progress}
          onChange={(_, value) => actions.updatePlayer({ progress: Array.isArray(value) ? value[0] : value })}
          size="small"
        />
        <Typography sx={{ minWidth: 92, color: "var(--color-text-muted)", fontVariantNumeric: "tabular-nums", fontSize: "var(--font-size-small)" }}>{formatSeconds(current)} / {video.duration}</Typography>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <PlayerMenu label="清晰度" value={appState.player.quality} options={["240P", "720P", "1080P"]} onChange={(quality) => actions.updatePlayer({ quality })} />
        </Box>
        <Box sx={{ display: { xs: "none", md: "block" } }}>
          <PlayerMenu label="倍速" value={appState.player.speed} options={["0.75x", "1.0x", "1.25x", "1.5x"]} onChange={(speed) => actions.updatePlayer({ speed })} />
        </Box>
        <Tooltip title="音量">
          <Box sx={{ display: { xs: "none", lg: "flex" }, alignItems: "center", width: 110, gap: "var(--spacing-1)" }}>
            <VolumeIcon fontSize="small" />
            <Slider aria-label="音量" size="small" value={appState.player.volume} onChange={(_, value) => actions.updatePlayer({ volume: Array.isArray(value) ? value[0] : value })} />
          </Box>
        </Tooltip>
        <Box sx={{ display: "flex", gap: "var(--spacing-1)" }}>
          <Tooltip title={appState.player.danmakuVisible ? "关闭弹幕" : "打开弹幕"}>
            <IconButton color={appState.player.danmakuVisible ? "primary" : "default"} aria-label="切换弹幕" onClick={() => actions.updatePlayer({ danmakuVisible: !appState.player.danmakuVisible })} sx={railButtonSx}>
              <DanmakuIcon fontSize="small" />
            </IconButton>
          </Tooltip>
          <Tooltip title="模拟全屏">
            <IconButton aria-label="模拟全屏" onClick={() => actions.updatePlayer({ fullscreen: !appState.player.fullscreen })} sx={railButtonSx}>
              <MoreIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>
    </Paper>
  );
}

function InfoPanel({ video, appState, actions }: { video: VideoItem; appState: AppState; actions: AppActions }) {
  const creator = getCreator(video.creatorId);
  const actionItems = [
    { label: "点赞", active: appState.likedVideoIds.includes(video.id), icon: <HeartIcon />, onClick: () => actions.toggleLike(video), count: video.likes },
    { label: "点踩", active: appState.dislikedVideoIds.includes(video.id), icon: <ThumbDownIcon />, onClick: () => actions.toggleDislike(video), count: video.dislikes },
    { label: "收藏", active: appState.favoriteVideoIds.includes(video.id), icon: <StarIcon />, onClick: () => actions.toggleFavorite(video), count: video.favorites },
    { label: "稍后观看", active: appState.watchLaterVideoIds.includes(video.id), icon: <HistoryIcon />, onClick: () => actions.toggleWatchLater(video), count: null },
  ];

  return (
    <Box sx={{ display: "grid", gap: "var(--spacing-4)" }}>
      <Box>
        <Typography component="h1" sx={{ m: 0, fontSize: { xs: 22, sm: "var(--font-size-display)" }, fontWeight: "var(--font-weight-brand)", lineHeight: "var(--line-height-tight)" }}>
          {video.title}
        </Typography>
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-2)", mt: "var(--spacing-2)", color: "var(--color-text-muted)" }}>
          <Chip size="small" icon={<PlayIcon />} label={`${video.views} 播放`} />
          <Chip size="small" label={video.date} />
          <Chip size="small" label={categories.find((item) => item.id === video.category)?.label ?? video.category} />
          <Chip size="small" label={video.sourceType === "repost" ? "转载" : "原创"} />
        </Box>
      </Box>

      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)" }}>
        {actionItems.map((item) => (
          <Button key={item.label} variant={item.active ? "contained" : "outlined"} startIcon={item.icon} onClick={item.onClick}>
            {item.label}{item.count === null ? "" : ` ${item.count}`}
          </Button>
        ))}
        <Button variant="outlined" startIcon={<MoreIcon />} onClick={() => actions.showToast("分享菜单已模拟打开", "info")}>分享</Button>
      </Box>

      <Box sx={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
        {video.tags.map((tag) => <Chip key={tag} label={tag} variant="outlined" />)}
        <Chip label="+" />
      </Box>

      <Typography sx={{ color: "var(--color-text-muted)", maxWidth: "72ch" }}>{video.description}</Typography>

      <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "var(--spacing-3)", flexWrap: "wrap" }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: "var(--spacing-3)" }}>
            <Box aria-hidden="true" sx={{ width: 48, height: 48, borderRadius: "var(--radius-round)", bgcolor: "var(--color-brand-soft)", filter: toneFilter[creator.tone] }} />
            <Box>
              <Typography sx={{ fontWeight: "var(--font-weight-brand)" }}>{creator.name} <Typography component="span" sx={{ color: "var(--color-text-muted)" }}>{creator.handle}</Typography></Typography>
              <Typography sx={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>{creator.followers} 粉丝 · {creator.videos} 视频</Typography>
            </Box>
          </Box>
          <Button variant={appState.followedCreatorIds.includes(creator.id) ? "contained" : "outlined"} onClick={() => actions.toggleFollow(creator)}>
            {appState.followedCreatorIds.includes(creator.id) ? "已关注" : "+ 关注"}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

function CommentPanel({ video, appState, actions }: { video: VideoItem; appState: AppState; actions: AppActions }) {
  const [body, setBody] = useState("");
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("score");
  const items = appState.comments
    .filter((comment) => comment.videoId === video.id)
    .filter((comment) => !query || comment.body.includes(query) || comment.author.includes(query))
    .sort((a, b) => sort === "date" ? b.date.localeCompare(a.date) : b.score - a.score);

  return (
    <Box sx={{ display: "grid", gap: "var(--spacing-4)", minWidth: 0 }}>
      <Paper component="form" elevation={0} sx={{ width: "100%", minWidth: 0, boxSizing: "border-box", p: "var(--spacing-3)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }} onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (body.trim().length < 4) {
          actions.showToast("评论至少 4 个字符", "error");
          return;
        }
        actions.addComment(video.id, body);
        setBody("");
      }}>
        <TextField label="写一条评论" value={body} onChange={(event) => setBody(event.target.value)} multiline minRows={3} fullWidth helperText={`${body.length}/240`} />
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "var(--spacing-2)", mt: "var(--spacing-2)", flexWrap: "wrap", minWidth: 0 }}>
          <Box sx={{ display: "flex", gap: "var(--spacing-1)", flexWrap: "wrap", minWidth: 0 }}>
            {["B", "I", "U", "@", "⌘", "图"].map((tool) => <Button key={tool} size="small" variant="text">{tool}</Button>)}
          </Box>
          <Button type="submit" variant="contained" startIcon={<CommentIcon />}>发送</Button>
        </Box>
      </Paper>

      <Box sx={{ display: "flex", gap: "var(--spacing-2)", flexWrap: "wrap", alignItems: "center", minWidth: 0 }}>
        <Button variant={sort === "score" ? "contained" : "outlined"} onClick={() => setSort("score")}>评分</Button>
        <Button variant={sort === "date" ? "contained" : "outlined"} onClick={() => setSort("date")}>发送日期</Button>
        <TextField label="搜索评论" size="small" value={query} onChange={(event) => setQuery(event.target.value)} sx={{ flex: "1 1 180px", minWidth: 0 }} />
        <Chip color="primary" label="1" />
      </Box>

      <List aria-label="评论列表" sx={{ p: 0, minWidth: 0 }}>
        {items.length ? items.map((comment) => (
          <ListItem key={comment.id} divider secondaryAction={<IconButton aria-label="更多评论操作" onClick={() => actions.showToast("评论更多操作已模拟", "info")}><MoreIcon /></IconButton>}>
            <ListItemText
              primary={<Typography component="span" sx={{ fontWeight: "var(--font-weight-brand)" }}>{comment.author} <Typography component="span" sx={{ color: "var(--color-text-muted)" }}>{comment.handle}</Typography></Typography>}
              secondary={`${comment.body} · ${comment.score} 分 · ${comment.date}`}
            />
            <Button size="small" onClick={() => actions.deleteComment(comment.id)}>删除</Button>
          </ListItem>
        )) : <ListItem><ListItemText primary="暂无评论" secondary="发一条 mock 评论验证状态。" /></ListItem>}
      </List>
    </Box>
  );
}

function DanmakuPanel({ video, appState, actions, compact = false }: { video: VideoItem; appState: AppState; actions: AppActions; compact?: boolean }) {
  const [body, setBody] = useState("");
  const [sort, setSort] = useState<"time" | "date">("time");
  const items = appState.danmakus
    .filter((item) => item.videoId === video.id)
    .sort((a, b) => sort === "time" ? a.timeSeconds - b.timeSeconds : b.date.localeCompare(a.date));

  return (
    <Paper elevation={0} sx={{ display: "grid", gridTemplateRows: compact ? "auto auto" : "1fr auto", minHeight: compact ? "auto" : 420, borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", overflow: "hidden" }}>
      <Table size="small" aria-label="弹幕列表">
        <TableHead>
          <TableRow>
            <TableCell onClick={() => setSort("time")} sx={{ cursor: "pointer", fontWeight: "var(--font-weight-brand)" }}>时间</TableCell>
            <TableCell sx={{ fontWeight: "var(--font-weight-brand)" }}>内容</TableCell>
            <TableCell onClick={() => setSort("date")} sx={{ cursor: "pointer", fontWeight: "var(--font-weight-brand)" }}>发送日期</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length ? items.map((item) => (
            <TableRow key={item.id} hover>
              <TableCell>{item.time}</TableCell>
              <TableCell>{item.body}</TableCell>
              <TableCell>{item.date}</TableCell>
            </TableRow>
          )) : (
            <TableRow><TableCell colSpan={3}>暂无弹幕</TableCell></TableRow>
          )}
        </TableBody>
      </Table>
      <Box component="form" onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (body.trim().length < 2) {
          actions.showToast("弹幕至少 2 个字符", "error");
          return;
        }
        actions.addDanmaku(video, body);
        setBody("");
      }} sx={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "var(--spacing-1)", alignItems: "center", p: "var(--spacing-2)", borderTop: "1px solid var(--color-border-subtle)", bgcolor: "#fff" }}>
        <TextField size="small" label="发送弹幕" value={body} onChange={(event) => setBody(event.target.value)} />
        <Tooltip title="颜文字"><IconButton aria-label="颜文字"><CommentIcon fontSize="small" /></IconButton></Tooltip>
        <Tooltip title="文字样式"><IconButton aria-label="文字样式"><DanmakuIcon fontSize="small" /></IconButton></Tooltip>
        <IconButton color="primary" type="submit" aria-label="发送弹幕"><PlayIcon fontSize="small" /></IconButton>
      </Box>
    </Paper>
  );
}

function VideoDetailPage({ appState, actions }: { appState: AppState; actions: AppActions }) {
  const { id } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const video = videos.find((item) => item.id === id);
  const activeTab = searchParams.get("tab") ?? "info";

  if (!video) {
    return <PageFrame><ContentContainer><StateBlock state="error" title="视频不存在" body="当前 mock 数据没有匹配的视频。" /></ContentContainer></PageFrame>;
  }

  const setActiveTab = (value: string) => setSearchParams(value === "info" ? {} : { tab: value });

  return (
    <PageFrame>
      <Box sx={{ position: { xs: "sticky", sm: "static" }, top: { xs: "var(--size-nav-mobile)", sm: "auto" }, zIndex: { xs: 2, sm: "auto" }, pl: { sm: "var(--container-padding-tablet)", lg: "var(--container-padding-desktop)" }, pr: { sm: "var(--container-padding-tablet)", lg: "var(--container-padding-desktop)" }, pt: { sm: "var(--spacing-6)" }, bgcolor: "var(--color-surface-page)" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "minmax(0, 1fr) var(--layout-player-side)" }, gap: { xs: 0, lg: "var(--spacing-4)" }, alignItems: "stretch" }}>
          <DistilledPlayer video={video} appState={appState} actions={actions} />
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <DanmakuPanel video={video} appState={appState} actions={actions} />
          </Box>
        </Box>
      </Box>

      <ContentContainer>
        <Tabs value={activeTab} onChange={(_, value: string) => setActiveTab(value)} aria-label="视频详情页签" sx={{ mt: { xs: 0, sm: "var(--spacing-4)" }, borderBottom: "1px solid var(--color-border-subtle)", "& .MuiTabs-indicator": { bgcolor: "var(--color-brand-primary)" } }}>
          <Tab value="info" label="信息" />
          <Tab value="comments" label="评论" />
          <Tab value="danmaku" label="弹幕" />
        </Tabs>
        <Box sx={{ py: "var(--spacing-4)" }}>
          {activeTab === "info" ? <InfoPanel video={video} appState={appState} actions={actions} /> : null}
          {activeTab === "comments" ? <CommentPanel video={video} appState={appState} actions={actions} /> : null}
          {activeTab === "danmaku" ? <DanmakuPanel video={video} appState={appState} actions={actions} compact /> : null}
        </Box>
      </ContentContainer>

      {activeTab === "danmaku" ? (
        <Box sx={{ position: "fixed", right: 0, bottom: "var(--size-nav-mobile)", left: 0, zIndex: (theme) => theme.zIndex.appBar - 1, display: { xs: "block", sm: "none" }, px: "var(--spacing-2)", pb: "var(--spacing-2)" }}>
          <DanmakuPanel video={video} appState={appState} actions={actions} compact />
        </Box>
      ) : null}
    </PageFrame>
  );
}

function filterVideos(query: string, category: string, sort: string) {
  const normalized = query.trim().toLowerCase();
  const items = videos.filter((video) => {
    const creator = getCreator(video.creatorId);
    const matchesCategory = category === "all" || video.category === category;
    const matchesQuery = !normalized || video.title.toLowerCase().includes(normalized) || creator.name.toLowerCase().includes(normalized) || video.tags.some((tag) => tag.toLowerCase().includes(normalized));
    return matchesCategory && matchesQuery;
  });
  if (sort === "popular") return [...items].sort((a, b) => b.likes - a.likes);
  if (sort === "favorites") return [...items].sort((a, b) => b.favorites - a.favorites);
  return [...items].sort((a, b) => b.date.localeCompare(a.date));
}

function HomePage({ appState, actions }: { appState: AppState; actions: AppActions }) {
  const [state, setState] = useState<ViewState>("ready");
  return (
    <PageFrame>
      <ContentContainer>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <BrandMark />
          <Alert severity="info" sx={{ bgcolor: "var(--color-surface-card)" }}>Demo6 先蒸馏播放器详情页，再用 mock 实现完整短视频社区。</Alert>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-2)" }}>
            {(["ready", "loading", "empty", "error"] as ViewState[]).map((next) => <Button key={next} variant={state === next ? "contained" : "outlined"} onClick={() => setState(next)}>{next}</Button>)}
          </Box>
          <VideoGrid items={state === "ready" ? videos : []} state={state} appState={appState} actions={actions} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function ExplorePage({ appState, actions }: { appState: AppState; actions: AppActions }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const items = useMemo(() => filterVideos(query, category, sort), [query, category, sort]);
  return (
    <PageFrame>
      <ContentContainer>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>探索</Typography>
          <Paper elevation={0} sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 180px 180px" }, gap: "var(--spacing-3)", p: "var(--spacing-3)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)" }}>
            <TextField label="搜索视频、创作者或标签" value={query} onChange={(event) => setQuery(event.target.value)} />
            <FormControl>
              <InputLabel id="category-label">分类</InputLabel>
              <Select labelId="category-label" label="分类" value={category} onChange={(event: SelectChangeEvent) => setCategory(event.target.value)}>
                {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="sort-label">排序</InputLabel>
              <Select labelId="sort-label" label="排序" value={sort} onChange={(event: SelectChangeEvent) => setSort(event.target.value)}>
                <MenuItem value="latest">最新</MenuItem>
                <MenuItem value="popular">点赞最多</MenuItem>
                <MenuItem value="favorites">收藏最多</MenuItem>
              </Select>
            </FormControl>
          </Paper>
          {items.length ? (
            <VideoGrid items={items} state="ready" appState={appState} actions={actions} />
          ) : (
            <StateBlock state="empty" title="没有匹配结果" body="调整关键词、分类或排序条件后再试。" />
          )}
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function UploadPage({ actions }: { actions: AppActions }) {
  const [draft, setDraft] = useState<UploadDraft>(draftUpload);
  const [errors, setErrors] = useState<UploadErrors>({});
  const [open, setOpen] = useState(false);
  const updateDraft = (key: keyof UploadDraft, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const validate = () => {
    const next: UploadErrors = {};
    if (draft.title.trim().length < 6) next.title = "标题至少 6 个字符";
    if (draft.description.trim().length < 12) next.description = "简介至少 12 个字符";
    setErrors(next);
    return Object.keys(next).length === 0;
  };
  return (
    <PageFrame>
      <ContentContainer>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ mb: "var(--spacing-4)", fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>投稿</Typography>
          <Paper component="form" noValidate elevation={0} sx={{ display: "grid", gap: "var(--spacing-3)", p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)" }} onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            if (!validate()) {
              actions.showToast("请先修正投稿表单", "error");
              return;
            }
            setOpen(true);
          }}>
            <TextField label="视频标题" value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} error={Boolean(errors.title)} helperText={errors.title ?? "中性 mock 标题，不使用真实视频标题。"} required />
            <FormControl>
              <InputLabel id="upload-category-label">分类</InputLabel>
              <Select labelId="upload-category-label" label="分类" value={draft.category} onChange={(event: SelectChangeEvent) => updateDraft("category", event.target.value)}>
                {categories.filter((item) => item.id !== "all").map((item) => <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl>
              <InputLabel id="source-type-label">来源</InputLabel>
              <Select labelId="source-type-label" label="来源" value={draft.sourceType} onChange={(event: SelectChangeEvent) => updateDraft("sourceType", event.target.value)}>
                <MenuItem value="original">原创</MenuItem>
                <MenuItem value="repost">转载</MenuItem>
              </Select>
            </FormControl>
            <TextField label="简介" value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} error={Boolean(errors.description)} helperText={errors.description ?? "说明内容、标签和可替换素材来源。"} multiline minRows={4} required />
            <TextField label="标签" value={draft.tags} onChange={(event) => updateDraft("tags", event.target.value)} helperText="用逗号分隔，例如：播放器, 弹幕, 社区" />
            <Button type="submit" variant="contained" startIcon={<UploadIcon />}>提交投稿</Button>
          </Paper>
        </Box>
        <Dialog open={open} onClose={() => setOpen(false)}>
          <DialogTitle>投稿已模拟提交</DialogTitle>
          <DialogContent><Typography>没有真实上传，已验证表单校验、确认弹层和成功 toast。</Typography></DialogContent>
          <DialogActions>
            <Button onClick={() => setOpen(false)}>继续编辑</Button>
            <Button variant="contained" onClick={() => { setOpen(false); setDraft(draftUpload); actions.showToast("投稿成功", "success"); }}>完成</Button>
          </DialogActions>
        </Dialog>
      </ContentContainer>
    </PageFrame>
  );
}

function NotificationPage({ appState, actions }: { appState: AppState; actions: AppActions }) {
  const unread = appState.notifications.filter((item) => !item.read).length;
  return (
    <PageFrame>
      <ContentContainer>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: "var(--spacing-4)", gap: "var(--spacing-2)", flexWrap: "wrap" }}>
            <Typography component="h1" sx={{ fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>通知</Typography>
            <Button variant="outlined" disabled={!unread} onClick={actions.markAllNotificationsRead}>全部已读</Button>
          </Box>
          <Paper elevation={0} sx={{ borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", overflow: "hidden" }}>
            <List disablePadding>
              {appState.notifications.map((item) => (
                <ListItemButton key={item.id} divider selected={!item.read} onClick={() => actions.markNotificationRead(item.id)}>
                  <ListItemText primary={<Box sx={{ display: "flex", gap: "var(--spacing-2)", alignItems: "center" }}><span>{item.title}</span>{!item.read ? <Chip label="未读" color="primary" size="small" /> : null}</Box>} secondary={`${item.body} · ${item.date}`} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function ProfilePage({ appState, actions, mine = false }: { appState: AppState; actions: AppActions; mine?: boolean }) {
  const params = useParams();
  const creator = mine ? creators[0] : creators.find((item) => item.id === params.creatorId) ?? creators[0];
  const items = videos.filter((video) => video.creatorId === creator.id);
  return (
    <PageFrame>
      <ContentContainer>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Paper elevation={0} sx={{ p: "var(--spacing-5)", mb: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)" }}>
            <Typography component="h1" sx={{ fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>{mine ? profile.name : creator.name}</Typography>
            <Typography sx={{ color: "var(--color-text-muted)" }}>{mine ? profile.handle : creator.handle}</Typography>
            <Typography sx={{ mt: "var(--spacing-2)" }}>{mine ? profile.bio : creator.bio}</Typography>
            <Box sx={{ display: "flex", gap: "var(--spacing-2)", mt: "var(--spacing-3)", flexWrap: "wrap" }}>
              <Chip label={`${creator.followers} 粉丝`} />
              <Chip label={`${creator.videos} 视频`} />
              <Button variant={appState.followedCreatorIds.includes(creator.id) ? "contained" : "outlined"} onClick={() => actions.toggleFollow(creator)}>{appState.followedCreatorIds.includes(creator.id) ? "已关注" : "关注"}</Button>
            </Box>
          </Paper>
          <VideoGrid items={items} state={items.length ? "ready" : "empty"} appState={appState} actions={actions} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function LibraryPage({ kind, appState, actions }: { kind: "history" | "collections"; appState: AppState; actions: AppActions }) {
  const ids = kind === "history" ? appState.watchLaterVideoIds : appState.favoriteVideoIds;
  const items = videos.filter((video) => ids.includes(video.id));
  return (
    <PageFrame>
      <ContentContainer>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ mb: "var(--spacing-4)", fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>{kind === "history" ? "历史 / 稍后观看" : "收藏"}</Typography>
          <VideoGrid items={items} state={items.length ? "ready" : "empty"} appState={appState} actions={actions} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function Toast({ toast, onClose }: { toast: ToastState | null; onClose: () => void }) {
  return (
    <Snackbar open={Boolean(toast)} autoHideDuration={2600} onClose={onClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert severity={toast?.severity ?? "success"} variant="filled" onClose={onClose}>{toast?.message}</Alert>
    </Snackbar>
  );
}

function AppRoutes() {
  const [appState, setAppState] = useState<AppState>({
    likedVideoIds: ["video-03"],
    dislikedVideoIds: [],
    favoriteVideoIds: ["video-01"],
    watchLaterVideoIds: ["video-05"],
    followedCreatorIds: ["creator-02"],
    comments: initialComments,
    danmakus: initialDanmakus,
    notifications: initialNotifications,
    player: initialPlayerState,
    toast: null,
  });

  const actions: AppActions = {
    showToast: (message, severity = "success") => setAppState((current) => ({ ...current, toast: { message, severity } })),
    closeToast: () => setAppState((current) => ({ ...current, toast: null })),
    updatePlayer: (patch) => setAppState((current) => ({ ...current, player: { ...current.player, ...patch }, toast: patch.fullscreen !== undefined ? { message: "全屏状态已模拟切换", severity: "info" } : current.toast })),
    toggleLike: (video) => setAppState((current) => ({ ...current, likedVideoIds: current.likedVideoIds.includes(video.id) ? current.likedVideoIds.filter((id) => id !== video.id) : [...current.likedVideoIds, video.id], dislikedVideoIds: current.dislikedVideoIds.filter((id) => id !== video.id), toast: { message: `喜欢状态已更新：${video.title}`, severity: "success" } })),
    toggleDislike: (video) => setAppState((current) => ({ ...current, dislikedVideoIds: current.dislikedVideoIds.includes(video.id) ? current.dislikedVideoIds.filter((id) => id !== video.id) : [...current.dislikedVideoIds, video.id], likedVideoIds: current.likedVideoIds.filter((id) => id !== video.id), toast: { message: "不喜欢状态已更新", severity: "info" } })),
    toggleFavorite: (video) => setAppState((current) => ({ ...current, favoriteVideoIds: current.favoriteVideoIds.includes(video.id) ? current.favoriteVideoIds.filter((id) => id !== video.id) : [...current.favoriteVideoIds, video.id], toast: { message: "收藏状态已更新", severity: "success" } })),
    toggleWatchLater: (video) => setAppState((current) => ({ ...current, watchLaterVideoIds: current.watchLaterVideoIds.includes(video.id) ? current.watchLaterVideoIds.filter((id) => id !== video.id) : [...current.watchLaterVideoIds, video.id], toast: { message: "稍后观看已更新", severity: "success" } })),
    toggleFollow: (creator) => setAppState((current) => ({ ...current, followedCreatorIds: current.followedCreatorIds.includes(creator.id) ? current.followedCreatorIds.filter((id) => id !== creator.id) : [...current.followedCreatorIds, creator.id], toast: { message: `关注状态已更新：${creator.name}`, severity: "success" } })),
    addComment: (videoId, body) => setAppState((current) => ({ ...current, comments: [{ id: `comment-${Date.now()}`, videoId, author: profile.name, handle: profile.handle, body: body.trim(), date: "刚刚", score: 0 }, ...current.comments], toast: { message: "评论已发送", severity: "success" } })),
    deleteComment: (commentId) => setAppState((current) => ({ ...current, comments: current.comments.filter((comment) => comment.id !== commentId), toast: { message: "评论已删除", severity: "info" } })),
    addDanmaku: (video, body) => setAppState((current) => ({ ...current, danmakus: [...current.danmakus, { id: `danmaku-${Date.now()}`, videoId: video.id, time: formatSeconds(Math.round((current.player.progress / 100) * video.durationSeconds)), timeSeconds: Math.round((current.player.progress / 100) * video.durationSeconds), body: body.trim(), date: "刚刚" }], toast: { message: "弹幕已发送", severity: "success" } })),
    markNotificationRead: (notificationId) => setAppState((current) => ({ ...current, notifications: current.notifications.map((notification) => notification.id === notificationId ? { ...notification, read: true } : notification) })),
    markAllNotificationsRead: () => setAppState((current) => ({ ...current, notifications: current.notifications.map((notification) => ({ ...notification, read: true })), toast: { message: "通知已全部标记已读", severity: "success" } })),
  };

  const unreadCount = appState.notifications.filter((notification) => !notification.read).length;

  return (
    <>
      <Navigation unreadCount={unreadCount} />
      <Routes>
        <Route path="/" element={<HomePage appState={appState} actions={actions} />} />
        <Route path="/explore" element={<ExplorePage appState={appState} actions={actions} />} />
        <Route path="/video/:id" element={<VideoDetailPage appState={appState} actions={actions} />} />
        <Route path="/upload" element={<UploadPage actions={actions} />} />
        <Route path="/notifications" element={<NotificationPage appState={appState} actions={actions} />} />
        <Route path="/profile/:creatorId" element={<ProfilePage appState={appState} actions={actions} />} />
        <Route path="/me" element={<ProfilePage mine appState={appState} actions={actions} />} />
        <Route path="/history" element={<LibraryPage kind="history" appState={appState} actions={actions} />} />
        <Route path="/collections" element={<LibraryPage kind="collections" appState={appState} actions={actions} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast toast={appState.toast} onClose={actions.closeToast} />
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
