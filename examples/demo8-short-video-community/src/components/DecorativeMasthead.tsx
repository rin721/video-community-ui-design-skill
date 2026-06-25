import { Box } from "@mui/material";
import { BrandMark } from "./BrandHeader";

export function DecorativeMasthead() {
  return (
    <Box
      component="section"
      aria-label="社区品牌区"
      sx={{
        position: "relative",
        display: { xs: "none", sm: "grid" },
        height: "var(--layout-masthead-height)",
        placeItems: "center",
        overflow: "hidden",
        borderBottom: "1px solid var(--color-border-subtle)",
        background:
          "linear-gradient(180deg, rgba(255,246,249,.92), rgba(255,255,255,.74)), repeating-linear-gradient(135deg, rgba(240,110,142,.12) 0 10px, transparent 10px 34px)",
        "&::before": {
          content: '""',
          position: "absolute",
          right: "10%",
          top: "20px",
          width: "min(640px, 56vw)",
          height: "72px",
          borderRadius: "var(--radius-badge)",
          bgcolor: "rgba(240, 110, 142, .16)",
          transform: "rotate(-12deg)",
        },
        "&::after": {
          content: '""',
          position: "absolute",
          left: "11%",
          bottom: "24px",
          width: "120px",
          height: "72px",
          backgroundImage:
            "repeating-linear-gradient(90deg, rgba(240,110,142,.28) 0 2px, transparent 2px 14px), repeating-linear-gradient(0deg, rgba(240,110,142,.2) 0 2px, transparent 2px 14px)",
          opacity: ".7",
        },
      }}
    >
      <BrandMark />
    </Box>
  );
}
