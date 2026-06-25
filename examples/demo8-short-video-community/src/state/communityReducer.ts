import {
  collections,
  comments,
  danmakus,
  draftUpload,
  initialPlayerState,
  notifications,
  profile,
  replies,
} from "../data/mock";
import type {
  CollectionItem,
  CommentItem,
  CreatorProfile,
  DanmakuItem,
  NotificationItem,
  PlayerState,
  ReplyItem,
  UploadDraft,
  VideoItem,
} from "../data/types";

export type ToastState = {
  message: string;
  severity: "success" | "info" | "error";
};

export type AppState = {
  likedVideoIds: string[];
  dislikedVideoIds: string[];
  favoriteVideoIds: string[];
  watchLaterVideoIds: string[];
  historyVideoIds: string[];
  hiddenVideoIds: string[];
  followedCreatorIds: string[];
  comments: CommentItem[];
  replies: ReplyItem[];
  danmakus: DanmakuItem[];
  notifications: NotificationItem[];
  collections: CollectionItem[];
  draft: UploadDraft;
  player: PlayerState;
  toast: ToastState | null;
};

export type AppAction =
  | { type: "showToast"; message: string; severity?: ToastState["severity"] }
  | { type: "closeToast" }
  | { type: "updatePlayer"; patch: Partial<PlayerState> }
  | { type: "visitVideo"; videoId: string }
  | { type: "toggleLike"; video: VideoItem }
  | { type: "toggleDislike"; video: VideoItem }
  | { type: "toggleFavorite"; video: VideoItem }
  | { type: "toggleWatchLater"; video: VideoItem }
  | { type: "toggleFollow"; creator: CreatorProfile }
  | { type: "addComment"; videoId: string; body: string }
  | { type: "deleteComment"; commentId: string }
  | { type: "addReply"; commentId: string; body: string }
  | { type: "deleteReply"; replyId: string }
  | { type: "addDanmaku"; video: VideoItem; body: string }
  | { type: "markNotificationRead"; notificationId: string }
  | { type: "markAllNotificationsRead" }
  | { type: "updateDraft"; key: keyof UploadDraft; value: string }
  | { type: "resetDraft" }
  | { type: "uploadSuccess" }
  | { type: "hideVideo"; video: VideoItem }
  | { type: "reportVideo"; video: VideoItem };

export const initialCommunityState: AppState = {
  likedVideoIds: ["video-02", "video-07"],
  dislikedVideoIds: [],
  favoriteVideoIds: ["video-01", "video-03", "video-11"],
  watchLaterVideoIds: ["video-05", "video-10"],
  historyVideoIds: ["video-01", "video-02", "video-07"],
  hiddenVideoIds: [],
  followedCreatorIds: ["creator-02", "creator-05"],
  comments,
  replies,
  danmakus,
  notifications,
  collections,
  draft: draftUpload,
  player: initialPlayerState,
  toast: null,
};

