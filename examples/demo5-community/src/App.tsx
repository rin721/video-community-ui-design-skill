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
  Divider,
  Drawer,
  FormControl,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Skeleton,
  Snackbar,
  SvgIcon,
  Tab,
  Tabs,
  TextField,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { useMemo, useState, type ElementType, type FormEvent, type ReactNode } from "react";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import {
  categories,
  comments as initialComments,
  creators,
  draftUpload,
  notifications as initialNotifications,
  profile,
  videos,
} from "./data/mock";
import type {
  CommentItem,
  CreatorProfile,
  NotificationItem,
  UploadDraft,
  VideoItem,
  VideoTone,
  ViewState,
} from "./data/mock";

export type { ViewState } from "./data/mock";

type ToastState = {
  message: string;
  severity: "success" | "info" | "error";
};

type UploadErrors = Partial<Record<keyof UploadDraft, string>>;

type AppState = {
  likedVideoIds: string[];
  favoriteVideoIds: string[];
  followedCreatorIds: string[];
  comments: CommentItem[];
  notifications: NotificationItem[];
  toast: ToastState | null;
};

type AppActions = {
  toggleLike: (video: VideoItem) => void;
  toggleFavorite: (video: VideoItem) => void;
  toggleFollow: (creator: CreatorProfile) => void;
  addComment: (videoId: string, body: string) => void;
  deleteComment: (commentId: string) => void;
  markNotificationRead: (notificationId: string) => void;
  markAllNotificationsRead: () => void;
  showToast: (message: string, severity?: ToastState["severity"]) => void;
  closeToast: () => void;
};

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4v-9.5Z" />
    </SvgIcon>
  );
}

function ExploreIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M10.5 4a6.5 6.5 0 0 1 5.16 10.45l4.45 4.44-1.42 1.42-4.44-4.45A6.5 6.5 0 1 1 10.5 4Zm0 2a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9Z" />
    </SvgIcon>
  );
}

function UploadIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M11 17h2V8.8l3.1 3.1 1.4-1.4L12 5l-5.5 5.5 1.4 1.4L11 8.8V17ZM5 19h14v2H5v-2Z" />
    </SvgIcon>
  );
}

function BellIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 22a2.6 2.6 0 0 0 2.45-1.75h-4.9A2.6 2.6 0 0 0 12 22Zm7-5-1.6-1.6V11a5.42 5.42 0 0 0-4.15-5.35V4a1.25 1.25 0 0 0-2.5 0v1.65A5.42 5.42 0 0 0 6.6 11v4.4L5 17v1h14v-1Z" />
    </SvgIcon>
  );
}

function UserIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8a7 7 0 0 1 14 0H5Z" />
    </SvgIcon>
  );
}

function HeartIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 21s-7-4.35-9.5-8.8C.7 9 .9 5.5 3.55 3.7 6.1 1.98 9 3.2 12 6.2c3-3 5.9-4.22 8.45-2.5C23.1 5.5 23.3 9 21.5 12.2 19 16.65 12 21 12 21Z" />
    </SvgIcon>
  );
}

function BookmarkIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M6 4h12v16l-6-3.4L6 20V4Zm2 2v10.55l4-2.25 4 2.25V6H8Z" />
    </SvgIcon>
  );
}

function CommentIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M5 5h14v10H8.8L5 18.2V5Zm2 2v6.8l1.05-.8H17V7H7Z" />
    </SvgIcon>
  );
}

function MenuIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M5 7h14v2H5V7Zm0 4h14v2H5v-2Zm0 4h10v2H5v-2Z" />
    </SvgIcon>
  );
}

