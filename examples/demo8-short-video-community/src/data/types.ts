export type ViewState = "ready" | "loading" | "empty" | "error";

export type VideoTone = "rose" | "mint" | "gold" | "sky" | "violet" | "mono";

export type CategoryItem = {
  id: string;
  label: string;
  count: number;
};

export type TopicItem = {
  id: string;
  label: string;
  description: string;
  videoIds: string[];
  tone: VideoTone;
};

export type CreatorProfile = {
  id: string;
  name: string;
  handle: string;
  bio: string;
  followers: string;
  following: string;
  videos: number;
  tone: VideoTone;
  verified: boolean;
};

export type VideoItem = {
  id: string;
  title: string;
  creatorId: string;
  duration: string;
  durationSeconds: number;
  date: string;
  views: string;
  likes: number;
  dislikes: number;
  favorites: number;
  category: string;
  topicIds: string[];
  sourceType: "original" | "repost";
  tags: string[];
  description: string;
  tone: VideoTone;
  thumbnailAlt: string;
};

export type CommentItem = {
  id: string;
  videoId: string;
  author: string;
  handle: string;
  body: string;
  date: string;
  likes: number;
  owned?: boolean;
};

export type ReplyItem = {
  id: string;
  commentId: string;
  author: string;
  handle: string;
  body: string;
  date: string;
  owned?: boolean;
};

export type DanmakuItem = {
  id: string;
  videoId: string;
  time: string;
  timeSeconds: number;
  body: string;
  date: string;
};

export type NotificationItem = {
  id: string;
  type: "like" | "comment" | "follow" | "system" | "upload";
  title: string;
  body: string;
  date: string;
  read: boolean;
  videoId?: string;
};

export type CollectionItem = {
  id: string;
  title: string;
  description: string;
  videoIds: string[];
  visibility: "public" | "private";
};

export type UploadDraft = {
  title: string;
  category: string;
  sourceType: "original" | "repost";
  visibility: "public" | "private" | "unlisted";
  description: string;
  tags: string;
};

export type PlayerState = {
  playing: boolean;
  progress: number;
  quality: string;
  speed: string;
  volume: number;
  danmakuVisible: boolean;
  fullscreen: boolean;
};
