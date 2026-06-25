import { Box, Chip, Typography } from "@mui/material";
import type { MediaItem } from "../data/fixtures";
import type { ViewState } from "../App";
import { MediaCard } from "./MediaCard";
import { StateBlock } from "./StateBlock";

type MediaFeedSectionProps = {
  items: MediaItem[];
  state: ViewState;
  onReset: () => void;
};

export function MediaFeedSection({ items, state, onReset }: MediaFeedSectionProps) {
  const stateBlockState =
    state === "loading" || state === "empty" || state === "error" ? state : null;

  return (
    <Box component="section" aria-labelledby="feed-heading" sx={{ minWidth: 0, mt: "var(--spacing-4)" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "var(--spacing-2)",
          mb: "var(--spacing-4)",
          color: "var(--color-brand-primary)",
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            width: "var(--spacing-4)",
            height: "var(--spacing-4)",
            bgcolor: "var(--color-brand-primary)",
            clipPath:
              "polygon(50% 0, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%)",
          }}
        />
        <Typography
          id="feed-heading"
          component="h1"
          sx={{
            m: 0,
            color: "var(--color-text-strong)",
            fontSize: "var(--font-size-section)",
            fontWeight: "var(--font-weight-brand)",
          }}
        >
          最新内容
        </Typography>
        <Chip
          label={items.length}
          size="small"
          sx={{
            height: "22px",
            minWidth: "24px",
            borderRadius: "var(--radius-badge)",
            color: "#fff",
            bgcolor: "var(--color-brand-primary)",
            fontSize: "var(--font-size-small)",
            fontWeight: "var(--font-weight-semibold)",
          }}
        />
      </Box>

      {stateBlockState ? (
        <StateBlock state={stateBlockState} onReset={onReset} />
      ) : (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(2, minmax(0, 1fr))",
              sm: "repeat(auto-fit, minmax(var(--grid-feed-min), 1fr))",
            },
            gap: {
              xs: "14px",
              sm: "var(--grid-feed-gap)",
            },
            "@media (max-width: 359px)": {
              gridTemplateColumns: "1fr",
            },
          }}
        >
          {items.map((item) => (
            <MediaCard key={item.id} item={item} />
          ))}
        </Box>
      )}
    </Box>
  );
}