const navigationItems = [
  { label: "首页", path: "/", icon: HomeIcon },
  { label: "探索", path: "/explore", icon: ExploreIcon },
  { label: "投稿", path: "/upload", icon: UploadIcon },
  { label: "通知", path: "/notifications", icon: BellIcon },
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
  bgcolor: "transparent",
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

function getCreator(creatorId: string) {
  return creators.find((creator) => creator.id === creatorId) ?? creators[0];
}

function formatCount(value: number) {
  if (value >= 10000) return `${(value / 10000).toFixed(1)}w`;
  if (value >= 1000) return `${(value / 1000).toFixed(1)}k`;
  return String(value);
}

function BrandHeader({ compact = false }: { compact?: boolean }) {
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
          PINKCUT
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
          "radial-gradient(circle at 72% 20%, rgba(240,110,142,.11), transparent 12%), linear-gradient(180deg, rgba(255,246,249,.9), rgba(255,255,255,.74))",
        "&::before": {
          content: '""',
          position: "absolute",
          right: "12%",
          top: "-28px",
          width: "min(640px, 56vw)",
          height: "76px",
          borderRadius: "var(--radius-badge)",
          bgcolor: "rgba(240, 110, 142, .18)",
          transform: "rotate(-12deg)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: "11%",
          bottom: "20px",
          width: "120px",
          height: "72px",
          backgroundImage: "radial-gradient(circle, rgba(240,110,142,.36) 1.4px, transparent 1.6px)",
          backgroundSize: "14px 14px",
          opacity: ".8",
        },
      }}
    >
      <BrandHeader />
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
        <Toolbar
          disableGutters
          sx={{ minHeight: "var(--size-nav-mobile)", px: "var(--spacing-3)", justifyContent: "space-between" }}
        >
          <IconButton aria-label="打开导航菜单" sx={railButtonSx}>
            <MenuIcon fontSize="small" />
          </IconButton>
          <BrandHeader compact />
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
                      <Icon fontSize="small" />
                    </Badge>
                  ) : (
                    <Icon fontSize="small" />
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
          <Box
            sx={{
              width: "var(--spacing-4)",
              height: "var(--spacing-4)",
              bgcolor: "var(--color-brand-primary)",
              clipPath:
                "polygon(50% 0, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%)",
            }}
          />
          <Typography sx={{ fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            PINKCUT
          </Typography>
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
        {navigationItems.map((item) => {
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

function PageFrame({ children }: { children: ReactNode }) {
  return (
    <Box
      component="main"
      sx={{
        minHeight: "100vh",
        pl: { xs: 0, sm: "var(--size-nav-rail)" },
        pt: { xs: "var(--size-nav-mobile)", sm: 0 },
        pb: { xs: "calc(var(--size-nav-mobile) + var(--spacing-6))", sm: "var(--spacing-8)" },
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
        mx: "auto",
        px: {
          xs: "var(--container-padding-mobile)",
          sm: "var(--container-padding-tablet)",
          md: compact ? "var(--container-padding-desktop)" : 0,
        },
      }}
    >
      {children}
    </Box>
  );
}

function CategoryTabs({
  activeCategory,
  onCategoryChange,
}: {
  activeCategory: string;
  onCategoryChange: (value: string) => void;
}) {
  return (
    <Box sx={{ borderBottom: "1px solid var(--color-border-subtle)", mb: "var(--spacing-4)" }}>
      <Tabs
        value={activeCategory}
        onChange={(_, value: string) => onCategoryChange(value)}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="内容分类"
        sx={{
          minHeight: "var(--layout-category-height)",
          "& .MuiTabs-indicator": {
            height: "3px",
            borderRadius: "var(--radius-badge) var(--radius-badge) 0 0",
            bgcolor: "var(--color-brand-primary)",
          },
        }}
      >
        {categories.map((category) => (
          <Tab
            key={category.id}
            value={category.id}
            label={`${category.label} ${category.count}`}
            sx={{ minHeight: "var(--layout-category-height)" }}
          />
        ))}
      </Tabs>
    </Box>
  );
}

function Announcement() {
  return (
    <Paper
      elevation={0}
      sx={{
        my: "var(--spacing-4)",
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card-soft)",
        border: "1px solid rgba(240, 110, 142, .18)",
        overflow: "hidden",
      }}
    >
      <Alert
        severity="info"
        action={<Chip label="Mock" color="primary" variant="outlined" />}
        sx={{
          alignItems: "center",
          color: "var(--color-text-strong)",
          bgcolor: "var(--color-surface-card)",
          "& .MuiAlert-icon": { color: "var(--color-brand-primary)" },
        }}
      >
        <Typography component="strong" sx={{ display: "block", mb: ".25rem" }}>
          社区公告
        </Typography>
        Demo5 使用本地 mock 模拟短视频社区的浏览、互动、通知和投稿流程。
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
      className="demo5-cover"
      sx={{
        position: "relative",
        aspectRatio: "var(--grid-media-aspect)",
        minHeight: large ? { xs: "220px", md: "360px" } : undefined,
        overflow: "hidden",
        borderRadius: "var(--radius-card)",
        background:
          "radial-gradient(circle at 20% 72%, rgba(255,255,255,.7) 0 10%, transparent 11%), radial-gradient(circle at 73% 27%, rgba(255,255,255,.45) 0 13%, transparent 14%), linear-gradient(118deg, rgba(255,255,255,.52) 0 18%, transparent 19% 28%, rgba(255,255,255,.32) 29% 35%, transparent 36%), linear-gradient(135deg, rgb(252,199,209), rgb(239,164,198) 48%, rgb(181,216,230))",
        boxShadow: "inset 0 0 38px rgba(255,255,255,.55)",
        filter: toneFilter[video.tone],
        transformOrigin: "center",
        transition: "transform var(--motion-duration-fast) var(--motion-easing-standard)",
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
          bgcolor: "rgba(34, 32, 36, .62)",
          fontWeight: "var(--font-weight-semibold)",
          fontVariantNumeric: "tabular-nums",
        }}
      />
    </CardMedia>
  );
}

function VideoCard({
  video,
  liked,
  favorite,
  onLike,
  onFavorite,
}: {
  video: VideoItem;
  liked: boolean;
  favorite: boolean;
  onLike: (video: VideoItem) => void;
  onFavorite: (video: VideoItem) => void;
}) {
  const navigate = useNavigate();
  const creator = getCreator(video.creatorId);

  return (
    <Card
      elevation={0}
      sx={{
        bgcolor: "transparent",
        overflow: "visible",
        "&:hover .demo5-cover": { transform: "var(--motion-transform-media-hover)" },
        "&:hover .demo5-title": { color: "var(--color-brand-hover)" },
      }}
    >
      <CardActionArea
        onClick={() => navigate(`/video/${video.id}`)}
        aria-label={`打开视频：${video.title}`}
        sx={{
          borderRadius: "var(--radius-card)",
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: "3px",
          },
        }}
      >
        <VideoCover video={video} />
        <CardContent sx={{ px: "var(--spacing-1)", pt: "var(--spacing-2)", pb: 0 }}>
          <Typography
            className="demo5-title"
            component="h3"
            sx={{
              display: "-webkit-box",
              minHeight: "2.9em",
              m: 0,
              overflow: "hidden",
              color: "var(--color-text-strong)",
              fontSize: "var(--font-size-card-title)",
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: "var(--line-height-body)",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              transition: "color var(--motion-duration-fast) var(--motion-easing-standard)",
            }}
          >
            {video.title}
          </Typography>
          <Typography sx={{ mt: "var(--spacing-1)", color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>
            {creator.name}
          </Typography>
          <Typography sx={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>
            {video.views} 播放 · {video.date}
          </Typography>
        </CardContent>
      </CardActionArea>
      <Stack direction="row" gap="var(--spacing-1)" sx={{ mt: "var(--spacing-1)", px: "var(--spacing-1)" }}>
        <Tooltip title={liked ? "取消喜欢" : "喜欢"}>
          <IconButton
            aria-label={liked ? `取消喜欢 ${video.title}` : `喜欢 ${video.title}`}
            color={liked ? "primary" : "default"}
            onClick={() => onLike(video)}
            sx={railButtonSx}
          >
            <HeartIcon fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={favorite ? "取消收藏" : "收藏"}>
          <IconButton
            aria-label={favorite ? `取消收藏 ${video.title}` : `收藏 ${video.title}`}
            color={favorite ? "primary" : "default"}
            onClick={() => onFavorite(video)}
            sx={railButtonSx}
          >
            <BookmarkIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
    </Card>
  );
}

function StateBlock({ state, title, body }: { state: ViewState; title: string; body: string }) {
  const color = state === "error" ? "error" : state === "success" ? "success" : "info";
  return (
    <Paper
      role={state === "error" ? "alert" : "status"}
      elevation={0}
      sx={{
        position: "relative",
        overflow: "hidden",
        p: "var(--spacing-6)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-subtle)",
        bgcolor: "var(--color-surface-card)",
        boxShadow: "var(--shadow-card-soft)",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          right: "var(--spacing-4)",
          top: "var(--spacing-4)",
          width: "72px",
          height: "72px",
          bgcolor: "var(--color-brand-soft)",
          clipPath:
            "polygon(50% 0, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%)",
          opacity: ".8",
        }}
      />
      <Chip color={color} label={state} sx={{ mb: "var(--spacing-3)" }} />
      <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
        {title}
      </Typography>
      <Typography sx={{ mt: "var(--spacing-2)", maxWidth: "56ch", color: "var(--color-text-muted)" }}>{body}</Typography>
    </Paper>
  );
}

function VideoGrid({
  items,
  state,
  likedVideoIds,
  favoriteVideoIds,
  actions,
}: {
  items: VideoItem[];
  state: ViewState;
  likedVideoIds: string[];
  favoriteVideoIds: string[];
  actions: AppActions;
}) {
  if (state === "loading") {
    return (
      <Box sx={{ display: "grid", gridTemplateColumns: { xs: "repeat(2, minmax(0, 1fr))", sm: "repeat(auto-fit, minmax(var(--grid-feed-min), 1fr))" }, gap: { xs: "14px", sm: "var(--grid-feed-gap)" } }}>
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={168} sx={{ borderRadius: "var(--radius-card)" }} />
        ))}
      </Box>
    );
  }

  if (state === "error") {
    return <StateBlock state="error" title="内容加载失败" body="这是本地错误状态模拟，可点击恢复按钮返回内容流。" />;
  }

  if (state === "empty" || items.length === 0) {
    return <StateBlock state="empty" title="没有找到内容" body="换一个分类、关键词或排序方式再试试。" />;
  }

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "repeat(2, minmax(0, 1fr))",
          sm: "repeat(auto-fit, minmax(var(--grid-feed-min), 1fr))",
        },
        gap: { xs: "14px", sm: "var(--grid-feed-gap)" },
        "@media (max-width: 359px)": { gridTemplateColumns: "1fr" },
      }}
    >
      {items.map((video) => (
        <VideoCard
          key={video.id}
          video={video}
          liked={likedVideoIds.includes(video.id)}
          favorite={favoriteVideoIds.includes(video.id)}
          onLike={actions.toggleLike}
          onFavorite={actions.toggleFavorite}
        />
      ))}
    </Box>
  );
}

