import { Box, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { useMemo, useState } from "react";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { CategoryTabs } from "../components/CategoryTabs";
import { MediaFeedSection } from "../components/MediaFeedSection";
import { Stack } from "../components/Stack";
import { categories, topics } from "../data/mock";
import { visibleVideos } from "../data/selectors";
import type { CommunityPageProps } from "./pageTypes";

export function ExplorePage({ appState, dispatch }: CommunityPageProps) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [topic, setTopic] = useState("all");
  const [sort, setSort] = useState("newest");

  const items = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    const next = visibleVideos(appState).filter((video) => {
      const matchesCategory = category === "all" || video.category === category;
      const matchesTopic = topic === "all" || video.topicIds.includes(topic);
      const matchesQuery =
        !normalized ||
        [video.title, video.description, video.tags.join(" ")].some((text) => text.toLowerCase().includes(normalized));
      return matchesCategory && matchesTopic && matchesQuery;
    });
    if (sort === "likes") return [...next].sort((a, b) => b.likes - a.likes);
    if (sort === "duration") return [...next].sort((a, b) => a.durationSeconds - b.durationSeconds);
    return next;
  }, [appState, category, query, sort, topic]);

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ display: "grid", gap: "var(--spacing-4)", py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <TextField label="搜索标题、简介或标签" value={query} onChange={(event) => setQuery(event.target.value)} />
          <CategoryTabs items={categories} value={category} onChange={setCategory} />
          <Stack direction={{ xs: "column", md: "row" }} gap="var(--spacing-3)">
            <FormControl fullWidth>
              <InputLabel id="topic-filter-label">话题</InputLabel>
              <Select labelId="topic-filter-label" label="话题" value={topic} onChange={(event: SelectChangeEvent) => setTopic(event.target.value)}>
                <MenuItem value="all">全部话题</MenuItem>
                {topics.map((item) => (
                  <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl fullWidth>
              <InputLabel id="sort-filter-label">排序</InputLabel>
              <Select labelId="sort-filter-label" label="排序" value={sort} onChange={(event: SelectChangeEvent) => setSort(event.target.value)}>
                <MenuItem value="newest">最新</MenuItem>
                <MenuItem value="likes">点赞最多</MenuItem>
                <MenuItem value="duration">时长最短</MenuItem>
              </Select>
            </FormControl>
          </Stack>
          <MediaFeedSection title="探索结果" items={items} viewState={items.length ? "ready" : "empty"} appState={appState} dispatch={dispatch} />
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}
