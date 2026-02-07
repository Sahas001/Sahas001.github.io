"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";

type Command = {
  label: string;
  href: string;
};

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");

  const commands: Command[] = [
    { label: "Home", href: "/" },
    { label: "About", href: "/?tab=about" },
    { label: "Projects", href: "/?tab=projects" },
    { label: "Blog", href: "/blog" },
  ];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      if (!open) return;
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % Math.max(filtered.length, 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + Math.max(filtered.length, 1)) % Math.max(filtered.length, 1));
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = filtered[active];
        if (target) {
          setOpen(false);
          setQuery("");
          router.push(target.href);
        }
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, filtered, open, router]);

  if (!open) return null;

  return (
    <div className="cmdk-backdrop" role="dialog" aria-modal="true">
      <div className="cmdk-panel">
        <div className="cmdk-header">
          <span className="cmdk-prompt">~$</span>
          <input
            className="cmdk-input"
            placeholder="Type a command..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            autoFocus
          />
        </div>
        <div className="cmdk-list">
          {filtered.length === 0 ? (
            <div className="cmdk-empty">No matches</div>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.href}
                className={`cmdk-item ${idx === active ? "cmdk-active" : ""}`}
                onClick={() => {
                  setOpen(false);
                  setQuery("");
                  router.push(cmd.href);
                }}
              >
                {cmd.label}
              </button>
            ))
          )}
        </div>
        <div className="cmdk-hint">Press Esc to close • Enter to select</div>
      </div>
    </div>
  );
}
