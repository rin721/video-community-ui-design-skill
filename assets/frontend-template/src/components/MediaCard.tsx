import type { MediaItem } from "../data/fixtures";

type MediaCardProps = {
  item: MediaItem;
};

export function MediaCard({ item }: MediaCardProps) {
  return (
    <article className="media-card">
      <div className="media-card__thumb" role="img" aria-label={item.thumbnailAlt}>
        <span>{item.duration}</span>
      </div>
      <div className="media-card__body">
        <p className="media-card__category">{item.category}</p>
        <h2>{item.title}</h2>
        <p className="media-card__meta">
          <span>{item.creator}</span>
          <span>{item.views} views</span>
          <span>{item.date}</span>
        </p>
      </div>
    </article>
  );
}