function SearchFilterBar({
  query,
  activeCategory,
  sort,
  onQueryChange,
  onCategoryChange,
  onSortChange,
}: {
  query: string;
  activeCategory: string;
  sort: string;
  onQueryChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  onSortChange: (value: string) => void;
}) {
  return (
    <Paper
      elevation={0}
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "1fr 220px" },
        gap: "var(--spacing-3)",
        p: "var(--spacing-3)",
        mb: "var(--spacing-4)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-subtle)",
        bgcolor: "var(--color-surface-card)",
        boxShadow: "var(--shadow-card-soft)",
      }}
    >
      <TextField
        label="搜索视频、创作者或标签"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        fullWidth
      />
      <FormControl fullWidth>
        <InputLabel id="sort-label">排序</InputLabel>
        <Select labelId="sort-label" label="排序" value={sort} onChange={(event: SelectChangeEvent) => onSortChange(event.target.value)}>
          <MenuItem value="latest">最新发布</MenuItem>
          <MenuItem value="popular">最多喜欢</MenuItem>
          <MenuItem value="favorites">最多收藏</MenuItem>
        </Select>
      </FormControl>
      <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)" sx={{ gridColumn: { xs: "auto", md: "1 / -1" } }}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            label={category.label}
            color={activeCategory === category.id ? "primary" : "default"}
            variant={activeCategory === category.id ? "filled" : "outlined"}
            onClick={() => onCategoryChange(category.id)}
          />
        ))}
      </Stack>
    </Paper>
  );
}

