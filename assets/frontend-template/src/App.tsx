import { useMemo, useState } from "react";
import { HomePage } from "./pages/HomePage";
import { mediaItems } from "./data/fixtures";

export type ViewState = "ready" | "loading" | "empty" | "error" | "success";

export default function App() {
  const [query, setQuery] = useState("");
  const [viewState, setViewState] = useState<ViewState>("ready");

  const filteredItems = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return mediaItems;
    return mediaItems.filter((item) =>
      [item.title, item.creator, item.category].some((value) =>
        value.toLowerCase().includes(normalized),
      ),
    );
  }, [query]);

  const visibleItems = viewState === "empty" ? [] : filteredItems;

  return (
    <HomePage
      items={visibleItems}
      query={query}
      viewState={viewState}
      onQueryChange={setQuery}
      onViewStateChange={setViewState}
    />
  );
}
