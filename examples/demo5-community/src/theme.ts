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
  spacing: (factor: number) => {
    const scale: Record<number, string> = {
      0: "0",
      1: "var(--spacing-1)",
      2: "var(--spacing-2)",
      3: "var(--spacing-3)",
      4: "var(--spacing-4)",
      6: "var(--spacing-6)",
      8: "var(--spacing-8)",
    };
    return scale[factor] ?? `calc(var(--spacing-1) * ${factor})`;
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
        root: ({ ownerState }) => ({
          minHeight: "var(--size-touch-min)",
          borderRadius: "var(--radius-card)",
          boxShadow: ownerState.variant === "contained" ? "var(--shadow-card-soft)" : "none",
          transition:
            "transform var(--motion-duration-fast) var(--motion-easing-standard), box-shadow var(--motion-duration-fast) var(--motion-easing-standard), background-color var(--motion-duration-fast) var(--motion-easing-standard)",
          "&:active": {
            transform: "var(--motion-transform-press-scale)",
          },
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: "3px",
          },
        }),
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
          borderRadius: "var(--radius-badge)",
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
