export type MediaItem = {
  id: string;
  title: string;
  creator: string;
  duration: string;
  date: string;
  views: string;
  category: string;
  thumbnailAlt: string;
};

export const mediaItems: MediaItem[] = [
  {
    id: "item-1",
    title: "Morning editing notes for a calm creator workflow",
    creator: "Creator One",
    duration: "08:24",
    date: "Today",
    views: "12k",
    category: "Workflow",
    thumbnailAlt: "Soft gradient video thumbnail placeholder",
  },
  {
    id: "item-2",
    title: "Tiny studio setup with reusable lighting cues",
    creator: "Creator Two",
    duration: "11:08",
    date: "Yesterday",
    views: "8.5k",
    category: "Studio",
    thumbnailAlt: "Abstract studio thumbnail placeholder",
  },
  {
    id: "item-3",
    title: "Community picks with compact metadata rhythm",
    creator: "Creator Three",
    duration: "06:42",
    date: "This week",
    views: "21k",
    category: "Community",
    thumbnailAlt: "Layered media card thumbnail placeholder",
  },
];
