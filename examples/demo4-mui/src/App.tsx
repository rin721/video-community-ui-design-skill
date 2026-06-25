import {
  Alert,
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Chip,
  Drawer,
  IconButton,
  Paper,
  Snackbar,
  SvgIcon,
  Tab,
  Tabs,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { useMemo, useState } from "react";

type MediaItem = {
  id: string;
  title: string;
  creator: string;
  duration: string;
  date: string;
  tone: "rose" | "gold" | "blue" | "mint" | "violet";
};

const categories = ["首页", "动画", "音乐", "设计", "游戏", "综合"];

const mediaItems: MediaItem[] = [
  {
    id: "clip-01",
    title: "真实 MUI 组件库下的媒体卡片密度测试",
    creator: "示例创作者",
    duration: "05:00",
    date: "08/07/2024",
    tone: "rose",
  },
  {
    id: "clip-02",
    title: "Tabs 指示器、Snackbar 与轻量导航反馈",
    creator: "频道样例",
    duration: "04:28",
    date: "08/08/2024",
    tone: "gold",
  },
  {
    id: "clip-03",
    title: "Drawer 与 BottomNavigation 的同源布局验证",
    creator: "界面观察员",
    duration: "03:16",
    date: "08/09/2024",
    tone: "blue",
  },
  {
    id: "clip-04",
    title: "Alert/Paper 表面和透明 Card 的分层关系",
    creator: "静态工坊",
    duration: "06:40",
    date: "08/10/2024",
    tone: "mint",
  },
  {
    id: "clip-05",
    title: "使用 CardActionArea 保留真实点击反馈",
    creator: "视觉练习室",
    duration: "05:12",
    date: "08/11/2024",
    tone: "violet",
  },
  {
    id: "clip-06",
    title: "移动双列媒体网格在 Material UI 中的实现",
    creator: "响应式笔记",
    duration: "07:03",
    date: "08/12/2024",
    tone: "gold",
  },
  {
    id: "clip-07",
    title: "通用库组件封装和设计 token 如何衔接",
    creator: "内容样例",
    duration: "02:55",
    date: "08/13/2024",
    tone: "blue",
  },
  {
    id: "clip-08",
    title: "不再模仿：直接使用 MUI primitive 的 demo",
    creator: "前端样例",
    duration: "05:37",
    date: "08/14/2024",
    tone: "mint",
  },
  {
    id: "clip-09",
    title: "从 tab 切换到 toast 状态的轻交互练习",
    creator: "交互样例",
    duration: "04:44",
    date: "08/15/2024",
    tone: "violet",
  },
  {
    id: "clip-10",
    title: "内容区高密度但低干扰排列",
    creator: "排版样例",
    duration: "06:08",
    date: "08/16/2024",
    tone: "rose",
  },
];

function HomeIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M4 10.5 12 4l8 6.5V20h-5v-6H9v6H4v-9.5Z" />
    </SvgIcon>
  );
}

function SearchIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M10.5 5a5.5 5.5 0 0 1 4.35 8.86l4.15 4.15L17.6 19.4l-4.15-4.15A5.5 5.5 0 1 1 10.5 5Zm0 2a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Z" />
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

function FeedIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M5 6h14v2H5V6Zm0 5h14v2H5v-2Zm0 5h9v2H5v-2Z" />
    </SvgIcon>
  );
}

function SettingsIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm7.8 4c0-.5-.05-1-.15-1.5l1.85-1.42-1.8-3.12-2.18.88a8.1 8.1 0 0 0-1.3-.76L15.9 4h-3.8l-.32 2.08c-.45.2-.88.46-1.3.76L8.3 5.96 6.5 9.08l1.85 1.42a7.7 7.7 0 0 0 0 3L6.5 14.92l1.8 3.12 2.18-.88c.42.3.85.56 1.3.76L12.1 20h3.8l.32-2.08c.45-.2.88-.46 1.3-.76l2.18.88 1.8-3.12-1.85-1.42c.1-.49.15-.99.15-1.5Z" />
    </SvgIcon>
  );
}

