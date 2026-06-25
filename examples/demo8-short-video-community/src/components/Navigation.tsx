import {
  AppBar,
  Badge,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Tooltip,
} from "@mui/material";
import {
  Bell,
  Clapperboard,
  Compass,
  History,
  Home,
  Library,
  Search,
  Upload,
  User,
  Users,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { BrandMark } from "./BrandHeader";
import { Stack } from "./Stack";

const navigationItems: Array<{ label: string; path: string; icon: LucideIcon }> = [
  { label: "首页", path: "/", icon: Home },
  { label: "探索", path: "/explore", icon: Search },
  { label: "刷看", path: "/feed", icon: Clapperboard },
  { label: "创作者", path: "/creators", icon: Users },
  { label: "投稿", path: "/upload", icon: Upload },
  { label: "通知", path: "/notifications", icon: Bell },
  { label: "历史", path: "/history", icon: History },
  { label: "合集", path: "/collections", icon: Library },
  { label: "我的", path: "/me", icon: User },
];

const bottomItems = navigationItems.filter((item) => ["/", "/explore", "/feed", "/upload", "/me"].includes(item.path));

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

function matchesPath(current: string, path: string) {
  return path === "/" ? current === "/" : current.startsWith(path);
}

export function Navigation({ unreadCount }: { unreadCount: number }) {
  const location = useLocation();
  const navigate = useNavigate();
  const activeItem = navigationItems.find((item) => matchesPath(location.pathname, item.path)) ?? navigationItems[0];
  const activeBottom = bottomItems.find((item) => matchesPath(location.pathname, item.path))?.path ?? activeItem.path;

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
            <Compass size={19} />
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
            const active = matchesPath(location.pathname, item.path);
            const button = (
              <IconButton
                aria-label={item.label}
                aria-current={active ? "page" : undefined}
                onClick={() => navigate(item.path)}
                sx={railButtonSx}
              >
                <Icon size={19} />
              </IconButton>
            );
            return (
              <Tooltip key={item.path} title={item.label} placement="right">
                <Box>{button}</Box>
              </Tooltip>
            );
          })}
        </Stack>
        <Box />
        <Tooltip title="当前页面" placement="right">
          <Box sx={{ mx: "auto", color: "var(--color-brand-primary)" }}>{activeItem.label.slice(0, 1)}</Box>
        </Tooltip>
      </Drawer>

      <BottomNavigation
        component="nav"
        aria-label="移动主导航"
        value={activeBottom}
        onChange={(_, value: string) => navigate(value)}
        showLabels
        sx={{
          display: { xs: "flex", sm: "none" },
          position: "fixed",
          right: 0,
          bottom: 0,
          left: 0,
          zIndex: 1200,
          height: "var(--size-nav-mobile)",
          bgcolor: "var(--color-surface-glass)",
          borderTop: "1px solid var(--color-border-subtle)",
          boxShadow: "var(--shadow-nav-glow)",
          backdropFilter: "blur(16px)",
          "& .Mui-selected": {
            color: "var(--color-brand-primary)",
          },
          "& .MuiBottomNavigationAction-root": {
            minWidth: 0,
            maxWidth: "none",
            px: 0,
          },
        }}
      >
        {bottomItems.map((item) => {
          const Icon = item.icon;
          return <BottomNavigationAction key={item.path} label={item.label} value={item.path} icon={<Icon size={18} />} />;
        })}
      </BottomNavigation>
    </>
  );
}
