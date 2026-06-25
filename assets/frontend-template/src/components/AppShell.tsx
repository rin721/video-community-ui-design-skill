import type { ReactNode } from "react";
import { Box } from "@mui/material";
import { Navigation } from "./Navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "var(--color-surface-page)" }}>
      <Navigation />
      <Box sx={{ minHeight: "100vh" }}>{children}</Box>
    </Box>
  );
}
