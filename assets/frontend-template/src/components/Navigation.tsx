import {
  AppBar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Drawer,
  IconButton,
  SvgIcon,
  Toolbar,
  Tooltip,
} from "@mui/material";
import type { SvgIconProps } from "@mui/material/SvgIcon";
import { BrandHeader } from "./BrandHeader";

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

function ClockIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 4a8 8 0 1 1 0 16 8 8 0 0 1 0-16Zm1 4h-2v5l4 2 .9-1.65L13 11.9V8Z" />
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

function UploadIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M11 17h2V8.8l3.1 3.1 1.4-1.4L12 5l-5.5 5.5 1.4 1.4L11 8.8V17ZM5 19h14v2H5v-2Z" />
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

function SettingsIcon(props: SvgIconProps) {
  return (
    <SvgIcon viewBox="0 0 24 24" {...props}>
      <path d="M12 8a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm7.8 2a7.7 7.7 0 0 0-.15-1.5l1.85-1.42-1.8-3.12-2.18.88a7.95 7.95 0 0 0-1.3-.76L15.9 4h-3.6l-.32 2.08c-.45.2-.88.46-1.3.76L8.5 5.96 6.7 9.08l1.85 1.42a7.7 7.7 0 0 0 0 3L6.7 14.92l1.8 3.12 2.18-.88c.42.3.85.56 1.3.76L12.3 20h3.6l.32-2.08c.45-.2.88-.46 1.3-.76l2.18.88 1.8-3.12-1.85-1.42c.1-.49.15-.99.15-1.5Z" />
    </SvgIcon>
  );
}

const railItems = [
  { label: "Home", icon: HomeIcon },
  { label: "Search", icon: SearchIcon },
  { label: "History", icon: ClockIcon },
  { label: "Saved", icon: BookmarkIcon },
  { label: "Upload", icon: UploadIcon },
];

const mobileItems = [
  { label: "首页", icon: HomeIcon },
  { label: "分类", icon: SearchIcon },
  { label: "动态", icon: ClockIcon },
  { label: "我的", icon: UserIcon },
];

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
    transform: "scale(0.972)",
  },
};

export function Navigation() {
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
          sx={{
            minHeight: "var(--size-nav-mobile)",
            px: "var(--spacing-3)",
            justifyContent: "space-between",
          }}
        >
          <IconButton type="button" aria-label="Open menu" sx={railButtonSx}>
            <MenuIcon fontSize="small" />
          </IconButton>
          <BrandHeader compact />
          <IconButton type="button" aria-label="Open settings" sx={railButtonSx}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        component="aside"
        variant="permanent"
        aria-label="Primary navigation"
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
        <Box component="nav" aria-label="Primary" sx={{ display: "grid", gap: "var(--spacing-2)" }}>
          {railItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <Tooltip key={item.label} title={item.label} placement="right">
                <IconButton
                  component="a"
                  href="/"
                  aria-label={item.label}
                  aria-current={index === 0 ? "page" : undefined}
                  sx={railButtonSx}
                >
                  <Icon fontSize="small" />
                </IconButton>
              </Tooltip>
            );
          })}
        </Box>

        <Box
          aria-hidden="true"
          sx={{
            alignSelf: "center",
            justifySelf: "center",
            display: "inline-flex",
            width: "max-content",
            alignItems: "center",
            gap: "var(--spacing-4)",
            color: "var(--color-brand-primary)",
            transform: "rotate(-90deg)",
          }}
        >
          <Box
            sx={{
              width: "var(--decoration-star-size)",
              height: "var(--decoration-star-size)",
              bgcolor: "var(--color-brand-primary)",
              clipPath:
                "polygon(50% 0, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%)",
            }}
          />
          <Box component="span" sx={{ fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            MEDIA
          </Box>
          <Box sx={{ display: "inline-flex", gap: "var(--spacing-2)", transform: "skew(30deg)" }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Box key={index} sx={{ width: "var(--spacing-2)", height: "48px", bgcolor: "var(--color-brand-primary)" }} />
            ))}
          </Box>
        </Box>

        <Tooltip title="Settings" placement="right">
          <IconButton component="a" href="/" aria-label="Settings" sx={railButtonSx}>
            <SettingsIcon fontSize="small" />
          </IconButton>
        </Tooltip>
      </Drawer>

      <BottomNavigation
        component="nav"
        aria-label="Mobile primary navigation"
        showLabels
        value={mobileItems[0].label}
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
        {mobileItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <BottomNavigationAction
              key={item.label}
              label={item.label}
              value={item.label}
              icon={<Icon fontSize="small" />}
              aria-current={index === 0 ? "page" : undefined}
              sx={{
                color: "var(--color-text-muted)",
                minWidth: 0,
                "&.Mui-selected, &[aria-current='page']": {
                  color: "var(--color-brand-primary)",
                },
              }}
            />
          );
        })}
      </BottomNavigation>
    </>
  );
}
