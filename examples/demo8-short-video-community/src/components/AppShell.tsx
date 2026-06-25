import { Box } from "@mui/material";
import type { ReactNode } from "react";

export function PageFrame({ children }: { children: ReactNode }) {
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

export function ContentContainer({ children, compact = false }: { children: ReactNode; compact?: boolean }) {
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
