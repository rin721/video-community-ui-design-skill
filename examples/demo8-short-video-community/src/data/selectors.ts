import { creators, videos } from "./mock";
import type { AppState } from "../state/communityReducer";
import type { CreatorProfile, VideoItem, VideoTone } from "./types";

export const coverBackgrounds: Record<VideoTone, string> = {
  rose:
    "linear-gradient(135deg, rgba(255,255,255,.5) 0 18%, transparent 18% 30%, rgba(255,255,255,.32) 30% 38%, transparent 38%), linear-gradient(145deg, #ffc9d7, #f06e8e 54%, #9fd2ec)",
  mint:
    "linear-gradient(135deg, rgba(255,255,255,.46) 0 16%, transparent 16% 28%, rgba(255,255,255,.28) 28% 36%, transparent 36%), linear-gradient(145deg, #b8eadf, #72cbb8 48%, #f9c4d4)",
  gold:
    "linear-gradient(135deg, rgba(255,255,255,.48) 0 17%, transparent 17% 28%, rgba(255,255,255,.3) 28% 36%, transparent 36%), linear-gradient(145deg, #ffe0a6, #f4b95f 48%, #f5a9c0)",
  sky:
    "linear-gradient(135deg, rgba(255,255,255,.5) 0 18%, transparent 18% 30%, rgba(255,255,255,.32) 30% 38%, transparent 38%), linear-gradient(145deg, #b7dcf4, #86bce7 48%, #f4adc5)",
  violet:
    "linear-gradient(135deg, rgba(255,255,255,.5) 0 18%, transparent 18% 30%, rgba(255,255,255,.32) 30% 38%, transparent 38%), linear-gradient(145deg, #d8c9f6, #b79ae8 48%, #f0a9c4)",
  mono:
    "linear-gradient(135deg, rgba(255,255,255,.45) 0 17%, transparent 17% 30%, rgba(255,255,255,.26) 30% 38%, transparent 38%), linear-gradient(145deg, #ded9dc, #9f969d 52%, #f4c1d0)",
};

export function getCreator(creatorId: string): CreatorProfile {
  return creators.find((creator) => creator.id === creatorId) ?? creators[0];
}

export function visibleVideos(state: AppState): VideoItem[] {
  return videos.filter((video) => !state.hiddenVideoIds.includes(video.id));
}

export function videosByIds(ids: string[]): VideoItem[] {
  return ids.map((id) => videos.find((video) => video.id === id)).filter((video): video is VideoItem => Boolean(video));
}
