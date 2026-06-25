import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { Bookmark, BookmarkCheck, Heart, MessageCircle, Reply, Send, ThumbsDown, Trash2, UserPlus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { categories, topics } from "../data/mock";
import { getCreator } from "../data/selectors";
import type { VideoItem } from "../data/types";
import type { AppAction, AppState } from "../state/communityReducer";
import { Stack } from "./Stack";

export function InfoPanel({
  video,
  appState,
  dispatch,
}: {
  video: VideoItem;
  appState: AppState;
  dispatch: React.Dispatch<AppAction>;
}) {
  const navigate = useNavigate();
  const creator = getCreator(video.creatorId);
  const liked = appState.likedVideoIds.includes(video.id);
  const disliked = appState.dislikedVideoIds.includes(video.id);
  const favorite = appState.favoriteVideoIds.includes(video.id);
  const followed = appState.followedCreatorIds.includes(creator.id);
  const category = categories.find((item) => item.id === video.category);
  const videoTopics = topics.filter((item) => video.topicIds.includes(item.id));

  return (
    <Stack gap="var(--spacing-4)">
      <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
        <Stack gap="var(--spacing-3)">
          <Box>
            <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
              {video.title}
            </Typography>
            <Typography sx={{ mt: "var(--spacing-1)", color: "var(--color-text-muted)" }}>
              {video.views} 次观看 · {video.date} · {category?.label ?? "综合"}
            </Typography>
          </Box>
          <Typography>{video.description}</Typography>
          <Stack direction="row" flexWrap="wrap" gap="var(--spacing-1)">
            {video.tags.map((tag) => (
              <Chip key={tag} label={tag} size="small" />
            ))}
            {videoTopics.map((topic) => (
              <Chip key={topic.id} label={topic.label} size="small" color="primary" variant="outlined" onClick={() => navigate(`/topics/${topic.id}`)} />
            ))}
          </Stack>
          <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)">
            <Button variant={liked ? "contained" : "outlined"} startIcon={<Heart size={16} />} onClick={() => dispatch({ type: "toggleLike", video })}>
              {liked ? "已点赞" : "点赞"}
            </Button>
            <Button variant={disliked ? "contained" : "outlined"} startIcon={<ThumbsDown size={16} />} onClick={() => dispatch({ type: "toggleDislike", video })}>
              {disliked ? "已点踩" : "点踩"}
            </Button>
            <Button variant={favorite ? "contained" : "outlined"} startIcon={favorite ? <BookmarkCheck size={16} /> : <Bookmark size={16} />} onClick={() => dispatch({ type: "toggleFavorite", video })}>
              {favorite ? "已收藏" : "收藏"}
            </Button>
          </Stack>
        </Stack>
      </Paper>

      <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
        <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap="var(--spacing-3)">
          <Box>
            <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
              {creator.name}
            </Typography>
            <Typography sx={{ color: "var(--color-text-muted)" }}>{creator.handle} · {creator.followers} 关注者</Typography>
            <Typography sx={{ mt: "var(--spacing-1)" }}>{creator.bio}</Typography>
          </Box>
          <Stack direction="row" gap="var(--spacing-2)">
            <Button variant="outlined" onClick={() => navigate(`/creator/${creator.id}`)}>
              主页
            </Button>
            <Button variant={followed ? "contained" : "outlined"} startIcon={<UserPlus size={16} />} onClick={() => dispatch({ type: "toggleFollow", creator })}>
              {followed ? "已关注" : "关注"}
            </Button>
          </Stack>
        </Stack>
      </Paper>
    </Stack>
  );
}

