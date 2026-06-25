import { Alert, Snackbar } from "@mui/material";

type ToastProps = {
  message: string;
  onClose: () => void;
};

export function Toast({ message, onClose }: ToastProps) {
  return (
    <Snackbar
      open
      autoHideDuration={2800}
      onClose={onClose}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      sx={{
        bottom: { xs: "calc(var(--size-nav-mobile) + var(--spacing-4))", sm: "var(--spacing-6)" },
      }}
    >
      <Alert
        onClose={onClose}
        severity="success"
        variant="filled"
        role="status"
        sx={{
          borderRadius: "var(--radius-card)",
          bgcolor: "var(--color-brand-primary)",
          boxShadow: "var(--shadow-elevated)",
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}
