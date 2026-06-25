import { Box, Typography } from "@mui/material";

type BrandHeaderProps = {
  compact?: boolean;
};

export function BrandHeader({ compact = false }: BrandHeaderProps) {
  return (
    <Box
      component="a"
      href="/"
      aria-label="Media community home"
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--spacing-2)",
        color: "var(--color-brand-primary)",
        textDecoration: "none",
        "&:focus-visible": {
          outline: "3px solid var(--color-focus-ring)",
          outlineOffset: "var(--spacing-2)",
        },
      }}
    >
      <Typography
        component="span"
        sx={{
          fontSize: compact ? "var(--font-size-mobile-wordmark)" : "var(--font-size-wordmark)",
          fontWeight: "var(--font-weight-brand)",
          lineHeight: "var(--line-height-tight)",
        }}
      >
        Media
      </Typography>
      <Typography
        component="span"
        sx={{
          display: compact ? "none" : "inline",
          fontSize: "var(--font-size-wordmark)",
          fontWeight: "var(--font-weight-brand)",
          lineHeight: "var(--line-height-tight)",
        }}
      >
        Bloom
      </Typography>
      <Box
        aria-hidden="true"
        sx={{
          display: compact ? "none" : "inline-block",
          width: "var(--decoration-star-size)",
          height: "var(--decoration-star-size)",
          bgcolor: "var(--color-brand-primary)",
          clipPath:
            "polygon(50% 0, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%)",
          transform: "rotate(10deg)",
        }}
      />
    </Box>
  );
}
