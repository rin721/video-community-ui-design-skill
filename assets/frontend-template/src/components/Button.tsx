import { Button as MuiButton, type ButtonProps as MuiButtonProps } from "@mui/material";

type ButtonProps = Omit<MuiButtonProps, "variant" | "color"> & {
  variant?: "primary" | "ghost";
};

export function Button({ children, variant = "primary", sx, ...props }: ButtonProps) {
  return (
    <MuiButton
      color="primary"
      variant={variant === "primary" ? "contained" : "outlined"}
      sx={[
        {
          px: "var(--spacing-4)",
          color: variant === "primary" ? "#fff" : "var(--color-text-strong)",
          borderColor: variant === "ghost" ? "var(--color-border-subtle)" : "transparent",
          bgcolor: variant === "primary" ? "var(--color-brand-primary)" : "var(--color-surface-card)",
          "&:hover": {
            color: variant === "ghost" ? "var(--color-brand-primary)" : "#fff",
            borderColor: "color-mix(in srgb, var(--color-brand-primary) 28%, transparent)",
            bgcolor: variant === "primary" ? "var(--color-brand-hover)" : "var(--color-brand-mist)",
            boxShadow: "var(--shadow-card-soft)",
          },
        },
        ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
      ]}
      type="button"
      {...props}
    >
      {children}
    </MuiButton>
  );
}
