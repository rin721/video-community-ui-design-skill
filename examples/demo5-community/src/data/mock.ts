export type ViewState = "ready" | "loading" | "empty" | "error" | "success";

export type VideoTone = "rose" | "gold" | "blue" | "mint" | "violet" | "mono";

export type CategoryItem = {
  id: string;
  label: string;
  count: number;
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
};

export type VideoItem = {
  id: string;
  title: string;
  creatorId: string;
  duration: string;
  date: string;
  views: string;
  likes: number;
  favorites: number;
  category: string;
  tags: string[];
  description: string;
  tone: VideoTone;
  thumbnailAlt: string;
};

export type CommentItem = {
  id: string;
  videoId: string;
  author: string;
  body: string;
  date: string;
  likes: number;
};

export type NotificationItem = {
  id: string;
  type: "like" | "comment" | "follow" | "system";
  title: string;
  body: string;
  date: string;
  read: boolean;
};

export type UploadDraft = {
  title: string;
  category: string;
  description: string;
  tags: string;
};

export const categories: CategoryItem[] = [
  { id: "all", label: "精选", count: 12 },
  { id: "motion", label: "动画", count: 4 },
  { id: "music", label: "音乐", count: 3 },
  { id: "daily", label: "日常", count: 3 },
  { id: "design", label: "设计", count: 3 },
  { id: "tech", label: "科技", count: 2 },
];

export const creators: CreatorProfile[] = [
  {
    id: "creator-01",
    name: "晨光剪辑室",
    handle: "@soft-cuts",
    bio: "分享轻量短视频创作、转场节奏和社区内容实验。",
    followers: "18.2k",
    following: "128",
    videos: 38,
    tone: "rose",
  },
  {
    id: "creator-02",
    name: "午后声音所",
    handle: "@sound-room",
    bio: "收集音乐片段、声音设计和小型现场记录。",
    followers: "9.7k",
    following: "92",
    videos: 24,
    tone: "gold",
  },
  {
    id: "creator-03",
    name: "界面观察台",
    handle: "@ui-observe",
    bio: "用短视频拆解信息架构、动效和界面细节。",
    followers: "22.4k",
    following: "74",
    videos: 42,
    tone: "blue",
  },
  {
    id: "creator-04",
    name: "日常采样器",
    handle: "@daily-sample",
    bio: "记录城市小片段、生活技巧和温和的社区议题。",
    followers: "13.5k",
    following: "146",
    videos: 31,
    tone: "mint",
  },
];

