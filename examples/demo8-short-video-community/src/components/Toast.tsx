import { Alert, Snackbar } from "@mui/material";
import type { ToastState } from "../state/communityReducer";

export function Toast({ toast, onClose }: { toast: ToastState | null; onClose: () => void }) {
  return (
    <Snackbar open={Boolean(toast)} autoHideDuration={2600} onClose={onClose} anchorOrigin={{ vertical: "bottom", horizontal: "right" }}>
      <Alert severity={toast?.severity ?? "success"} variant="filled" onClose={onClose}>
        {toast?.message}
      </Alert>
    </Snackbar>
  );
}
