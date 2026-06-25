import { Box, Paper } from "@mui/material";
import type { CategoryItem, MediaItem } from "../data/fixtures";
import type { ViewState } from "../App";
import { Announcement } from "../components/Announcement";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/Button";
import { CategoryTabs } from "../components/CategoryTabs";
import { CTA } from "../components/CTA";
import { DecorativeMasthead } from "../components/DecorativeMasthead";
import { Footer } from "../components/Footer";
import { MediaFeedSection } from "../components/MediaFeedSection";
import { Toast } from "../components/Toast";

type HomePageProps = {
  categories: CategoryItem[];
  activeCategory: string;
  items: MediaItem[];
  viewState: ViewState;
  onCategoryChange: (value: string) => void;
  onViewStateChange: (value: ViewState) => void;
};

export function HomePage({
  categories,
  activeCategory,
  items,
  viewState,
  onCategoryChange,
  onViewStateChange,
}: HomePageProps) {
  return (
    <AppShell>
      <Box
        component="main"
        aria-labelledby="feed-heading"
        sx={{
          minHeight: "100vh",
          pl: { xs: 0, sm: "var(--size-nav-rail)" },
          pt: { xs: "var(--size-nav-mobile)", sm: 0 },
          pb: { xs: "calc(var(--size-nav-mobile) + var(--spacing-6))", sm: 0 },
        }}
      >
        <DecorativeMasthead />
        <Box
          sx={{
            width: "min(100%, var(--container-content-max))",
            mx: "auto",
            px: {
              xs: "var(--container-padding-mobile)",
              sm: "var(--container-padding-tablet)",
              md: "var(--container-padding-desktop)",
            },
          }}
        >
          <CategoryTabs
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={onCategoryChange}
          />
          <Announcement />

          <Paper
            elevation={0}
            aria-label="State preview controls"
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: "var(--spacing-2)",
              mb: "var(--spacing-4)",
              p: "var(--spacing-3)",
              border: "1px solid var(--color-border-subtle)",
              borderRadius: "var(--radius-card)",
              bgcolor: "var(--color-surface-card)",
              boxShadow: "var(--shadow-card-soft)",
            }}
          >
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "var(--spacing-2)" }}>
              <Button variant="ghost" onClick={() => onViewStateChange("ready")}>
                Ready
              </Button>
              <Button variant="ghost" onClick={() => onViewStateChange("loading")}>
                Loading
              </Button>
              <Button variant="ghost" onClick={() => onViewStateChange("empty")}>
                Empty
              </Button>
              <Button variant="ghost" onClick={() => onViewStateChange("error")}>
                Error
              </Button>
            </Box>
          </Paper>

          <MediaFeedSection
            items={items}
            state={viewState}
            onReset={() => onViewStateChange("ready")}
          />
          <CTA onSuccess={() => onViewStateChange("success")} />
        </Box>
      </Box>
      <Footer />
      {viewState === "success" ? (
        <Toast message="success state is visible" onClose={() => onViewStateChange("ready")} />
      ) : null}
    </AppShell>
  );
}