export const videos: VideoItem[] = [
  {
    id: "video-01",
    title: "三步做出轻盈的开场转场",
    creatorId: "creator-01",
    duration: "00:42",
    date: "2026/06/24",
    views: "12.8k",
    likes: 2180,
    favorites: 642,
    category: "motion",
    tags: ["转场", "剪辑", "新手"],
    description: "用遮罩、节奏点和封面色块做一个短视频开场。素材均为 CSS 占位，方便替换。",
    tone: "rose",
    thumbnailAlt: "粉色几何渐变视频封面占位",
  },
  {
    id: "video-02",
    title: "用环境声做 15 秒日常片头",
    creatorId: "creator-02",
    duration: "00:58",
    date: "2026/06/23",
    views: "8.4k",
    likes: 1420,
    favorites: 388,
    category: "music",
    tags: ["声音", "片头", "日常"],
    description: "从脚步声、杯子声和短和弦里整理一个可复用的片头节奏。",
    tone: "gold",
    thumbnailAlt: "暖金色几何渐变视频封面占位",
  },
  {
    id: "video-03",
    title: "媒体卡片为什么要保留两行标题",
    creatorId: "creator-03",
    duration: "01:16",
    date: "2026/06/22",
    views: "21.1k",
    likes: 3890,
    favorites: 1210,
    category: "design",
    tags: ["UI", "卡片", "信息密度"],
    description: "用一个媒体社区样例解释标题、作者、时长和计数的扫描顺序。",
    tone: "blue",
    thumbnailAlt: "蓝色几何渐变视频封面占位",
  },
  {
    id: "video-04",
    title: "一条评论如何变成社区话题",
    creatorId: "creator-04",
    duration: "00:37",
    date: "2026/06/21",
    views: "6.9k",
    likes: 832,
    favorites: 166,
    category: "daily",
    tags: ["评论", "社区", "互动"],
    description: "模拟一个从评论区延伸出来的轻讨论，不涉及真实用户数据。",
    tone: "mint",
    thumbnailAlt: "薄荷色几何渐变视频封面占位",
  },
  {
    id: "video-05",
    title: "移动端底部导航的安全区检查",
    creatorId: "creator-03",
    duration: "01:04",
    date: "2026/06/19",
    views: "10.2k",
    likes: 1750,
    favorites: 421,
    category: "tech",
    tags: ["移动端", "导航", "可访问性"],
    description: "用 mock 页面验证底部导航不会遮挡最后一屏内容。",
    tone: "violet",
    thumbnailAlt: "紫色几何渐变视频封面占位",
  },
  {
    id: "video-06",
    title: "发布前检查：封面、标签和简介",
    creatorId: "creator-01",
    duration: "00:49",
    date: "2026/06/18",
    views: "5.5k",
    likes: 721,
    favorites: 210,
    category: "motion",
    tags: ["投稿", "封面", "标签"],
    description: "投稿表单的字段、错误状态和成功提示都在本地模拟。",
    tone: "mono",
    thumbnailAlt: "中性色几何渐变视频封面占位",
  },
  {
    id: "video-07",
    title: "短视频首页的公告条应该放哪里",
    creatorId: "creator-03",
    duration: "00:53",
    date: "2026/06/17",
    views: "14.6k",
    likes: 2060,
    favorites: 510,
    category: "design",
    tags: ["首页", "公告", "布局"],
    description: "把公告、分类和内容流同时放进首屏，但不让公告抢主内容。",
    tone: "rose",
    thumbnailAlt: "粉色和蓝色混合几何封面占位",
  },
  {
    id: "video-08",
    title: "轻量音乐片段的收藏体验",
    creatorId: "creator-02",
    duration: "01:28",
    date: "2026/06/16",
    views: "7.2k",
    likes: 1088,
    favorites: 540,
    category: "music",
    tags: ["收藏", "声音", "素材"],
    description: "在不接后端的情况下，用本地 state 模拟收藏和 toast 反馈。",
    tone: "gold",
    thumbnailAlt: "金色和粉色几何封面占位",
  },
];

export const comments: CommentItem[] = [
  {
    id: "comment-01",
    videoId: "video-01",
    author: "星标用户",
    body: "这个节奏点拆得很清楚，适合作为投稿前的检查清单。",
    date: "2026/06/24 13:20",
    likes: 24,
  },
  {
    id: "comment-02",
    videoId: "video-01",
    author: "练习账号",
    body: "如果加一个封面安全区说明，新手会更容易复用。",
    date: "2026/06/24 14:02",
    likes: 12,
  },
  {
    id: "comment-03",
    videoId: "video-03",
    author: "卡片研究员",
    body: "两行标题确实能减少移动端截断的随机感。",
    date: "2026/06/22 20:10",
    likes: 31,
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "notice-01",
    type: "like",
    title: "作品获得新的喜欢",
    body: "示例用户喜欢了你的转场练习。",
    date: "10 分钟前",
    read: false,
  },
  {
    id: "notice-02",
    type: "comment",
    title: "评论区有新回复",
    body: "有人建议你补充封面安全区说明。",
    date: "38 分钟前",
    read: false,
  },
  {
    id: "notice-03",
    type: "follow",
    title: "新的关注",
    body: "午后声音所开始关注你的主页。",
    date: "昨天",
    read: true,
  },
  {
    id: "notice-04",
    type: "system",
    title: "投稿草稿已保存",
    body: "本地 mock 已记录你的上一次投稿内容。",
    date: "2 天前",
    read: true,
  },
];

export const profile = {
  id: "me",
  name: "示例创作者",
  handle: "@demo-maker",
  bio: "用 mock 数据验证短视频社区的浏览、互动和投稿体验。",
  followers: "3.8k",
  following: "86",
  videos: 12,
};

export const draftUpload: UploadDraft = {
  title: "",
  category: "motion",
  description: "",
  tags: "",
};
