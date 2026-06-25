import type { ViewState } from "../App";

type SearchFilterProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onViewStateChange: (value: ViewState) => void;
};

export function SearchFilter({ query, onQueryChange, onViewStateChange }: SearchFilterProps) {
  return (
    <section className="filters" aria-label="Content filters">
      <label>
        <span>Search</span>
        <input
          value={query}
          onChange={(event) => onQueryChange(event.target.value)}
          placeholder="Creator, topic, or category"
        />
      </label>
      <div className="filters__buttons" aria-label="State preview controls">
        <button type="button" onClick={() => onViewStateChange("ready")}>Ready</button>
        <button type="button" onClick={() => onViewStateChange("empty")}>Empty</button>
        <button type="button" onClick={() => onViewStateChange("error")}>Error</button>
      </div>
    </section>
  );
}