function sortVideos(items: VideoItem[], sort: string) {
  const nextItems = [...items];
  if (sort === "popular") return nextItems.sort((a, b) => b.likes - a.likes);
  if (sort === "favorites") return nextItems.sort((a, b) => b.favorites - a.favorites);
  return nextItems.sort((a, b) => b.date.localeCompare(a.date));
}

function filterVideos(query: string, activeCategory: string, sort: string) {
  const normalized = query.trim().toLowerCase();
  const filtered = videos.filter((video) => {
    const creator = getCreator(video.creatorId);
    const matchesCategory = activeCategory === "all" || video.category === activeCategory;
    const matchesQuery =
      !normalized ||
      video.title.toLowerCase().includes(normalized) ||
      creator.name.toLowerCase().includes(normalized) ||
      video.tags.some((tag) => tag.toLowerCase().includes(normalized));
    return matchesCategory && matchesQuery;
  });
  return sortVideos(filtered, sort);
}

function HomePage({ state, setState, appState, actions }: { state: ViewState; setState: (state: ViewState) => void; appState: AppState; actions: AppActions }) {
  const [activeCategory, setActiveCategory] = useState("all");
  const featuredItems = useMemo(() => filterVideos("", activeCategory, "latest"), [activeCategory]);

  return (
    <PageFrame>
      <DecorativeMasthead />
      <ContentContainer>
        <CategoryTabs activeCategory={activeCategory} onCategoryChange={setActiveCategory} />
        <Announcement />
        <Paper
          elevation={0}
          aria-label="状态预览控制"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "var(--spacing-2)",
            mb: "var(--spacing-4)",
            p: "var(--spacing-3)",
            borderRadius: "var(--radius-card)",
            border: "1px solid var(--color-border-subtle)",
            bgcolor: "var(--color-surface-card)",
          }}
        >
          {(["ready", "loading", "empty", "error"] as ViewState[]).map((nextState) => (
            <Button key={nextState} variant={state === nextState ? "contained" : "outlined"} onClick={() => setState(nextState)}>
              {nextState}
            </Button>
          ))}
        </Paper>

        <Stack direction="row" alignItems="center" justifyContent="space-between" gap="var(--spacing-3)" sx={{ mb: "var(--spacing-3)" }}>
          <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            最新内容
          </Typography>
          <Chip label={`${featuredItems.length} 条`} color="primary" variant="outlined" />
        </Stack>
        <VideoGrid
          items={featuredItems}
          state={state}
          likedVideoIds={appState.likedVideoIds}
          favoriteVideoIds={appState.favoriteVideoIds}
          actions={actions}
        />
      </ContentContainer>
    </PageFrame>
  );
}

