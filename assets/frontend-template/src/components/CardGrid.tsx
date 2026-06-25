import type { MediaItem } from "../data/fixtures";
import { MediaCard } from "./MediaCard";
import { StateBlock } from "./StateBlock";

type CardGridProps = {
  items: MediaItem[];
};

export function CardGrid({ items }: CardGridProps) {
  if (items.length === 0) {
    return <StateBlock state="empty" />;
  }

  return (
    <section className="card-grid" aria-label="Video cards">
      {items.map((item) => (
        <MediaCard key={item.id} item={item} />
      ))}
    </section>
  );
}
