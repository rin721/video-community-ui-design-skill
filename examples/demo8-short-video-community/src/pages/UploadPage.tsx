import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import type { SelectChangeEvent } from "@mui/material/Select";
import { Upload } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { Stack } from "../components/Stack";
import { categories } from "../data/mock";
import type { UploadDraft } from "../data/types";
import type { CommunityPageProps } from "./pageTypes";

type UploadErrors = Partial<Record<keyof UploadDraft, string>>;

export function UploadPage({ appState, dispatch }: CommunityPageProps) {
  const [errors, setErrors] = useState<UploadErrors>({});
  const [dialogOpen, setDialogOpen] = useState(false);
  const draft = appState.draft;
  const updateDraft = (key: keyof UploadDraft, value: string) => {
    dispatch({ type: "updateDraft", key, value });
    setErrors((current) => ({ ...current, [key]: undefined }));
  };
  const validate = () => {
    const next: UploadErrors = {};
    if (draft.title.trim().length < 6) next.title = "标题至少 6 个字符";
    if (!draft.category) next.category = "请选择分类";
    if (draft.description.trim().length < 12) next.description = "简介至少 12 个字符";
    if (draft.tags.trim().length < 2) next.tags = "请填写至少一个标签";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Typography component="h1" sx={{ mb: "var(--spacing-2)", fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
            投稿中心
          </Typography>
          <Typography sx={{ mb: "var(--spacing-4)", color: "var(--color-text-muted)" }}>
            表单只写入本地 reducer，用来验证草稿、校验、确认弹窗和成功通知。
          </Typography>
          <Paper
            component="form"
            noValidate
            elevation={0}
            sx={{ display: "grid", gap: "var(--spacing-3)", p: "var(--spacing-4)", borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", boxShadow: "var(--shadow-card-soft)" }}
            onSubmit={(event: FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              if (!validate()) {
                dispatch({ type: "showToast", message: "请先修正投稿表单", severity: "error" });
                return;
              }
              setDialogOpen(true);
            }}
          >
            <TextField label="视频标题" value={draft.title} onChange={(event) => updateDraft("title", event.target.value)} error={Boolean(errors.title)} helperText={errors.title ?? "建议 12 到 28 个字，便于移动端扫描。"} required />
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr 1fr" }, gap: "var(--spacing-3)" }}>
              <FormControl error={Boolean(errors.category)}>
                <InputLabel id="upload-category-label">分类</InputLabel>
                <Select labelId="upload-category-label" label="分类" value={draft.category} onChange={(event: SelectChangeEvent) => updateDraft("category", event.target.value)}>
                  {categories.filter((item) => item.id !== "all").map((item) => (
                    <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="upload-source-label">来源</InputLabel>
                <Select labelId="upload-source-label" label="来源" value={draft.sourceType} onChange={(event: SelectChangeEvent) => updateDraft("sourceType", event.target.value)}>
                  <MenuItem value="original">原创</MenuItem>
                  <MenuItem value="repost">转载</MenuItem>
                </Select>
              </FormControl>
              <FormControl>
                <InputLabel id="upload-visibility-label">可见性</InputLabel>
                <Select labelId="upload-visibility-label" label="可见性" value={draft.visibility} onChange={(event: SelectChangeEvent) => updateDraft("visibility", event.target.value)}>
                  <MenuItem value="public">公开</MenuItem>
                  <MenuItem value="unlisted">仅链接可见</MenuItem>
                  <MenuItem value="private">私密</MenuItem>
                </Select>
              </FormControl>
            </Box>
            <TextField label="简介" value={draft.description} onChange={(event) => updateDraft("description", event.target.value)} error={Boolean(errors.description)} helperText={errors.description ?? "说明内容、标签和可替换素材来源。"} multiline minRows={4} required />
            <TextField label="标签" value={draft.tags} onChange={(event) => updateDraft("tags", event.target.value)} error={Boolean(errors.tags)} helperText={errors.tags ?? "用逗号分隔，例如：剪辑, 社区, 新手"} />
            <Stack direction="row" flexWrap="wrap" gap="var(--spacing-2)">
              <Button type="submit" variant="contained" startIcon={<Upload size={16} />}>模拟发布</Button>
              <Button type="button" variant="outlined" onClick={() => {
                setErrors({});
                dispatch({ type: "resetDraft" });
              }}>重置草稿</Button>
            </Stack>
          </Paper>
        </Box>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)} aria-labelledby="upload-success-title">
          <DialogTitle id="upload-success-title">投稿已模拟提交</DialogTitle>
          <DialogContent>
            <Typography>这个 demo 不会上传真实文件，但已经验证表单校验、提交确认、通知写入和成功 toast。</Typography>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)}>继续编辑</Button>
            <Button variant="contained" onClick={() => {
              setDialogOpen(false);
              dispatch({ type: "uploadSuccess" });
            }}>完成</Button>
          </DialogActions>
        </Dialog>
      </ContentContainer>
    </PageFrame>
  );
}