function ExplorePage({ appState, actions }: { appState: AppState; actions: AppActions }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sort, setSort] = useState("latest");
  const items = useMemo(() => filterVideos(query, activeCategory, sort), [query, activeCategory, sort]);

  return (
    <PageFrame>
      <ContentContainer compact>
        <Typography component="h1" sx={{ pt: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" }, mb: "var(--spacing-2)", fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
          探索社区
        </Typography>
        <Typography sx={{ mb: "var(--spacing-4)", color: "var(--color-text-muted)" }}>
          用本地 mock 搜索、筛选和排序短视频内容。
        </Typography>
        <SearchFilterBar
          query={query}
          activeCategory={activeCategory}
          sort={sort}
          onQueryChange={setQuery}
          onCategoryChange={setActiveCategory}
          onSortChange={setSort}
        />
        <VideoGrid
          items={items}
          state={items.length ? "ready" : "empty"}
          likedVideoIds={appState.likedVideoIds}
          favoriteVideoIds={appState.favoriteVideoIds}
          actions={actions}
        />
      </ContentContainer>
    </PageFrame>
  );
}

function VideoDetailPage({ appState, actions }: { appState: AppState; actions: AppActions }) {
  const { id } = useParams();
  const video = videos.find((item) => item.id === id);

  if (!video) {
    return (
      <PageFrame>
        <ContentContainer compact>
          <StateBlock state="error" title="视频不存在" body="当前路由没有匹配到 mock 视频，可从首页重新选择内容。" />
        </ContentContainer>
      </PageFrame>
    );
  }

  const creator = getCreator(video.creatorId);
  const related = videos.filter((item) => item.category === video.category && item.id !== video.id).slice(0, 4);
  const liked = appState.likedVideoIds.includes(video.id);
  const favorite = appState.favoriteVideoIds.includes(video.id);

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ pt: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <VideoCover video={video} large />
          <Stack direction={{ xs: "column", md: "row" }} justifyContent="space-between" gap="var(--spacing-4)" sx={{ mt: "var(--spacing-4)" }}>
            <Box sx={{ minWidth: 0 }}>
              <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
                {video.title}
              </Typography>
              <Typography sx={{ mt: "var(--spacing-2)", color: "var(--color-text-muted)" }}>
                {video.views} 播放 · {formatCount(video.likes + (liked ? 1 : 0))} 喜欢 · {video.date}
              </Typography>
              <Stack direction="row" flexWrap="wrap" gap="var(--spacing-1)" sx={{ mt: "var(--spacing-2)" }}>
                {video.tags.map((tag) => (
                  <Chip key={tag} label={`#${tag}`} size="small" variant="outlined" />
                ))}
              </Stack>
            </Box>
            <Stack direction="row" gap="var(--spacing-2)" flexWrap="wrap">
              <Button variant={liked ? "contained" : "outlined"} startIcon={<HeartIcon />} onClick={() => actions.toggleLike(video)}>
                {liked ? "已喜欢" : "喜欢"}
              </Button>
              <Button variant={favorite ? "contained" : "outlined"} startIcon={<BookmarkIcon />} onClick={() => actions.toggleFavorite(video)}>
                {favorite ? "已收藏" : "收藏"}
              </Button>
            </Stack>
          </Stack>

          <Paper elevation={0} sx={{ mt: "var(--spacing-4)", p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
            <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap="var(--spacing-3)">
              <Box>
                <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-title)", fontWeight: "var(--font-weight-brand)" }}>
                  {creator.name}
                </Typography>
                <Typography sx={{ color: "var(--color-text-muted)" }}>{creator.handle} · {creator.followers} 关注者</Typography>
                <Typography sx={{ mt: "var(--spacing-2)", maxWidth: "62ch" }}>{creator.bio}</Typography>
              </Box>
              <Button variant={appState.followedCreatorIds.includes(creator.id) ? "contained" : "outlined"} onClick={() => actions.toggleFollow(creator)}>
                {appState.followedCreatorIds.includes(creator.id) ? "已关注" : "关注"}
              </Button>
            </Stack>
          </Paper>

          <CommentThread video={video} comments={appState.comments.filter((comment) => comment.videoId === video.id)} actions={actions} />

          {related.length ? (
            <Box sx={{ mt: "var(--spacing-6)" }}>
              <Typography component="h2" sx={{ mb: "var(--spacing-3)", fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
                相关内容
              </Typography>
              <VideoGrid
                items={related}
                state="ready"
                likedVideoIds={appState.likedVideoIds}
                favoriteVideoIds={appState.favoriteVideoIds}
                actions={actions}
              />
            </Box>
          ) : null}
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}

function CommentThread({ video, comments, actions }: { video: VideoItem; comments: CommentItem[]; actions: AppActions }) {
  const [body, setBody] = useState("");
  const invalid = body.trim().length > 0 && body.trim().length < 4;

  return (
    <Paper elevation={0} sx={{ mt: "var(--spacing-4)", p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
      <Stack direction="row" alignItems="center" gap="var(--spacing-2)" sx={{ mb: "var(--spacing-3)" }}>
        <CommentIcon color="primary" />
        <Typography component="h2" sx={{ fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
          评论 {comments.length}
        </Typography>
      </Stack>
      <Stack
        component="form"
        direction={{ xs: "column", sm: "row" }}
        gap="var(--spacing-2)"
        onSubmit={(event: FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          if (body.trim().length < 4) return;
          actions.addComment(video.id, body);
          setBody("");
        }}
      >
        <TextField
          label="写一条友好的评论"
          value={body}
          onChange={(event) => setBody(event.target.value)}
          error={invalid}
          helperText={invalid ? "评论至少 4 个字符" : " "}
          fullWidth
        />
        <Button type="submit" variant="contained" disabled={body.trim().length < 4}>
          发布
        </Button>
      </Stack>
      <List aria-label="评论列表" sx={{ mt: "var(--spacing-2)" }}>
        {comments.length ? comments.map((comment) => (
          <ListItem
            key={comment.id}
            divider
            secondaryAction={
              <Button color="inherit" onClick={() => actions.deleteComment(comment.id)}>
                删除
              </Button>
            }
          >
            <ListItemText
              primary={
                <Typography component="span" sx={{ fontWeight: "var(--font-weight-semibold)" }}>
                  {comment.author} · {comment.date}
                </Typography>
              }
              secondary={comment.body}
            />
          </ListItem>
        )) : (
          <ListItem>
            <ListItemText primary="还没有评论" secondary="发布第一条 mock 评论，验证评论区状态。" />
          </ListItem>
        )}
      </List>
    </Paper>
  );
}

function UploadPage({ actions }: { actions: AppActions }) {
  const [draft, setDraft] = useState<UploadDraft>(draftUpload);
  const [errors, setErrors] = useState<UploadErrors>({});
  const [dialogOpen, setDialogOpen] = useState(false);

  const updateDraft = (key: keyof UploadDraft, value: string) => {
    setDraft((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const validate = () => {
    const nextErrors: UploadErrors = {};
    if (draft.title.trim().length < 6) nextErrors.title = "标题至少 6 个字符";
    if (!draft.category) nextErrors.category = "请选择分类";
    if (draft.description.trim().length < 12) nextErrors.description = "简介至少 12 个字符";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  return (
    <PageFrame>
      <ContentContainer compact>
        <Typography component="h1" sx={{ pt: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" }, mb: "var(--spacing-2)", fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
          投稿中心
        </Typography>
        <Typography sx={{ mb: "var(--spacing-4)", color: "var(--color-text-muted)" }}>
          表单只写入本地 state，用来验证投稿校验、成功提示和草稿结构。
        </Typography>
        <Paper
          component="form"
          elevation={0}
          sx={{ display: "grid", gap: "var(--spacing-3)", p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", boxShadow: "var(--shadow-card-soft)" }}
          onSubmit={(event) => {
            event.preventDefault();
            if (!validate()) {
              actions.showToast("请先修正投稿表单", "error");
              return;
            }
            setDialogOpen(true);
          }}
        >
          <TextField label="视频标题" value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} error={Boolean(errors.title)} helperText={errors.title ?? "建议 12 到 28 个字，便于移动端扫描。"} required />
          <FormControl error={Boolean(errors.category)}>
            <InputLabel id="upload-category-label">分类</InputLabel>
            <Select labelId="upload-category-label" label="分类" value={draft.category} onChange={(event: SelectChangeEvent) => updateDraft("category", event.target.value)}>
              {categories.filter((category) => category.id !== "all").map((category) => (
                <MenuItem key={category.id} value={category.id}>{category.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField label="简介" value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} error={Boolean(errors.description)} helperText={errors.description ?? "说明视频内容、标签和可替换素材来源。"} multiline minRows={4} required />
          <TextField label="标签" value={draft.tags} onChange={(event) => updateDraft("tags", event.target.value)} helperText="用逗号分隔，例如：剪辑, 社区, 新手" />
          <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)">
            <Button type="submit" variant="contained" startIcon={<UploadIcon />}>模拟发布</Button>
            <Button type="button" variant="outlined" onClick={() => {
              setDraft(draftUpload);
              setErrors({});
              actions.showToast("草稿已重置", "info");
            }}>重置草稿</Button>
          </Stack>
        </Paper>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="upload-success-title">
          <DialogTitle id="upload-success-title">投稿已模拟提交</DialogTitle>
          <DialogContent>
            <Typography>这个 demo 不会上传真实文件，但已经验证表单校验、提交确认和成功 toast。</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>继续编辑</Button>
            <Button variant="contained" onClick={() => {
              setDialogOpen(false);
              setDraft(draftUpload);
              actions.showToast("投稿成功，已加入本地 mock 队列", "success");
            }}>完成</Button>
          </DialogActions>
        </Dialog>
      </ContentContainer>
    </PageFrame>
  );
}

function NotificationsPage({ notifications, actions }: { notifications: NotificationItem[]; actions: AppActions }) {
  const unreadCount = notifications.filter((notification) => !notification.read).length;

  return (
    <PageFrame>
      <ContentContainer compact>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap="var(--spacing-3)" sx={{ pt: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" }, mb: "var(--spacing-4)" }}>
          <Box>
            <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
              通知中心
            </Typography>
            <Typography sx={{ color: "var(--color-text-muted)" }}>{unreadCount} 条未读通知</Typography>
          </Box>
          <Button variant="outlined" onClick={actions.markAllNotificationsRead} disabled={unreadCount === 0}>
            全部已读
          </Button>
        </Stack>
        <Paper elevation={0} sx={{ borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", overflow: "hidden" }}>
          <List aria-label="通知列表" disablePadding>
            {notifications.map((notification) => (
              <ListItemButton key={notification.id} divider onClick={() => actions.markNotificationRead(notification.id)} selected={!notification.read}>
                <ListItemText
                  primary={
                    <Stack direction="row" alignItems="center" gap="var(--spacing-2)">
                      <Typography component="span" sx={{ fontWeight: "var(--font-weight-semibold)" }}>{notification.title}</Typography>
                      {!notification.read ? <Chip label="未读" color="primary" size="small" /> : null}
                    </Stack>
                  }
                  secondary={`${notification.body} · ${notification.date}`}
                />
              </ListItemButton>
            ))}
          </List>
        </Paper>
      </ContentContainer>
    </PageFrame>
  );
}

function ProfileHeader({ creator, followed, onToggleFollow }: { creator: CreatorProfile; followed: boolean; onToggleFollow: () => void }) {
  return (
    <Paper elevation={0} sx={{ position: "relative", overflow: "hidden", mt: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" }, mb: "var(--spacing-4)", p: "var(--spacing-5)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", boxShadow: "var(--shadow-card-soft)" }}>
      <Box aria-hidden="true" sx={{ position: "absolute", inset: "auto var(--spacing-4) var(--spacing-4) auto", width: "96px", height: "96px", borderRadius: "var(--radius-round)", bgcolor: "var(--color-brand-soft)", filter: toneFilter[creator.tone] }} />
      <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap="var(--spacing-4)" sx={{ position: "relative" }}>
        <Box>
          <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            {creator.name}
          </Typography>
          <Typography sx={{ color: "var(--color-text-muted)" }}>{creator.handle}</Typography>
          <Typography sx={{ mt: "var(--spacing-2)", maxWidth: "62ch" }}>{creator.bio}</Typography>
          <Stack direction="row" gap="var(--spacing-2)" flexWrap="wrap" sx={{ mt: "var(--spacing-3)" }}>
            <Chip label={`${creator.followers} 关注者`} />
            <Chip label={`${creator.following} 正在关注`} />
            <Chip label={`${creator.videos} 视频`} />
          </Stack>
        </Box>
        <Button variant={followed ? "contained" : "outlined"} onClick={onToggleFollow}>
          {followed ? "已关注" : "关注"}
        </Button>
      </Stack>
    </Paper>
  );
}

function CreatorProfilePage({ appState, actions }: { appState: AppState; actions: AppActions }) {
  const { creatorId } = useParams();
  const creator = creators.find((item) => item.id === creatorId);

  if (!creator) {
    return (
      <PageFrame>
        <ContentContainer compact>
          <StateBlock state="error" title="创作者不存在" body="当前 mock 数据里没有这个创作者。" />
        </ContentContainer>
      </PageFrame>
    );
  }

  const items = videos.filter((video) => video.creatorId === creator.id);
  const followed = appState.followedCreatorIds.includes(creator.id);

  return (
    <PageFrame>
      <ContentContainer compact>
        <ProfileHeader creator={creator} followed={followed} onToggleFollow={() => actions.toggleFollow(creator)} />
        <VideoGrid
          items={items}
          state="ready"
          likedVideoIds={appState.likedVideoIds}
          favoriteVideoIds={appState.favoriteVideoIds}
          actions={actions}
        />
      </ContentContainer>
    </PageFrame>
  );
}

function MePage({ appState, actions }: { appState: AppState; actions: AppActions }) {
  const savedItems = videos.filter((video) => appState.favoriteVideoIds.includes(video.id));
  const likedItems = videos.filter((video) => appState.likedVideoIds.includes(video.id));

  return (
    <PageFrame>
      <ContentContainer compact>
        <Paper elevation={0} sx={{ mt: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" }, mb: "var(--spacing-4)", p: "var(--spacing-5)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", boxShadow: "var(--shadow-card-soft)" }}>
          <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            {profile.name}
          </Typography>
          <Typography sx={{ color: "var(--color-text-muted)" }}>{profile.handle}</Typography>
          <Typography sx={{ mt: "var(--spacing-2)" }}>{profile.bio}</Typography>
          <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)" sx={{ mt: "var(--spacing-3)" }}>
            <Chip label={`${profile.followers} 关注者`} />
            <Chip label={`${profile.following} 正在关注`} />
            <Chip label={`${profile.videos} 投稿`} />
            <Chip color="primary" label={`${savedItems.length} 收藏`} />
          </Stack>
        </Paper>

        <Typography component="h2" sx={{ mb: "var(--spacing-3)", fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
          我的收藏
        </Typography>
        <VideoGrid
          items={savedItems}
          state={savedItems.length ? "ready" : "empty"}
          likedVideoIds={appState.likedVideoIds}
          favoriteVideoIds={appState.favoriteVideoIds}
          actions={actions}
        />
        <Divider sx={{ my: "var(--spacing-6)" }} />
        <Typography component="h2" sx={{ mb: "var(--spacing-3)", fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
          最近喜欢
        </Typography>
        <VideoGrid
          items={likedItems}
          state={likedItems.length ? "ready" : "empty"}
          likedVideoIds={appState.likedVideoIds}
          favoriteVideoIds={appState.favoriteVideoIds}
          actions={actions}
        />
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
  const [viewState, setViewState] = useState<ViewState>("ready");
  const [appState, setAppState] = useState<AppState>({
    likedVideoIds: ["video-03"],
    favoriteVideoIds: ["video-01", "video-08"],
    followedCreatorIds: ["creator-03"],
    comments: initialComments,
    notifications: initialNotifications,
    toast: null,
  });

  const actions: AppActions = {
    toggleLike: (video) => {
      setAppState((current) => {
        const liked = current.likedVideoIds.includes(video.id);
        return {
          ...current,
          likedVideoIds: liked ? current.likedVideoIds.filter((id) => id !== video.id) : [...current.likedVideoIds, video.id],
          toast: { message: liked ? "已取消喜欢" : `已喜欢：${video.title}`, severity: "success" },
        };
      });
    },
    toggleFavorite: (video) => {
      setAppState((current) => {
        const favorite = current.favoriteVideoIds.includes(video.id);
        return {
          ...current,
          favoriteVideoIds: favorite ? current.favoriteVideoIds.filter((id) => id !== video.id) : [...current.favoriteVideoIds, video.id],
          toast: { message: favorite ? "已取消收藏" : `已收藏：${video.title}`, severity: "success" },
        };
      });
    },
    toggleFollow: (creator) => {
      setAppState((current) => {
        const followed = current.followedCreatorIds.includes(creator.id);
        return {
          ...current,
          followedCreatorIds: followed ? current.followedCreatorIds.filter((id) => id !== creator.id) : [...current.followedCreatorIds, creator.id],
          toast: { message: followed ? `已取消关注 ${creator.name}` : `已关注 ${creator.name}`, severity: "success" },
        };
      });
    },
    addComment: (videoId, body) => {
      setAppState((current) => ({
        ...current,
        comments: [
          {
            id: `comment-${Date.now()}`,
            videoId,
            author: profile.name,
            body: body.trim(),
            date: "刚刚",
            likes: 0,
          },
          ...current.comments,
        ],
        toast: { message: "评论已发布", severity: "success" },
      }));
    },
    deleteComment: (commentId) => {
      setAppState((current) => ({
        ...current,
        comments: current.comments.filter((comment) => comment.id !== commentId),
        toast: { message: "评论已删除", severity: "info" },
      }));
    },
    markNotificationRead: (notificationId) => {
      setAppState((current) => ({
        ...current,
        notifications: current.notifications.map((notification) =>
          notification.id === notificationId ? { ...notification, read: true } : notification,
        ),
      }));
    },
    markAllNotificationsRead: () => {
      setAppState((current) => ({
        ...current,
        notifications: current.notifications.map((notification) => ({ ...notification, read: true })),
        toast: { message: "通知已全部标记为已读", severity: "success" },
      }));
    },
    showToast: (message, severity = "success") => {
      setAppState((current) => ({ ...current, toast: { message, severity } }));
    },
    closeToast: () => {
      setAppState((current) => ({ ...current, toast: null }));
    },
  };

  const unreadCount = appState.notifications.filter((notification) => !notification.read).length;

  return (
    <>
      <Navigation unreadCount={unreadCount} />
      <Routes>
        <Route path="/" element={<HomePage state={viewState} setState={setViewState} appState={appState} actions={actions} />} />
        <Route path="/explore" element={<ExplorePage appState={appState} actions={actions} />} />
        <Route path="/video/:id" element={<VideoDetailPage appState={appState} actions={actions} />} />
        <Route path="/upload" element={<UploadPage actions={actions} />} />
        <Route path="/notifications" element={<NotificationsPage notifications={appState.notifications} actions={actions} />} />
        <Route path="/profile/:creatorId" element={<CreatorProfilePage appState={appState} actions={actions} />} />
        <Route path="/me" element={<MePage appState={appState} actions={actions} />} />
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
