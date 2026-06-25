import { Box, Typography } from "@mui/material";
import { Stack } from "./Stack";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Stack direction="row" alignItems="center" gap="var(--spacing-2)" sx={{ minWidth: 0 }}>
      <Box
        aria-hidden="true"
        sx={{
          width: compact ? "var(--spacing-4)" : "var(--spacing-5)",
          height: compact ? "var(--spacing-4)" : "var(--spacing-5)",
          bgcolor: "var(--color-brand-primary)",
          clipPath:
            "polygon(50% 0, 62% 34%, 98% 35%, 69% 56%, 79% 92%, 50% 70%, 21% 92%, 31% 56%, 2% 35%, 38% 34%)",
          flex: "0 0 auto",
        }}
      />
      <Box sx={{ minWidth: 0 }}>
        <Typography
          component={compact ? "span" : "h1"}
          sx={{
            display: "block",
            m: 0,
            color: "var(--color-brand-primary)",
            fontSize: compact ? "var(--font-size-title)" : "var(--font-size-display)",
            fontWeight: "var(--font-weight-brand)",
            lineHeight: "var(--line-height-tight)",
          }}
        >
          PINKFLOW
        </Typography>
        {!compact ? (
          <Typography sx={{ color: "var(--color-text-muted)", fontWeight: "var(--font-weight-semibold)" }}>
            mock short video community
          </Typography>
        ) : null}
      </Box>
    </Stack>
  );
}
