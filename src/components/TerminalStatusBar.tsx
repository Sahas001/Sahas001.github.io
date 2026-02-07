"use client";

import { usePathname, useSearchParams } from "next/navigation";

export default function TerminalStatusBar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const tab = params.get("tab");
  const section = pathname.startsWith("/blog") ? "blog" : tab || "home";

  return (
    <div className="terminal-status">
      <span className="terminal-status-label">status</span> active
      <span className="terminal-status-sep">|</span>
      <span className="terminal-status-label">section</span> {section}
      <span className="terminal-status-sep">|</span>
      <span className="terminal-status-label">mode</span> interactive
      <span className="terminal-status-sep">|</span>
      <span className="terminal-status-label">cmd</span> Ctrl+K
      <span className="terminal-status-sep terminal-status-nav">|</span>
      <span className="terminal-status-label terminal-status-nav">nav</span>
      <span className="terminal-status-nav"> h/l</span>
    </div>
  );
}
