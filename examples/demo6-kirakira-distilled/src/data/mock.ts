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
  durationSeconds: number;
  date: string;
  views: string;
  likes: number;
  dislikes: number;
  favorites: number;
  category: string;
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
  score: number;
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
  type: "like" | "comment" | "follow" | "system";
  title: string;
  body: string;
  date: string;
  read: boolean;
};

export type UploadDraft = {
  title: string;
  category: string;
  sourceType: "original" | "repost";
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

export const categories: CategoryItem[] = [
  { id: "all", label: "综合", count: 16 },
  { id: "tech", label: "科技", count: 5 },
  { id: "motion", label: "动画", count: 4 },
  { id: "music", label: "音乐", count: 3 },
  { id: "daily", label: "日常", count: 2 },
  { id: "design", label: "设计", count: 2 },
];

export const creators: CreatorProfile[] = [
  {
    id: "creator-01",
    name: "粉色观测站",
    handle: "@pink-lab",
    bio: "用短视频记录设备、界面、社区互动和轻量弹幕体验。",
    followers: "18.2k",
    following: "128",
    videos: 38,
    tone: "rose",
  },
  {
    id: "creator-02",
    name: "夜空播放器",
    handle: "@yozora-ui",
    bio: "分享播放器、动效和媒体信息结构的设计练习。",
    followers: "9.7k",
    following: "92",
    videos: 24,
    tone: "blue",
  },
  {
    id: "creator-03",
    name: "声音剪辑室",
    handle: "@sound-cut",
    bio: "收集音乐片段、声音设计和轻量社区创作流程。",
    followers: "13.4k",
    following: "77",
    videos: 29,
    tone: "gold",
  },
  {
    id: "creator-04",
    name: "界面评论员",
    handle: "@ui-comment",
    bio: "拆解评论区、弹幕列表、搜索筛选和移动端浏览细节。",
    followers: "22.4k",
    following: "74",
    videos: 42,
    tone: "mint",
  },
];

export const videos: VideoItem[] = [
  {
    id: "video-01",
    title: "播放器详情页的弹幕与评论信息架构",
    creatorId: "creator-01",
    duration: "12:48",
    durationSeconds: 768,
    date: "2026/06/24 12:59:31",
    views: "12.8k",
    likes: 2180,
    dislikes: 16,
    favorites: 642,
    category: "tech",
    sourceType: "repost",
    tags: ["播放器", "弹幕", "评论"],
    description: "一个中性 mock 视频，用来验证大播放器、弹幕面板、评论编辑器和作者关注卡的组合。",
    tone: "rose",
    thumbnailAlt: "粉色几何播放器封面占位",
  },
  {
    id: "video-02",
    title: "移动端三段信息面板的折叠策略",
    creatorId: "creator-02",
    duration: "08:32",
    durationSeconds: 512,
    date: "2026/06/23 09:18:00",
    views: "8.4k",
    likes: 1420,
    dislikes: 9,
    favorites: 388,
    category: "design",
    sourceType: "original",
    tags: ["移动端", "Tabs", "信息"],
    description: "把信息、评论和弹幕压缩进移动端同一视频详情流。",
    tone: "blue",
    thumbnailAlt: "蓝色播放器封面占位",
  },
  {
    id: "video-03",
    title: "富文本评论工具条的轻量实现",
    creatorId: "creator-04",
    duration: "06:16",
    durationSeconds: 376,
    date: "2026/06/22 20:10:00",
    views: "21.1k",
    likes: 3890,
    dislikes: 21,
    favorites: 1210,
    category: "design",
    sourceType: "original",
    tags: ["评论", "编辑器", "社区"],
    description: "演示粗体、斜体、下划线、提及、表情和图片入口的 mock 状态。",
    tone: "mint",
    thumbnailAlt: "薄荷色评论区封面占位",
  },
  {
    id: "video-04",
    title: "弹幕表格如何服务回看与检索",
    creatorId: "creator-01",
    duration: "04:37",
    durationSeconds: 277,
    date: "2026/06/21 18:30:00",
    views: "6.9k",
    likes: 832,
    dislikes: 3,
    favorites: 166,
    category: "tech",
    sourceType: "repost",
    tags: ["弹幕", "表格", "检索"],
    description: "把时间、内容和发送日期拆成可排序的本地 mock 表格。",
    tone: "violet",
    thumbnailAlt: "紫色弹幕表格封面占位",
  },
  {
    id: "video-05",
    title: "侧边窄轨导航和白底播放器页面",
    creatorId: "creator-02",
    duration: "09:04",
    durationSeconds: 544,
    date: "2026/06/19 14:04:00",
    views: "10.2k",
    likes: 1750,
    dislikes: 12,
    favorites: 421,
    category: "motion",
    sourceType: "original",
    tags: ["导航", "播放器", "白底"],
    description: "桌面端保持窄轨导航，主内容使用白底和粉色品牌提示。",
    tone: "gold",
    thumbnailAlt: "金色侧轨页面封面占位",
  },
  {
    id: "video-06",
    title: "投稿前检查：来源、标签和简介",
    creatorId: "creator-03",
    duration: "05:49",
    durationSeconds: 349,
    date: "2026/06/18 10:25:00",
    views: "5.5k",
    likes: 721,
    dislikes: 4,
    favorites: 210,
    category: "music",
    sourceType: "original",
    tags: ["投稿", "标签", "来源"],
    description: "投稿表单的字段、错误状态和成功提示都在本地模拟。",
    tone: "mono",
    thumbnailAlt: "中性色投稿封面占位",
  },
];

export const comments: CommentItem[] = [
  {
    id: "comment-01",
    videoId: "video-01",
    author: "浅色界面研究员",
    handle: "@asakami",
    body: "播放器和弹幕表格放在同一屏很清楚，适合做设计系统验收。",
    date: "2026/06/24 13:20",
    score: 24,
  },
  {
    id: "comment-02",
    videoId: "video-01",
    author: "移动端测试号",
    handle: "@mobile-check",
    body: "移动端 tabs 的信息密度刚好，底部弹幕输入也没有挡住内容。",
    date: "2026/06/24 14:02",
    score: 12,
  },
  {
    id: "comment-03",
    videoId: "video-03",
    author: "评论区观察员",
    handle: "@thread-note",
    body: "富文本工具条保持 icon 化，比一排文字按钮更轻。",
    date: "2026/06/22 20:10",
    score: 31,
  },
];

export const danmakus: DanmakuItem[] = [
  {
    id: "danmaku-01",
    videoId: "video-01",
    time: "00:05",
    timeSeconds: 5,
    body: "这个开场很稳",
    date: "2026/06/24 13:22:26",
  },
  {
    id: "danmaku-02",
    videoId: "video-01",
    time: "00:17",
    timeSeconds: 17,
    body: "弹幕面板来了",
    date: "2026/06/24 13:24:09",
  },
  {
    id: "danmaku-03",
    videoId: "video-01",
    time: "01:08",
    timeSeconds: 68,
    body: "右侧表格很好扫",
    date: "2026/06/24 13:28:41",
  },
  {
    id: "danmaku-04",
    videoId: "video-02",
    time: "00:12",
    timeSeconds: 12,
    body: "移动 tabs 很关键",
    date: "2026/06/23 09:21:00",
  },
];

export const notifications: NotificationItem[] = [
  {
    id: "notice-01",
    type: "comment",
    title: "评论区有新回复",
    body: "有人回复了你的播放器详情页 mock。",
    date: "10 分钟前",
    read: false,
  },
  {
    id: "notice-02",
    type: "like",
    title: "作品获得新的喜欢",
    body: "示例用户喜欢了你的弹幕表格设计。",
    date: "38 分钟前",
    read: false,
  },
  {
    id: "notice-03",
    type: "follow",
    title: "新的关注",
    body: "夜空播放器开始关注你的主页。",
    date: "昨天",
    read: true,
  },
];

export const profile = {
  id: "me",
  name: "示例创作者",
  handle: "@demo-maker",
  bio: "用 mock 数据验证短视频社区的播放器、弹幕、评论和投稿体验。",
  followers: "3.8k",
  following: "86",
  videos: 12,
};

export const draftUpload: UploadDraft = {
  title: "",
  category: "tech",
  sourceType: "original",
  description: "",
  tags: "",
};

export const initialPlayerState: PlayerState = {
  playing: false,
  progress: 0,
  quality: "720P",
  speed: "1.0x",
  volume: 72,
  danmakuVisible: true,
  fullscreen: false,
};
