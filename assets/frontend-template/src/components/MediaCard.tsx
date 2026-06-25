import { Box, Card, CardActionArea, CardContent, CardMedia, Chip, Typography } from "@mui/material";
import type { MediaItem } from "../data/fixtures";

type MediaCardProps = {
  item: MediaItem;
};

const toneFilter: Record<MediaItem["tone"], string> = {
  rose: "none",
  gold: "hue-rotate(28deg) saturate(0.92)",
  blue: "hue-rotate(165deg) saturate(0.72)",
  mint: "hue-rotate(92deg) saturate(0.72)",
  violet: "hue-rotate(235deg) saturate(0.82)",
  mono: "grayscale(0.65) saturate(0.72)",
};

export function MediaCard({ item }: MediaCardProps) {
  return (
    <Card
      data-tone={item.tone}
      sx={{
        minWidth: 0,
        bgcolor: "transparent",
        transition:
          "filter var(--motion-duration-fast) var(--motion-easing-standard), box-shadow var(--motion-duration-fast) var(--motion-easing-standard)",
        "&:active": {
          filter: "brightness(0.985)",
        },
      }}
    >
      <CardActionArea
        component="a"
        href="/"
        aria-label={item.title}
        sx={{
          display: "block",
          height: "100%",
          borderRadius: "var(--radius-card)",
          "&.Mui-focusVisible": {
            outline: "3px solid var(--color-focus-ring)",
            outlineOffset: "3px",
          },
          "&:hover .media-card-title": {
            color: "var(--color-brand-hover)",
          },
          "&:hover .media-card-cover": {
            transform: "var(--motion-transform-media-hover)",
          },
        }}
      >
        <CardMedia
          className="media-card-cover"
          component="div"
          role="img"
          aria-label={item.thumbnailAlt}
          sx={{
            position: "relative",
            overflow: "hidden",
            aspectRatio: "16 / 9",
            borderRadius: "var(--radius-card)",
            bgcolor: "var(--color-brand-soft)",
            background:
              "radial-gradient(circle at 22% 28%, rgba(255,255,255,.66), transparent 28%), linear-gradient(135deg, var(--color-brand-mist), var(--color-brand-soft) 42%, color-mix(in srgb, var(--color-brand-primary) 26%, var(--color-surface-inset)))",
            boxShadow: "inset 0 0 40px rgba(255,255,255,.55)",
            filter: toneFilter[item.tone],
            transformOrigin: "center",
            transition:
              "transform var(--motion-duration-fast) var(--motion-easing-standard), filter var(--motion-duration-fast) var(--motion-easing-standard)",
            "&::before": {
              position: "absolute",
              top: "-12%",
              left: "36%",
              width: "var(--decoration-stripe-width)",
              height: "140%",
              bgcolor: "rgba(255,255,255,.34)",
              transform: "rotate(24deg)",
              content: '""',
            },
            "&::after": {
              position: "absolute",
              right: "var(--spacing-3)",
              top: "var(--spacing-3)",
              width: "calc(var(--spacing-8) + var(--spacing-3))",
              height: "calc(var(--spacing-8) + var(--spacing-3))",
              borderRadius: "var(--radius-round)",
              bgcolor: "rgba(255,255,255,.42)",
              content: '""',
            },
          }}
        >
          <Chip
            label={item.duration}
            size="small"
            sx={{
              position: "absolute",
              right: "var(--spacing-2)",
              bottom: "var(--spacing-2)",
              zIndex: 1,
              height: "22px",
              borderRadius: "var(--radius-badge)",
              color: "#fff",
              bgcolor: "rgba(34,32,36,.68)",
              fontSize: "var(--font-size-small)",
              fontVariantNumeric: "tabular-nums",
            }}
          />
        </CardMedia>

        <CardContent
          sx={{
            p: "var(--spacing-2) var(--spacing-1) 0",
            "&:last-child": {
              pb: 0,
            },
          }}
        >
          <Typography
            className="media-card-title"
            component="h3"
            sx={{
              display: "-webkit-box",
              minHeight: "3.1em",
              m: 0,
              overflow: "hidden",
              color: "var(--color-text-strong)",
              fontSize: "1rem",
              fontWeight: "var(--font-weight-semibold)",
              lineHeight: "var(--line-height-body)",
              transition: "color var(--motion-duration-fast) var(--motion-easing-standard)",
              WebkitBoxOrient: "vertical",
              WebkitLineClamp: 2,
            }}
          >
            {item.title}
          </Typography>
          <Typography
            sx={{
              my: "var(--spacing-1)",
              color: "var(--color-text-muted)",
              fontSize: "var(--font-size-small)",
            }}
          >
            {item.creator}
          </Typography>
          <Box
            component="dl"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--spacing-2)",
              m: 0,
              color: "var(--color-text-muted)",
              fontSize: "var(--font-size-small)",
              fontVariantNumeric: "tabular-nums",
            }}
          >
            <Box component="div" sx={{ display: "inline-flex", gap: "var(--spacing-1)" }}>
              <Box component="dt" className="sr-only">
                Views
              </Box>
              <Box component="dd" sx={{ m: 0 }}>
                {item.views} views
              </Box>
            </Box>
            <Box component="div" sx={{ display: "inline-flex", gap: "var(--spacing-1)" }}>
              <Box component="dt" className="sr-only">
                Date
              </Box>
              <Box component="dd" sx={{ m: 0 }}>
                {item.date}
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