export function formatSeconds(value: number) {
  const minutes = Math.floor(value / 60).toString().padStart(2, "0");
  const seconds = Math.floor(value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

export function communityReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case "showToast":
      return { ...state, toast: { message: action.message, severity: action.severity ?? "success" } };
    case "closeToast":
      return { ...state, toast: null };
    case "updatePlayer":
      return {
        ...state,
        player: { ...state.player, ...action.patch },
        toast:
          action.patch.fullscreen !== undefined
            ? { message: "已模拟切换全屏状态", severity: "info" }
            : state.toast,
      };
    case "visitVideo":
      return {
        ...state,
        historyVideoIds: [action.videoId, ...state.historyVideoIds.filter((id) => id !== action.videoId)].slice(0, 12),
      };
    case "toggleLike": {
      const liked = state.likedVideoIds.includes(action.video.id);
      return {
        ...state,
        likedVideoIds: liked
          ? state.likedVideoIds.filter((id) => id !== action.video.id)
          : [...state.likedVideoIds, action.video.id],
        dislikedVideoIds: state.dislikedVideoIds.filter((id) => id !== action.video.id),
        toast: { message: liked ? "已取消点赞" : `已点赞：${action.video.title}`, severity: "success" },
      };
    }
    case "toggleDislike": {
      const disliked = state.dislikedVideoIds.includes(action.video.id);
      return {
        ...state,
        dislikedVideoIds: disliked
          ? state.dislikedVideoIds.filter((id) => id !== action.video.id)
          : [...state.dislikedVideoIds, action.video.id],
        likedVideoIds: state.likedVideoIds.filter((id) => id !== action.video.id),
        toast: { message: disliked ? "已撤销点踩" : "已记录点踩反馈", severity: "info" },
      };
    }
    case "toggleFavorite": {
      const favorite = state.favoriteVideoIds.includes(action.video.id);
      return {
        ...state,
        favoriteVideoIds: favorite
          ? state.favoriteVideoIds.filter((id) => id !== action.video.id)
          : [...state.favoriteVideoIds, action.video.id],
        toast: { message: favorite ? "已取消收藏" : "已加入收藏", severity: "success" },
      };
    }
    case "toggleWatchLater": {
      const saved = state.watchLaterVideoIds.includes(action.video.id);
      return {
        ...state,
        watchLaterVideoIds: saved
          ? state.watchLaterVideoIds.filter((id) => id !== action.video.id)
          : [...state.watchLaterVideoIds, action.video.id],
        toast: { message: saved ? "已移出稍后看" : "已加入稍后看", severity: "success" },
      };
    }
    case "toggleFollow": {
      const followed = state.followedCreatorIds.includes(action.creator.id);
      return {
        ...state,
        followedCreatorIds: followed
          ? state.followedCreatorIds.filter((id) => id !== action.creator.id)
          : [...state.followedCreatorIds, action.creator.id],
        toast: { message: followed ? `已取消关注 ${action.creator.name}` : `已关注 ${action.creator.name}`, severity: "success" },
      };
    }
    case "addComment":
      return {
        ...state,
        comments: [
          {
            id: `comment-${Date.now()}`,
            videoId: action.videoId,
            author: profile.name,
            handle: profile.handle,
            body: action.body.trim(),
            date: "刚刚",
            likes: 0,
            owned: true,
          },
          ...state.comments,
        ],
        toast: { message: "评论已发布", severity: "success" },
      };
    case "deleteComment":
      return {
        ...state,
        comments: state.comments.filter((comment) => comment.id !== action.commentId),
        replies: state.replies.filter((reply) => reply.commentId !== action.commentId),
        toast: { message: "已删除自己的评论", severity: "info" },
      };
    case "addReply":
      return {
        ...state,
        replies: [
          ...state.replies,
          {
            id: `reply-${Date.now()}`,
            commentId: action.commentId,
            author: profile.name,
            handle: profile.handle,
            body: action.body.trim(),
            date: "刚刚",
            owned: true,
          },
        ],
        toast: { message: "回复已发布", severity: "success" },
      };
    case "deleteReply":
      return {
        ...state,
        replies: state.replies.filter((reply) => reply.id !== action.replyId),
        toast: { message: "已删除自己的回复", severity: "info" },
      };
    case "addDanmaku": {
      const timeSeconds = Math.round((state.player.progress / 100) * action.video.durationSeconds);
      return {
        ...state,
        danmakus: [
          ...state.danmakus,
          {
            id: `danmaku-${Date.now()}`,
            videoId: action.video.id,
            time: formatSeconds(timeSeconds),
            timeSeconds,
            body: action.body.trim(),
            date: "刚刚",
          },
        ],
        toast: { message: "弹幕已发送", severity: "success" },
      };
    }
    case "markNotificationRead":
      return {
        ...state,
        notifications: state.notifications.map((notification) =>
          notification.id === action.notificationId ? { ...notification, read: true } : notification,
        ),
      };
    case "markAllNotificationsRead":
      return {
        ...state,
        notifications: state.notifications.map((notification) => ({ ...notification, read: true })),
        toast: { message: "通知已全部标记为已读", severity: "success" },
      };
    case "updateDraft":
      return { ...state, draft: { ...state.draft, [action.key]: action.value } };
    case "resetDraft":
      return { ...state, draft: draftUpload, toast: { message: "投稿草稿已重置", severity: "info" } };
    case "uploadSuccess":
      return {
        ...state,
        draft: draftUpload,
        notifications: [
          {
            id: `notice-${Date.now()}`,
            type: "upload",
            title: "投稿已进入 mock 队列",
            body: "这是本地状态模拟，不会上传真实文件。",
            date: "刚刚",
            read: false,
          },
          ...state.notifications,
        ],
        toast: { message: "投稿成功，已加入本地 mock 队列", severity: "success" },
      };
    case "hideVideo":
      return {
        ...state,
        hiddenVideoIds: state.hiddenVideoIds.includes(action.video.id)
          ? state.hiddenVideoIds
          : [...state.hiddenVideoIds, action.video.id],
        toast: { message: "已减少类似内容推荐", severity: "info" },
      };
    case "reportVideo":
      return { ...state, toast: { message: "举报已记录到本地 mock 反馈", severity: "info" } };
    default:
      return state;
  }
}