const navButtonSx = {
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

const toneFilter: Record<MediaItem["tone"], string> = {
  rose: "none",
  gold: "hue-rotate(28deg) saturate(.92)",
  blue: "hue-rotate(165deg) saturate(.72)",
  mint: "hue-rotate(92deg) saturate(.72)",
  violet: "hue-rotate(235deg) saturate(.82)",
};

function DecorativeMasthead() {
  return (
    <Box
      component="section"
      aria-label="页面品牌区"
      sx={{
        display: { xs: "none", sm: "grid" },
        position: "relative",
        height: "var(--layout-masthead-height)",
        placeItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid rgba(240, 110, 142, .08)",
        background:
          "radial-gradient(circle at 74% 28%, rgba(240,110,142,.09), transparent 11%), linear-gradient(180deg, rgba(255,246,249,.88), rgba(255,255,255,.72))",
        "&::before": {
          position: "absolute",
          right: 155,
          top: -38,
          width: 640,
          height: 86,
          borderRadius: "var(--radius-badge)",
          bgcolor: "rgba(240, 110, 142, .18)",
          content: '""',
          transform: "rotate(-13deg)",
        },
        "&::after": {
          position: "absolute",
          right: 34,
          top: 20,
          width: 92,
          height: 92,
          backgroundImage: "radial-gradient(circle, rgba(240,110,142,.42) 1.4px, transparent 1.5px)",
          backgroundSize: "14px 14px",
          content: '""',
        },
      }}
    >
      <Typography
        component="h1"
        variant="h1"
        sx={{
          position: "relative",
          zIndex: 1,
          color: "var(--color-brand-primary)",
          fontSize: 58,
          textAlign: "center",
        }}
      >
        MEDIAKIT
        <Typography
          component="span"
          sx={{ display: "block", mt: "var(--spacing-2)", color: "var(--color-text-muted)", fontWeight: 700 }}
        >
          Real Material UI media community
        </Typography>
      </Typography>
    </Box>
  );
}

function Navigation() {
  const mobileItems = useMemo(
    () => [
      { label: "首页", icon: <HomeIcon /> },
      { label: "分类", icon: <MenuIcon /> },
      { label: "动态", icon: <FeedIcon /> },
      { label: "搜索", icon: <SearchIcon /> },
    ],
    [],
  );

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
        <Toolbar sx={{ minHeight: "var(--size-nav-mobile)", justifyContent: "space-between", px: 2 }}>
          <IconButton aria-label="打开菜单" sx={navButtonSx}>
            <MenuIcon />
          </IconButton>
          <Typography sx={{ color: "var(--color-brand-primary)", fontSize: 20, fontWeight: 800 }}>MEDIAKIT</Typography>
          <IconButton aria-label="打开搜索" sx={navButtonSx}>
            <SearchIcon />
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
          {[
            ["首页", <HomeIcon key="home" />],
            ["搜索", <SearchIcon key="search" />],
            ["动态", <FeedIcon key="feed" />],
          ].map(([label, icon], index) => (
            <Tooltip key={String(label)} title={label} placement="right">
              <IconButton aria-label={String(label)} aria-current={index === 0 ? "page" : undefined} sx={navButtonSx}>
                {icon}
              </IconButton>
            </Tooltip>
          ))}
        </Box>

        <Typography
          aria-hidden="true"
          sx={{
            color: "var(--color-brand-primary)",
            fontWeight: 800,
            transform: "rotate(-90deg)",
            letterSpacing: 0,
          }}
        >
          MEDIAKIT
        </Typography>

        <Tooltip title="设置" placement="right">
          <IconButton aria-label="设置" sx={navButtonSx}>
            <SettingsIcon />
          </IconButton>
        </Tooltip>
      </Drawer>

      <BottomNavigation
        component="nav"
        showLabels
        value="首页"
        aria-label="移动底部导航"
        sx={{
          position: "fixed",
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: (theme) => theme.zIndex.appBar,
          display: { xs: "flex", sm: "none" },
          height: "var(--size-nav-mobile)",
          bgcolor: "var(--color-surface-glass)",
          borderTop: "1px solid var(--color-border-subtle)",
          boxShadow: "var(--shadow-nav-glow)",
          backdropFilter: "blur(16px)",
        }}
      >
        {mobileItems.map((item, index) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            value={item.label}
            icon={item.icon}
            aria-current={index === 0 ? "page" : undefined}
            sx={{
              minWidth: 0,
              color: "var(--color-text-muted)",
              "&.Mui-selected, &[aria-current='page']": { color: "var(--color-brand-primary)" },
            }}
          />
        ))}
      </BottomNavigation>
    </>
  );
}

