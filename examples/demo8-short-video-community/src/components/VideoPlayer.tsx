import {
  Box,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { Maximize2, MessageCircle, Pause, Play, Volume2, VolumeX } from "lucide-react";
import { coverBackgrounds } from "../data/selectors";
import type { DanmakuItem, VideoItem } from "../data/types";
import type { AppAction, AppState } from "../state/communityReducer";
import { formatSeconds } from "../state/communityReducer";
import { Stack } from "./Stack";

export function VideoPlayerStage({
  video,
  appState,
  dispatch,
}: {
  video: VideoItem;
  appState: AppState;
  dispatch: React.Dispatch<AppAction>;
}) {
  const { player } = appState;
  const currentTime = formatSeconds((player.progress / 100) * video.durationSeconds);
  const videoDanmakus = appState.danmakus.filter((item) => item.videoId === video.id);

  const updateSelect = (key: "quality" | "speed") => (event: SelectChangeEvent) => {
    dispatch({ type: "updatePlayer", patch: { [key]: event.target.value } });
  };

  return (
    <Paper
      elevation={0}
      sx={{
        overflow: "hidden",
        borderRadius: "var(--radius-card)",
        border: "1px solid var(--color-border-subtle)",
        bgcolor: "var(--color-surface-card)",
        boxShadow: "var(--shadow-card-soft)",
      }}
    >
      <Box
        role="img"
        aria-label={video.thumbnailAlt}
        sx={{
          position: "relative",
          aspectRatio: "16 / 9",
          minHeight: { xs: "180px", sm: "260px" },
          overflow: "hidden",
          background: coverBackgrounds[video.tone],
          "&::before": {
            content: '""',
            position: "absolute",
            inset: "14% 12% auto auto",
            width: "28%",
            aspectRatio: "1",
            borderRadius: "var(--radius-round)",
            border: "3px solid rgba(255,255,255,.72)",
          },
          "&::after": {
            content: '""',
            position: "absolute",
            left: "10%",
            bottom: "18%",
            width: "42%",
            height: "8px",
            borderRadius: "var(--radius-round)",
            background: "rgba(255,255,255,.72)",
            transform: "rotate(-4deg)",
          },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: "absolute",
            inset: 0,
            display: "grid",
            placeItems: "center",
            color: "rgba(255,255,255,.9)",
          }}
        >
          <IconButton
            aria-label={player.playing ? "暂停播放" : "开始播放"}
            onClick={() => dispatch({ type: "updatePlayer", patch: { playing: !player.playing } })}
            sx={{
              width: "64px",
              height: "64px",
              color: "var(--color-brand-primary)",
              bgcolor: "rgba(255,255,255,.82)",
              "&:hover": { bgcolor: "var(--color-brand-soft)" },
            }}
          >
            {player.playing ? <Pause size={28} /> : <Play size={28} />}
          </IconButton>
        </Box>
        {player.danmakuVisible ? <PlayerDanmakuOverlay items={videoDanmakus} /> : null}
      </Box>

      <Box sx={{ px: "var(--spacing-3)", pt: "var(--spacing-2)" }}>
        <Slider
          aria-label="播放进度"
          value={player.progress}
          min={0}
          max={100}
          onChange={(_, value) => dispatch({ type: "updatePlayer", patch: { progress: Array.isArray(value) ? value[0] : value } })}
          sx={{
            height: "4px",
            color: "var(--color-brand-primary)",
            "& .MuiSlider-thumb": { width: "12px", height: "12px" },
          }}
        />
      </Box>

      <Stack
        direction={{ xs: "column", md: "row" }}
        alignItems={{ xs: "stretch", md: "center" }}
        justifyContent="space-between"
        gap="var(--spacing-2)"
        sx={{ px: "var(--spacing-3)", pb: "var(--spacing-3)" }}
      >
        <Stack direction="row" alignItems="center" gap="var(--spacing-1)" flexWrap="wrap">
          <Tooltip title={player.playing ? "暂停" : "播放"}>
            <IconButton aria-label={player.playing ? "暂停" : "播放"} onClick={() => dispatch({ type: "updatePlayer", patch: { playing: !player.playing } })}>
              {player.playing ? <Pause size={18} /> : <Play size={18} />}
            </IconButton>
          </Tooltip>
          <Typography sx={{ color: "var(--color-text-muted)", minWidth: "92px" }}>
            {currentTime} / {video.duration}
          </Typography>
          <Tooltip title={player.danmakuVisible ? "隐藏弹幕" : "显示弹幕"}>
            <IconButton aria-label={player.danmakuVisible ? "隐藏弹幕" : "显示弹幕"} color={player.danmakuVisible ? "primary" : "default"} onClick={() => dispatch({ type: "updatePlayer", patch: { danmakuVisible: !player.danmakuVisible } })}>
              <MessageCircle size={18} />
            </IconButton>
          </Tooltip>
        </Stack>

        <Stack direction="row" alignItems="center" gap="var(--spacing-2)" flexWrap="wrap">
          <FormControl size="small" sx={{ minWidth: "96px" }}>
            <InputLabel id="quality-label">清晰度</InputLabel>
            <Select labelId="quality-label" label="清晰度" value={player.quality} onChange={updateSelect("quality")}>
              <MenuItem value="480P">480P</MenuItem>
              <MenuItem value="720P">720P</MenuItem>
              <MenuItem value="1080P">1080P</MenuItem>
            </Select>
          </FormControl>
          <FormControl size="small" sx={{ minWidth: "88px" }}>
            <InputLabel id="speed-label">倍速</InputLabel>
            <Select labelId="speed-label" label="倍速" value={player.speed} onChange={updateSelect("speed")}>
              <MenuItem value="0.75x">0.75x</MenuItem>
              <MenuItem value="1.0x">1.0x</MenuItem>
              <MenuItem value="1.25x">1.25x</MenuItem>
              <MenuItem value="1.5x">1.5x</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" alignItems="center" gap="var(--spacing-1)" sx={{ width: { xs: "136px", sm: "160px" } }}>
            {player.volume ? <Volume2 size={17} /> : <VolumeX size={17} />}
            <Slider
              aria-label="音量"
              size="small"
              value={player.volume}
              min={0}
              max={100}
              onChange={(_, value) => dispatch({ type: "updatePlayer", patch: { volume: Array.isArray(value) ? value[0] : value } })}
            />
          </Stack>
          <Tooltip title="模拟全屏">
            <IconButton aria-label="模拟全屏" onClick={() => dispatch({ type: "updatePlayer", patch: { fullscreen: !player.fullscreen } })}>
              <Maximize2 size={18} />
            </IconButton>
          </Tooltip>
        </Stack>
      </Stack>
    </Paper>
  );
}

function PlayerDanmakuOverlay({ items }: { items: DanmakuItem[] }) {
  return (
    <Box aria-hidden="true" sx={{ position: "absolute", inset: "12% 0 auto", pointerEvents: "none", overflow: "hidden" }}>
      {items.slice(0, 4).map((item, index) => (
        <Typography
          key={item.id}
          sx={{
            display: "inline-block",
            position: "absolute",
            top: `calc(var(--spacing-3) * ${index + 1})`,
            whiteSpace: "nowrap",
            color: "rgba(34,32,36,.82)",
            bgcolor: "rgba(255,255,255,.58)",
            borderRadius: "var(--radius-badge)",
            px: "var(--spacing-2)",
            py: "var(--spacing-1)",
            animation: "demo8-danmaku-float var(--motion-duration-danmaku) linear infinite",
            animationDelay: `${index * -1.2}s`,
          }}
        >
          {item.body}
        </Typography>
      ))}
    </Box>
  );
}
