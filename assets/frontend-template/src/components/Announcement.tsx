import { Alert, AlertTitle, Paper } from "@mui/material";

export function Announcement() {
  return (
    <Paper
      component="aside"
      role="status"
      elevation={0}
      sx={{
        my: "var(--spacing-4)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-card)",
        bgcolor: "var(--color-surface-card)",
        boxShadow: "var(--shadow-card-soft)",
        overflow: "hidden",
      }}
    >
      <Alert
        severity="info"
        variant="standard"
        sx={{
          alignItems: "flex-start",
          color: "var(--color-text-strong)",
          bgcolor: "transparent",
          p: "var(--spacing-4)",
          "& .MuiAlert-icon": {
            color: "var(--color-brand-primary)",
          },
          "& .MuiAlert-message": {
            py: 0,
          },
        }}
      >
        <AlertTitle sx={{ m: 0, fontWeight: "var(--font-weight-semibold)" }}>内容区已准备</AlertTitle>
        使用中性 fixtures 预览分类、公告、媒体卡片和状态反馈，替换内容时保持同一信息节奏。
      </Alert>
    </Paper>
  );
}
