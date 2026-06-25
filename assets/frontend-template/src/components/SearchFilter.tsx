import { Box, Paper, TextField } from "@mui/material";
import type { ViewState } from "../App";
import { Button } from "./Button";

type SearchFilterProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onViewStateChange: (value: ViewState) => void;
};

export function SearchFilter({ query, onQueryChange, onViewStateChange }: SearchFilterProps) {
  return (
    <Paper
      component="section"
      aria-label="Content filters"
      elevation={0}
      sx={{
        p: "var(--spacing-3)",
        border: "1px solid var(--color-border-subtle)",
        borderRadius: "var(--radius-card)",
        bgcolor: "var(--color-surface-card)",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: { xs: "stretch", sm: "center" },
          gap: "var(--spacing-3)",
        }}
      >
        <TextField
          label="Search"
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Creator, topic, or category"
          size="small"
          fullWidth
        />
        <Box sx={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-2)" }} aria-label="State preview controls">
          <Button variant="ghost" onClick={() => onViewStateChange("ready")}>
            Ready
          </Button>
          <Button variant="ghost" onClick={() => onViewStateChange("empty")}>
            Empty
          </Button>
          <Button variant="ghost" onClick={() => onViewStateChange("error")}>
            Error
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
