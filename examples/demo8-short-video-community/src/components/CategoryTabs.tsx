import { Badge, Box, Tab, Tabs } from "@mui/material";
import type { CategoryItem } from "../data/types";

export function CategoryTabs({
  items,
  value,
  onChange,
}: {
  items: CategoryItem[];
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Box
      sx={{
        borderBottom: "1px solid var(--color-border-subtle)",
        overflowX: "auto",
        bgcolor: "var(--color-surface-card)",
      }}
    >
      <Tabs value={value} onChange={(_, next: string) => onChange(next)} variant="scrollable" scrollButtons="auto" aria-label="内容分类">
        {items.map((item) => (
          <Tab
            key={item.id}
            value={item.id}
            label={
              <Badge badgeContent={item.count} color={value === item.id ? "primary" : "default"} sx={{ "& .MuiBadge-badge": { right: "-14px" } }}>
                {item.label}
              </Badge>
            }
          />
        ))}
      </Tabs>
    </Box>
  );
}
