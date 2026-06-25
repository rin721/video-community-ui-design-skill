import { Box } from "@mui/material";
import { BrandHeader } from "./BrandHeader";

export function DecorativeMasthead() {
  return (
    <Box
      component="section"
      aria-label="Media community heading"
      sx={{
        position: "relative",
        display: "grid",
        minHeight: {
          xs: "var(--layout-masthead-mobile-height)",
          sm: "var(--layout-masthead-height)",
        },
        placeItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--color-border-subtle)",
        background: "linear-gradient(180deg, #fff 0%, var(--color-surface-page) 100%)",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "calc(var(--spacing-8) * -2)",
          right: "25%",
          width: "var(--decoration-stripe-width)",
          height: "calc(var(--layout-masthead-height) * 1.7)",
          bgcolor: "var(--color-brand-soft)",
          opacity: 0.9,
          transform: "rotate(58deg)",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "calc(var(--spacing-8) * -2)",
          right: "15%",
          width: "var(--decoration-stripe-width)",
          height: "calc(var(--layout-masthead-height) * 1.7)",
          bgcolor: "var(--color-brand-soft)",
          opacity: 0.58,
          transform: "rotate(58deg)",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          display: { xs: "none", sm: "block" },
          position: "absolute",
          left: "36%",
          bottom: "var(--spacing-3)",
          width: "var(--spacing-8)",
          height: "var(--spacing-8)",
          borderLeft: "2px solid var(--color-brand-primary)",
          borderTop: "2px solid var(--color-brand-primary)",
          opacity: 0.8,
          transform: "rotate(-45deg)",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          top: "var(--spacing-8)",
          right: "6vw",
          display: { xs: "none", sm: "grid" },
          gridTemplateColumns: "repeat(4, var(--decoration-plus-size))",
          gap: "18px var(--decoration-plus-gap)",
        }}
      >
        {Array.from({ length: 12 }).map((_, index) => (
          <Box
            component="span"
            key={index}
            sx={{
              position: "relative",
              width: "var(--decoration-plus-size)",
              height: "var(--decoration-plus-size)",
              "&::before, &::after": {
                position: "absolute",
                inset: "50% auto auto 0",
                width: "100%",
                height: "2px",
                bgcolor: "var(--color-brand-primary)",
                content: '""',
              },
              "&::after": {
                transform: "rotate(90deg)",
              },
            }}
          />
        ))}
      </Box>
      <BrandHeader />
    </Box>
  );
}
