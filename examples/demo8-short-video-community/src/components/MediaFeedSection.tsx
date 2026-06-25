import { Box, Button, Typography } from "@mui/material";
import type { ReactNode } from "react";
import { MediaCard } from "./MediaCard";
import { Stack } from "./Stack";
import { StateBlock } from "./StateBlock";
import type { VideoItem, ViewState } from "../data/types";
import type { AppAction, AppState } from "../state/communityReducer";

export function MediaFeedSection({
  title,
  eyebrow,
  items,
  viewState,
  appState,
  dispatch,
  action,
}: {
  title: string;
  eyebrow?: string;
  items: VideoItem[];
  viewState: ViewState;
  appState: AppState;
  dispatch: React.Dispatch<AppAction>;
  action?: ReactNode;
}) {
  return (
    <Box component="section" aria-labelledby={`${title}-heading`} sx={{ display: "grid", gap: "var(--spacing-3)" }}>
      <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between" gap="var(--spacing-2)">
        <Box>
          {eyebrow ? (
            <Typography sx={{ color: "var(--color-brand-primary)", fontSize: "var(--font-size-small)", fontWeight: "var(--font-weight-semibold)" }}>
              {eyebrow}
            </Typography>
          ) : null}
          <Typography id={`${title}-heading`} component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            {title}
          </Typography>
        </Box>
        {action}
      </Stack>

      {viewState === "ready" ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(auto-fill, minmax(var(--grid-feed-min), 1fr))",
            },
            gap: "var(--grid-feed-gap)",
          }}
        >
          {items.map((video) => (
            <MediaCard key={video.id} video={video} appState={appState} dispatch={dispatch} />
          ))}
        </Box>
      ) : (
        <StateBlock
          state={viewState}
          title={viewState === "empty" ? "暂时没有匹配内容" : viewState === "error" ? "内容加载失败" : "正在整理推荐"}
          body={
            viewState === "empty"
              ? "换一个分类、话题或关键词后再试试。"
              : viewState === "error"
                ? "这是 mock 错误分支，可用来检查恢复动作和告警样式。"
                : "媒体骨架保持稳定尺寸，避免页面跳动。"
          }
          action={
            viewState === "error" ? (
              <Button variant="contained" onClick={() => dispatch({ type: "showToast", message: "已模拟重新加载", severity: "success" })}>
                重新加载
              </Button>
            ) : undefined
          }
        />
      )}
    </Box>
  );
}
