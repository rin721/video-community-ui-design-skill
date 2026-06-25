import { Box, Chip, Tab, Tabs, Typography } from "@mui/material";
import type { CategoryItem } from "../data/fixtures";

type CategoryTabsProps = {
  categories: CategoryItem[];
  activeCategory: string;
  onCategoryChange: (value: string) => void;
};

export function CategoryTabs({ categories, activeCategory, onCategoryChange }: CategoryTabsProps) {
  return (
    <Box
      sx={{
        borderBottom: "1px solid var(--color-border-subtle)",
        overflowX: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Tabs
        value={activeCategory}
        onChange={(_, value: string) => onCategoryChange(value)}
        aria-label="Content categories"
        variant="scrollable"
        scrollButtons={false}
        sx={{
          minHeight: "var(--layout-category-height)",
          "& .MuiTabs-indicator": {
            height: "3px",
            borderRadius: "var(--radius-badge) var(--radius-badge) 0 0",
            bgcolor: "var(--color-brand-primary)",
          },
        }}
      >
        {categories.map((category) => (
          <Tab
            key={category.id}
            value={category.id}
            aria-label={`${category.label} ${category.count}`}
            label={
              <Box sx={{ display: "inline-flex", alignItems: "center", gap: "var(--spacing-2)" }}>
                <Typography component="span" sx={{ fontWeight: "var(--font-weight-semibold)" }}>
                  {category.label}
                </Typography>
                <Chip
                  component="span"
                  label={category.count}
                  size="small"
                  sx={{
                    height: "22px",
                    minWidth: "24px",
                    borderRadius: "var(--radius-badge)",
                    color: "var(--color-brand-primary)",
                    bgcolor: "var(--color-brand-soft)",
                    fontSize: "var(--font-size-small)",
                    fontWeight: "var(--font-weight-semibold)",
                  }}
                />
              </Box>
            }
            sx={{
              color: "var(--color-text-muted)",
              px: "var(--spacing-3)",
              "&.Mui-selected": {
                color: "var(--color-brand-primary)",
                bgcolor: "transparent",
              },
              "&:hover": {
                color: "var(--color-brand-primary)",
              },
              "&:active": {
                transform: "scale(0.972)",
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
}
