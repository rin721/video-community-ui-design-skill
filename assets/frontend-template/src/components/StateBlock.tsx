import { Box, Paper, Skeleton, Typography } from "@mui/material";
import type { ViewState } from "../App";
import { Button } from "./Button";

type StateBlockProps = {
  state: Extract<ViewState, "loading" | "empty" | "error">;
  onReset?: () => void;
};

const stateCopy = {
  loading: {
    title: "内容加载中",
    body: "骨架区域保持卡片尺寸稳定，避免页面跳动。",
  },
  empty: {
    title: "暂无匹配内容",
    body: "切换分类或重置视图，继续浏览其他内容。",
  },
  error: {
    title: "内容暂时不可用",
    body: "保留当前布局，并提供明确的恢复动作。",
  },
};

export function StateBlock({ state, onReset }: StateBlockProps) {
  const copy = stateCopy[state];

  return (
    <Paper
      component="section"
      role={state === "error" ? "alert" : "status"}
      elevation={0}
      sx={{
        position: "relative",
        display: "grid",
        minHeight: "280px",
        alignContent: "center",
        justifyItems: "center",
        gap: "var(--spacing-3)",
        overflow: "hidden",
        p: "var(--spacing-8)",
        textAlign: "center",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-card)",
        bgcolor: "var(--color-surface-card)",
        boxShadow: "var(--shadow-card-soft)",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{ display: "flex", gap: "var(--spacing-2)", minWidth: "min(420px, 100%)" }}
      >
        {state === "loading"
          ? Array.from({ length: 3 }).map((_, index) => (
              <Skeleton
                key={index}
                variant="rounded"
                animation="wave"
                sx={{
                  flex: 1,
                  aspectRatio: "16 / 9",
                  borderRadius: "var(--radius-card)",
                  bgcolor: "var(--color-brand-soft)",
                }}
              />
            ))
          : null}
      </Box>
      <Typography component="h2" sx={{ position: "relative", m: 0, fontWeight: "var(--font-weight-semibold)" }}>
        {copy.title}
      </Typography>
      <Typography sx={{ position: "relative", maxWidth: "460px", m: 0, color: "var(--color-text-muted)" }}>
        {copy.body}
      </Typography>
      {onReset ? <Button onClick={onReset}>重置视图</Button> : null}
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: "auto 0 0",
          height: "var(--decoration-state-peak-height)",
          opacity: 0.22,
          pointerEvents: "none",
          animation: state === "loading" ? "pulse var(--motion-duration-loading) infinite" : "none",
          "& span": {
            position: "absolute",
            bottom: "-24px",
            width: "42%",
            height: "100%",
            bgcolor: "var(--color-brand-primary)",
            clipPath: "polygon(50% 0, 100% 100%, 0 100%)",
          },
          "& span:nth-of-type(1)": { left: "8%" },
          "& span:nth-of-type(2)": { left: "32%", opacity: 0.72 },
          "& span:nth-of-type(3)": { right: "8%", opacity: 0.54 },
        }}
      >
        <span />
        <span />
        <span />
      </Box>
    </Paper>
  );
}
