import { useReducer } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Navigation } from "./components/Navigation";
import { Toast } from "./components/Toast";
import { communityReducer, initialCommunityState } from "./state/communityReducer";
import { CreatorProfilePage, CreatorsPage, MePage } from "./pages/CreatorsPage";
import { ExplorePage } from "./pages/ExplorePage";
import { FeedPage } from "./pages/FeedPage";
import { HomePage } from "./pages/HomePage";
import { LibraryPage } from "./pages/LibraryPage";
import { NotificationsPage } from "./pages/NotificationsPage";
import { TopicPage } from "./pages/TopicPage";
import { UploadPage } from "./pages/UploadPage";
import { VideoDetailPage } from "./pages/VideoDetailPage";

function AppRoutes() {
  const [appState, dispatch] = useReducer(communityReducer, initialCommunityState);
  const unreadCount = appState.notifications.filter((notification) => !notification.read).length;

  return (
    <>
      <Navigation unreadCount={unreadCount} />
      <Routes>
        <Route path="/" element={<HomePage appState={appState} dispatch={dispatch} />} />
        <Route path="/explore" element={<ExplorePage appState={appState} dispatch={dispatch} />} />
        <Route path="/feed" element={<FeedPage appState={appState} dispatch={dispatch} />} />
        <Route path="/video/:id" element={<VideoDetailPage appState={appState} dispatch={dispatch} />} />
        <Route path="/creators" element={<CreatorsPage appState={appState} dispatch={dispatch} />} />
        <Route path="/creator/:creatorId" element={<CreatorProfilePage appState={appState} dispatch={dispatch} />} />
        <Route path="/me" element={<MePage appState={appState} dispatch={dispatch} />} />
        <Route path="/notifications" element={<NotificationsPage appState={appState} dispatch={dispatch} />} />
        <Route path="/upload" element={<UploadPage appState={appState} dispatch={dispatch} />} />
        <Route path="/history" element={<LibraryPage kind="history" appState={appState} dispatch={dispatch} />} />
        <Route path="/collections" element={<LibraryPage kind="collections" appState={appState} dispatch={dispatch} />} />
        <Route path="/topics/:topicId" element={<TopicPage appState={appState} dispatch={dispatch} />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <Toast toast={appState.toast} onClose={() => dispatch({ type: "closeToast" })} />
    </>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
