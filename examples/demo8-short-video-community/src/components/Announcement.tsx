import { Alert, Button, Paper, Typography } from "@mui/material";
import { Sparkles } from "lucide-react";
import { Stack } from "./Stack";

export function Announcement({ onAction }: { onAction?: () => void }) {
  return (
    <Paper
      elevation={0}
      sx={{
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-subtle)",
        bgcolor: "var(--color-surface-card)",
        overflow: "hidden",
      }}
    >
      <Alert
        icon={<Sparkles size={18} />}
        severity="info"
        sx={{
          alignItems: "center",
          bgcolor: "transparent",
          color: "var(--color-text-strong)",
          "& .MuiAlert-icon": { color: "var(--color-brand-primary)" },
        }}
        action={
          onAction ? (
            <Button size="small" color="primary" onClick={onAction}>
              查看
            </Button>
          ) : null
        }
      >
        <Stack gap="var(--spacing-1)">
          <Typography component="strong" sx={{ fontWeight: "var(--font-weight-semibold)" }}>
            本地 mock 社区正在演示完整互动闭环
          </Typography>
          <Typography component="span" sx={{ color: "var(--color-text-muted)" }}>
            浏览、投稿、评论、弹幕、通知和收藏都只写入本地 reducer。
          </Typography>
        </Stack>
      </Alert>
    </Paper>
  );
}
