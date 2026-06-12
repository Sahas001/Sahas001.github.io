"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TerminalStatusBar() {
  const pathname = usePathname();
  const params = useSearchParams();
  const tab = params.get("tab");
  const section = pathname.startsWith("/blog") ? "blog" : tab || "home";

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const hrs = String(Math.floor(elapsed / 3600)).padStart(2, "0");
  const mins = String(Math.floor((elapsed % 3600) / 60)).padStart(2, "0");
  const secs = String(elapsed % 60).padStart(2, "0");
  const uptime = `${hrs}:${mins}:${secs}`;

  return (
    <div className="terminal-status">
      <span className="terminal-status-label">status</span>{" "}
      <span className="status-pulse inline-block h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />{" "}
      active
      <span className="terminal-status-sep">|</span>
      <span className="terminal-status-label">section</span> {section}
      <span className="terminal-status-sep">|</span>
      <span className="terminal-status-label">uptime</span> {uptime}
      <span className="terminal-status-sep">|</span>
      <span className="terminal-status-label">cmd</span> Ctrl+K
      <span className="terminal-status-sep terminal-status-nav">|</span>
      <span className="terminal-status-label terminal-status-nav">nav</span>
      <span className="terminal-status-nav"> h/l</span>
    </div>
  );
}
