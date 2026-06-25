import { Box, Typography } from "@mui/material";

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        px: { xs: "var(--container-padding-mobile)", sm: "var(--container-padding-desktop)" },
        py: "var(--spacing-6)",
        color: "var(--color-text-muted)",
        fontSize: "var(--font-size-small)",
      }}
    >
      <Box sx={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-3)", justifyContent: "center" }}>
        {["Media community UI template", "Neutral fixtures only", "WCAG AA intent"].map((item) => (
          <Typography key={item} component="span" sx={{ fontSize: "var(--font-size-small)" }}>
            {item}
          </Typography>
        ))}
      </Box>
    </Box>
  );
}
