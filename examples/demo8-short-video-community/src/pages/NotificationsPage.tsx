import { Box, Button, Chip, List, ListItemButton, ListItemText, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ContentContainer, PageFrame } from "../components/AppShell";
import { Stack } from "../components/Stack";
import type { CommunityPageProps } from "./pageTypes";

export function NotificationsPage({ appState, dispatch }: CommunityPageProps) {
  const unread = appState.notifications.filter((item) => !item.read).length;
  const navigate = useNavigate();
  return (
    <PageFrame>
      <ContentContainer compact>
        <Box sx={{ py: { xs: "var(--spacing-4)", sm: "var(--spacing-6)" } }}>
          <Stack direction={{ xs: "column", sm: "row" }} justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} gap="var(--spacing-3)" sx={{ mb: "var(--spacing-4)" }}>
            <Box>
              <Typography component="h1" sx={{ m: 0, fontSize: "var(--font-size-display)", fontWeight: "var(--font-weight-brand)" }}>
                通知
              </Typography>
              <Typography sx={{ color: "var(--color-text-muted)" }}>{unread} 条未读通知</Typography>
            </Box>
            <Button variant="outlined" disabled={!unread} onClick={() => dispatch({ type: "markAllNotificationsRead" })}>全部已读</Button>
          </Stack>
          <Paper elevation={0} sx={{ borderRadius: "var(--radius-card)", border: "1px solid var(--color-border-subtle)", bgcolor: "var(--color-surface-card)", overflow: "hidden" }}>
            <List disablePadding aria-label="通知列表">
              {appState.notifications.map((item) => (
                <ListItemButton
                  key={item.id}
                  divider
                  selected={!item.read}
                  onClick={() => {
                    dispatch({ type: "markNotificationRead", notificationId: item.id });
                    if (item.videoId) navigate(`/video/${item.videoId}`);
                  }}
                >
                  <ListItemText
                    primary={<Stack direction="row" alignItems="center" gap="var(--spacing-2)"><Typography component="span" sx={{ fontWeight: "var(--font-weight-semibold)" }}>{item.title}</Typography>{!item.read ? <Chip label="未读" color="primary" size="small" /> : null}</Stack>}
                    secondary={`${item.body} · ${item.date}`}
                  />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        </Box>
      </ContentContainer>
    </PageFrame>
  );
}
