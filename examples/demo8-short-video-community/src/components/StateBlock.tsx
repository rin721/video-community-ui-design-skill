import { Box, Button, Paper, Skeleton, Typography } from "@mui/material";
import { AlertTriangle, Inbox, Loader2 } from "lucide-react";
import type { ReactNode } from "react";
import type { ViewState } from "../data/types";
import { Stack } from "./Stack";

export function StateBlock({
  state,
  title,
  body,
  action,
}: {
  state: ViewState;
  title: string;
  body: string;
  action?: ReactNode;
}) {
  if (state === "loading") {
    return (
      <Stack role="status" aria-label="内容加载中" gap="var(--spacing-3)">
        {Array.from({ length: 6 }).map((_, index) => (
          <Skeleton key={index} variant="rounded" height={index % 2 ? 92 : 132} sx={{ borderRadius: "var(--radius-card)" }} />
        ))}
      </Stack>
    );
  }

  const Icon = state === "error" ? AlertTriangle : state === "empty" ? Inbox : Loader2;
  return (
    <Paper
      role={state === "error" ? "alert" : "status"}
      elevation={0}
      sx={{
        display: "grid",
        placeItems: "center",
        minHeight: "220px",
        p: "var(--spacing-6)",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-subtle)",
        bgcolor: "var(--color-surface-card)",
        textAlign: "center",
      }}
    >
      <Stack alignItems="center" gap="var(--spacing-3)">
        <Box
          aria-hidden="true"
          sx={{
            display: "grid",
            placeItems: "center",
            width: "var(--spacing-8)",
            height: "var(--spacing-8)",
            borderRadius: "var(--radius-round)",
            color: "var(--color-brand-primary)",
            bgcolor: "var(--color-brand-soft)",
          }}
        >
          <Icon size={20} />
        </Box>
        <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
          {title}
        </Typography>
        <Typography sx={{ color: "var(--color-text-muted)", maxWidth: "52ch" }}>{body}</Typography>
        {action}
      </Stack>
    </Paper>
  );
}
