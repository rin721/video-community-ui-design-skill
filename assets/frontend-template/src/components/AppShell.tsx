import type { ReactNode } from "react";
import { Navigation } from "./Navigation";

type AppShellProps = {
  children: ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Navigation />
      <div className="app-shell__content">{children}</div>
    </div>
  );
}