export function CommentPanel({
  video,
  appState,
  dispatch,
}: {
  video: VideoItem;
  appState: AppState;
  dispatch: React.Dispatch<AppAction>;
}) {
  const [body, setBody] = useState("");
  const [replyBodies, setReplyBodies] = useState<Record<string, string>>({});
  const comments = appState.comments.filter((comment) => comment.videoId === video.id);

  const submitComment = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (body.trim().length < 2) {
      dispatch({ type: "showToast", message: "评论至少 2 个字", severity: "error" });
      return;
    }
    dispatch({ type: "addComment", videoId: video.id, body });
    setBody("");
  };

  return (
    <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
      <Stack gap="var(--spacing-3)">
        <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
          评论 {comments.length}
        </Typography>
        <Stack component="form" direction={{ xs: "column", sm: "row" }} gap="var(--spacing-2)" onSubmit={submitComment}>
          <TextField fullWidth label="写一条评论" value={body} onChange={(event) => setBody(event.target.value)} />
          <Button type="submit" variant="contained" startIcon={<Send size={16} />}>
            发布
          </Button>
        </Stack>
        <List disablePadding>
          {comments.map((comment) => {
            const replies = appState.replies.filter((replyItem) => replyItem.commentId === comment.id);
            const replyBody = replyBodies[comment.id] ?? "";
            return (
              <Box key={comment.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    comment.owned ? (
                      <IconButton aria-label="删除评论" onClick={() => dispatch({ type: "deleteComment", commentId: comment.id })}>
                        <Trash2 size={16} />
                      </IconButton>
                    ) : null
                  }
                  sx={{ px: 0 }}
                >
                  <ListItemText<"span", "div">
                    primary={`${comment.author} ${comment.handle}`}
                    slotProps={{ secondary: { component: "div" } }}
                    secondary={
                      <Stack gap="var(--spacing-2)" sx={{ mt: "var(--spacing-1)" }}>
                        <Typography component="span" sx={{ color: "var(--color-text-strong)" }}>{comment.body}</Typography>
                        <Typography component="span" sx={{ color: "var(--color-text-muted)", fontSize: "var(--font-size-small)" }}>
                          {comment.date} · {comment.likes} 喜欢
                        </Typography>
                        {replies.length ? (
                          <Stack gap="var(--spacing-1)" sx={{ pl: "var(--spacing-3)", borderLeft: "2px solid var(--color-brand-soft)" }}>
                            {replies.map((reply) => (
                              <Stack key={reply.id} direction="row" justifyContent="space-between" gap="var(--spacing-2)">
                                <Typography component="span" sx={{ color: "var(--color-text-muted)" }}>
                                  {reply.author}: {reply.body}
                                </Typography>
                                {reply.owned ? (
                                  <IconButton aria-label="删除回复" size="small" onClick={() => dispatch({ type: "deleteReply", replyId: reply.id })}>
                                    <Trash2 size={14} />
                                  </IconButton>
                                ) : null}
                              </Stack>
                            ))}
                          </Stack>
                        ) : null}
                        <Stack
                          component="form"
                          direction={{ xs: "column", sm: "row" }}
                          gap="var(--spacing-1)"
                          onSubmit={(event: FormEvent<HTMLFormElement>) => {
                            event.preventDefault();
                            if (replyBody.trim().length < 2) return;
                            dispatch({ type: "addReply", commentId: comment.id, body: replyBody });
                            setReplyBodies((current) => ({ ...current, [comment.id]: "" }));
                          }}
                        >
                          <TextField size="small" label="回复" value={replyBody} onChange={(event) => setReplyBodies((current) => ({ ...current, [comment.id]: event.target.value }))} />
                          <Button type="submit" startIcon={<Reply size={14} />}>
                            回复
                          </Button>
                        </Stack>
                      </Stack>
                    }
                  />
                </ListItem>
                <Divider />
              </Box>
            );
          })}
        </List>
      </Stack>
    </Paper>
  );
}

export function DanmakuPanel({
  video,
  appState,
  dispatch,
}: {
  video: VideoItem;
  appState: AppState;
  dispatch: React.Dispatch<AppAction>;
}) {
  const [body, setBody] = useState("");
  const rows = appState.danmakus.filter((item) => item.videoId === video.id).sort((a, b) => a.timeSeconds - b.timeSeconds);

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (body.trim().length < 2) {
      dispatch({ type: "showToast", message: "弹幕至少 2 个字", severity: "error" });
      return;
    }
    dispatch({ type: "addDanmaku", video, body });
    setBody("");
  };

  return (
    <Paper elevation={0} sx={{ p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)" }}>
      <Stack gap="var(--spacing-3)">
        <Stack direction="row" alignItems="center" justifyContent="space-between" gap="var(--spacing-2)">
          <Typography component="h2" sx={{ m: 0, fontSize: "var(--font-size-section)", fontWeight: "var(--font-weight-brand)" }}>
            弹幕回看
          </Typography>
          <Chip icon={<MessageCircle size={14} />} label={`${rows.length} 条`} size="small" />
        </Stack>
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small" aria-label="弹幕列表">
            <TableHead>
              <TableRow>
                <TableCell>时间</TableCell>
                <TableCell>内容</TableCell>
                <TableCell>发送</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row.id}>
                  <TableCell>{row.time}</TableCell>
                  <TableCell>{row.body}</TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
        <Stack
          component="form"
          direction={{ xs: "column", sm: "row" }}
          gap="var(--spacing-2)"
          onSubmit={submit}
          sx={{
            position: { xs: "sticky", sm: "static" },
            bottom: { xs: "calc(var(--size-nav-mobile) + var(--spacing-2))", sm: "auto" },
            zIndex: 2,
            p: { xs: "var(--spacing-2)", sm: 0 },
            borderRadius: "var(--radius-card)",
            bgcolor: { xs: "var(--color-surface-card)", sm: "transparent" },
          }}
        >
          <TextField fullWidth label="发送弹幕" value={body} onChange={(event) => setBody(event.target.value)} />
          <Button type="submit" variant="contained" startIcon={<Send size={16} />}>
            发送
          </Button>
        </Stack>
      </Stack>
    </Paper>
  );
}
