import { createTheme } from "@mui/material/styles";

export const videoCommunityTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: "light",
    primary: {
      main: "#f06e8e",
      light: "#fde8ef",
      dark: "#d94f73",
      contrastText: "#ffffff",
    },
    background: {
      default: "#fffafd",
      paper: "#ffffff",
    },
    text: {
      primary: "#222024",
      secondary: "#62545a",
    },
  },
  typography: {
    fontFamily: "var(--font-family-body)",
    fontSize: 14,
    h1: {
      fontWeight: "var(--font-weight-brand)",
      lineHeight: "var(--line-height-tight)",
      letterSpacing: 0,
    },
    h2: {
      fontWeight: "var(--font-weight-semibold)",
      lineHeight: "var(--line-height-tight)",
      letterSpacing: 0,
    },
    button: {
      fontWeight: "var(--font-weight-semibold)",
      textTransform: "none",
      letterSpacing: 0,
    },
  },
  shape: {
    borderRadius: 6,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: "var(--color-surface-page)",
          color: "var(--color-text-strong)",
          overflowX: "hidden",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          minHeight: "var(--size-touch-min)",
          borderRadius: "var(--radius-card)",
          boxShadow: "none",
          "&:active": {
            transform: "var(--motion-transform-press-scale)",
          },
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: "3px",
          },
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          width: "var(--size-touch-min)",
          minHeight: "var(--size-touch-min)",
          borderRadius: "var(--radius-round)",
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: "3px",
          },
        },
      },
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          borderRadius: "var(--radius-card)",
          boxShadow: "none",
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          minHeight: "var(--layout-category-height)",
          textTransform: "none",
          fontWeight: "var(--font-weight-semibold)",
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: "3px",
          },
        },
      },
    },
  },
});
