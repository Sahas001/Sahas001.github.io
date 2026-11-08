"use client";

import { useState, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function TerminalStatusBar() {
  const pathname = usePathname();
  const tab = useSearchParams().get("tab");
  const section = pathname.startsWith("/blog") ? "blog" : tab || "home";

  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");
  const uptime = `${pad(Math.floor(elapsed / 3600))}:${pad(Math.floor((elapsed % 3600) / 60))}:${pad(elapsed % 60)}`;

  return (
    <div className="status-chip" aria-hidden="true">
      <span className="status-pulse" />
      <b>{section}</b>
      <span className="sep">/</span>
      <span>up {uptime}</span>
      <span className="sep">/</span>
      <span>
        <kbd>h</kbd> <kbd>l</kbd> to move
      </span>
    </div>
  );
}
