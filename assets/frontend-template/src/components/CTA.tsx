import { Box, Paper, Typography } from "@mui/material";
import { Button } from "./Button";

type CTAProps = {
  onSuccess: () => void;
};

export function CTA({ onSuccess }: CTAProps) {
  return (
    <Paper
      component="section"
      aria-labelledby="cta-title"
      elevation={0}
      sx={{
        mt: "var(--spacing-8)",
        p: "var(--spacing-6)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-card)",
        bgcolor: "var(--color-surface-card)",
        background: "linear-gradient(135deg, var(--color-brand-mist), #fff 58%)",
        boxShadow: "var(--shadow-card-soft)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          justifyContent: "space-between",
          gap: "var(--spacing-4)",
        }}
      >
        <Box sx={{ display: "grid", gap: "var(--spacing-1)" }}>
          <Typography sx={{ color: "var(--color-brand-primary)", fontSize: "var(--font-size-small)", fontWeight: "var(--font-weight-semibold)" }}>
            Next step
          </Typography>
          <Typography id="cta-title" component="h2" sx={{ m: 0, fontWeight: "var(--font-weight-semibold)" }}>
            Keep the visual system reusable.
          </Typography>
          <Typography sx={{ maxWidth: "620px", color: "var(--color-text-muted)" }}>
            Swap fixtures, update tokens, and keep the masthead, tabs, media flow, states, and accessibility checks together.
          </Typography>
        </Box>
        <Button onClick={onSuccess} sx={{ width: { xs: "100%", sm: "auto" } }}>
          Show success
        </Button>
      </Box>
    </Paper>
  );
}
