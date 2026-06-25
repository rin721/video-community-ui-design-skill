import type { Dispatch } from "react";
import type { AppAction, AppState } from "../state/communityReducer";

export type CommunityPageProps = {
  appState: AppState;
  dispatch: Dispatch<AppAction>;
};
