export type CategoryItem = {
  id: string;
  label: string;
  count: number;
};

export type MediaItem = {
  id: string;
  title: string;
  creator: string;
  duration: string;
  date: string;
  views: string;
  category: string;
  tone: "rose" | "gold" | "blue" | "mint" | "violet" | "mono";
  thumbnailAlt: string;
};

export const categories: CategoryItem[] = [
  { id: "all", label: "精选", count: 12 },
  { id: "motion", label: "动画", count: 4 },
  { id: "sound", label: "音乐", count: 3 },
  { id: "tech", label: "科技", count: 2 },
  { id: "design", label: "设计", count: 2 },
  { id: "play", label: "游戏", count: 1 },
];

export const mediaItems: MediaItem[] = [
  {
    id: "item-1",
    title: "Soft motion notes for a bright creator workflow",
    creator: "Creator One",
    duration: "08:24",
    date: "2026/06/18",
    views: "1.2k",
    category: "motion",
    tone: "rose",
    thumbnailAlt: "Soft rose gradient media thumbnail placeholder",
  },
  {
    id: "item-2",
    title: "Compact studio timing with reusable scene rhythm",
    creator: "Creator Two",
    duration: "11:08",
    date: "2026/06/16",
    views: "860",
    category: "sound",
    tone: "gold",
    thumbnailAlt: "Warm gold gradient media thumbnail placeholder",
  },
  {
    id: "item-3",
    title: "Interface fragments for a gentle media dashboard",
    creator: "Creator Three",
    duration: "06:42",
    date: "2026/06/12",
    views: "2.1k",
    category: "design",
    tone: "blue",
    thumbnailAlt: "Cool blue gradient media thumbnail placeholder",
  },
  {
    id: "item-4",
    title: "Tiny navigation details that keep browsing light",
    creator: "Creator Four",
    duration: "05:36",
    date: "2026/06/09",
    views: "740",
    category: "tech",
    tone: "mint",
    thumbnailAlt: "Mint gradient media thumbnail placeholder",
  },
  {
    id: "item-5",
    title: "Playful card states for mobile content discovery",
    creator: "Creator Five",
    duration: "09:18",
    date: "2026/06/04",
    views: "3.4k",
    category: "play",
    tone: "violet",
    thumbnailAlt: "Violet gradient media thumbnail placeholder",
  },
  {
    id: "item-6",
    title: "Clean empty states with geometric recovery cues",
    creator: "Creator Six",
    duration: "04:20",
    date: "2026/05/28",
    views: "510",
    category: "design",
    tone: "mono",
    thumbnailAlt: "Neutral gradient media thumbnail placeholder",
  },
];
