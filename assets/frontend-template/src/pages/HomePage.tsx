import type { MediaItem } from "../data/fixtures";
import type { ViewState } from "../App";
import { Announcement } from "../components/Announcement";
import { AppShell } from "../components/AppShell";
import { Button } from "../components/Button";
import { CardGrid } from "../components/CardGrid";
import { CTA } from "../components/CTA";
import { Footer } from "../components/Footer";
import { SearchFilter } from "../components/SearchFilter";
import { StateBlock } from "../components/StateBlock";
import { Toast } from "../components/Toast";

type HomePageProps = {
  items: MediaItem[];
  query: string;
  viewState: ViewState;
  onQueryChange: (value: string) => void;
  onViewStateChange: (value: ViewState) => void;
};

export function HomePage({
  items,
  query,
  viewState,
  onQueryChange,
  onViewStateChange,
}: HomePageProps) {
  const stateBlockState =
    viewState === "loading" || viewState === "empty" || viewState === "error" ? viewState : null;

  return (
    <AppShell>
      <main className="page" aria-labelledby="page-title">
        <section className="hero" aria-label="Featured discovery">
          <div>
            <p className="eyebrow">Video community kit</p>
            <h1 id="page-title">A light discovery surface for creators and viewers.</h1>
            <p className="hero__copy">
              Use this template as a neutral starting point for media-first cards, compact metadata,
              visible states, and accessible responsive navigation.
            </p>
          </div>
          <div className="hero__actions">
            <Button onClick={() => onViewStateChange("success")}>Show success</Button>
            <Button variant="ghost" onClick={() => onViewStateChange("loading")}>
              Show loading
            </Button>
          </div>
        </section>

        <Announcement />

        <SearchFilter query={query} onQueryChange={onQueryChange} onViewStateChange={onViewStateChange} />

        {stateBlockState ? (
          <StateBlock state={stateBlockState} onReset={() => onViewStateChange("ready")} />
        ) : (
          <CardGrid items={items} />
        )}

        <CTA onSuccess={() => onViewStateChange("success")} />
      </main>
      <Footer />
      {viewState === "success" ? <Toast message="success state is visible" onClose={() => onViewStateChange("ready")} /> : null}
    </AppShell>
  );
}
