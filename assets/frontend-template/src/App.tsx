import { useMemo, useState } from "react";
import { categories, mediaItems } from "./data/fixtures";
import { HomePage } from "./pages/HomePage";

export type ViewState = "ready" | "loading" | "empty" | "error" | "success";

export default function App() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [viewState, setViewState] = useState<ViewState>("ready");

  const filteredItems = useMemo(() => {
    if (activeCategory === "all") return mediaItems;
    return mediaItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const visibleItems = viewState === "empty" ? [] : filteredItems;

  return (
    <HomePage
      categories={categories}
      activeCategory={activeCategory}
      items={visibleItems}
      viewState={viewState}
      onCategoryChange={(value) => {
        setActiveCategory(value);
        setViewState("ready");
      }}
      onViewStateChange={setViewState}
    />
  );
}