function CategoryTabs({ active, onChange }: { active: number; onChange: (value: number) => void }) {
  return (
    <Box sx={{ display: { xs: "none", sm: "block" }, borderBottom: "1px solid var(--color-border-subtle)" }}>
      <Tabs
        value={active}
        onChange={(_, value: number) => onChange(value)}
        centered
        aria-label="内容分类"
        sx={{
          minHeight: "var(--layout-category-height)",
          "& .MuiTabs-indicator": {
            height: 3,
            borderRadius: "var(--radius-badge) var(--radius-badge) 0 0",
            bgcolor: "var(--color-brand-primary)",
          },
        }}
      >
        {categories.map((category) => (
          <Tab key={category} label={category} data-testid={`demo4-tab-${category}`} />
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
        my: { xs: "var(--spacing-4)", sm: "var(--spacing-5)" },
        borderRadius: "var(--radius-card)",
        boxShadow: "var(--shadow-card-soft)",
        border: "1px solid rgba(240, 110, 142, .18)",
        overflow: "hidden",
      }}
    >
      <Alert
        severity="info"
        action={
          <Button color="primary" variant="contained">
            知道了
          </Button>
        }
        sx={{
          alignItems: "center",
          color: "var(--color-text-strong)",
          bgcolor: "var(--color-surface-card)",
          "& .MuiAlert-icon": { color: "var(--color-brand-primary)" },
        }}
      >
        <Typography component="strong" sx={{ display: "block", mb: .25 }}>
          公告
        </Typography>
        这个 demo 使用真实 Material UI 组件库构建，用中性内容和 CSS 封面占位验证 skill 的 React MUI 路径。
      </Alert>
    </Paper>
  );
}

function MediaCard({ item, onOpen }: { item: MediaItem; onOpen: (item: MediaItem) => void }) {
  return (
    <Card
      sx={{
        bgcolor: "transparent",
        overflow: "visible",
        "&:hover .demo4-cover": {
          transform: "var(--motion-transform-media-hover)",
        },
        "&:hover .demo4-title": {
          color: "var(--color-brand-hover)",
        },
      }}
    >
      <CardActionArea
        data-testid={`demo4-card-${item.id}`}
        onClick={() => onOpen(item)}
        aria-label={`打开视频：${item.title}`}
        sx={{
          borderRadius: "var(--radius-card)",
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: "3px",
          },
        }}
      >
        <CardMedia
          className="demo4-cover"
          component="div"
          role="img"
          aria-label={`${item.title} 的 CSS 占位封面`}
          sx={{
            position: "relative",
            aspectRatio: "var(--grid-media-aspect)",
            overflow: "hidden",
            borderRadius: "var(--radius-card)",
            background:
              "radial-gradient(circle at 20% 72%, rgba(255,255,255,.68) 0 10%, transparent 11%), radial-gradient(circle at 73% 27%, rgba(255,255,255,.45) 0 13%, transparent 14%), linear-gradient(118deg, rgba(255,255,255,.52) 0 18%, transparent 19% 28%, rgba(255,255,255,.32) 29% 35%, transparent 36%), linear-gradient(135deg, rgb(252,199,209), rgb(239,164,198) 48%, rgb(181,216,230))",
            boxShadow: "inset 0 0 38px rgba(255,255,255,.55)",
            filter: toneFilter[item.tone],
            transformOrigin: "center",
            transition: "transform var(--motion-duration-fast) var(--motion-easing-standard)",
          }}
        >
          <Chip
            label={item.duration}
            size="small"
            sx={{
              position: "absolute",
              right: "var(--spacing-2)",
              bottom: "var(--spacing-2)",
              height: 22,
              color: "#fff",
              bgcolor: "rgba(34, 32, 36, .62)",
              fontWeight: 700,
              fontVariantNumeric: "tabular-nums",
            }}
          />
        </CardMedia>
        <CardContent sx={{ px: "var(--spacing-1)", pt: "var(--spacing-2)", pb: 0 }}>
          <Typography
            className="demo4-title"
            component="h3"
            sx={{
              display: "-webkit-box",
              minHeight: "2.9em",
              m: 0,
              overflow: "hidden",
              color: "var(--color-text-strong)",
              fontSize: 14,
              fontWeight: 700,
              lineHeight: 1.42,
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
              transition: "color var(--motion-duration-fast) var(--motion-easing-standard)",
            }}
          >
            {item.title}
          </Typography>
          <Typography sx={{ mt: "var(--spacing-1)", color: "var(--color-text-muted)", fontSize: 12 }}>
            {item.creator}
          </Typography>
          <Typography sx={{ color: "var(--color-text-muted)", fontSize: 12, fontVariantNumeric: "tabular-nums" }}>
            0 views&nbsp;&nbsp;{item.date}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export function App() {
  const [activeCategory, setActiveCategory] = useState(0);
  const [snackbar, setSnackbar] = useState<string | null>(null);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "var(--color-surface-page)" }}>
      <Navigation />
      <Box
        component="main"
        sx={{
          minHeight: "100vh",
          pl: { xs: 0, sm: "var(--size-nav-rail)" },
          pt: { xs: "var(--size-nav-mobile)", sm: 0 },
          pb: { xs: "calc(var(--size-nav-mobile) + var(--spacing-4))", sm: "var(--spacing-8)" },
        }}
      >
        <DecorativeMasthead />
        <CategoryTabs
          active={activeCategory}
          onChange={(value) => {
            setActiveCategory(value);
            setSnackbar(`已切换到 ${categories[value]}`);
          }}
        />
        <Box
          sx={{
            width: "min(100%, var(--container-content-max))",
            mx: "auto",
            px: { xs: "var(--spacing-4)", sm: "var(--spacing-6)", md: 0 },
          }}
        >
          <Announcement />
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: "var(--spacing-3)",
            }}
          >
            <Typography
              component="h2"
              sx={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-2)", fontSize: 20, fontWeight: 800 }}
            >
              最新 <Chip label="0" size="small" color="primary" variant="outlined" />
            </Typography>
            <Typography sx={{ display: { xs: "none", sm: "block" }, color: "var(--color-text-muted)", fontSize: 12 }}>
              按发布时间排序
            </Typography>
          </Box>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "repeat(2, minmax(0, 1fr))",
                sm: "repeat(3, minmax(0, 1fr))",
                md: "repeat(5, minmax(0, 1fr))",
              },
              gap: { xs: "12px", sm: "var(--grid-feed-gap)" },
            }}
          >
            {mediaItems.map((item) => (
              <MediaCard key={item.id} item={item} onOpen={(nextItem) => setSnackbar(`打开视频预览：${nextItem.title}`)} />
            ))}
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={Boolean(snackbar)}
        autoHideDuration={2200}
        onClose={() => setSnackbar(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert severity="success" variant="filled" onClose={() => setSnackbar(null)}>
          {snackbar}
        </Alert>
      </Snackbar>
    </Box>
  );
}
