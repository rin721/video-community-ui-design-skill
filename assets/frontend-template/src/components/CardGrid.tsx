import { Box } from "@mui/material";
import type { MediaItem } from "../data/fixtures";
import { MediaCard } from "./MediaCard";
import { StateBlock } from "./StateBlock";

type CardGridProps = {
  items: MediaItem[];
};

export function CardGrid({ items }: CardGridProps) {
  if (items.length === 0) {
    return <StateBlock state="empty" />;
  }

  return (
    <Box
      component="section"
      aria-label="Media cards"
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
      }}
    >
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </Box>
  );
}
