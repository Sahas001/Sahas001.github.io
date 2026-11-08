"use client";

import { useEffect, useMemo, useState, useCallback } from "react";
import { useRouter } from "next/navigation";

type Command = {
  label: string;
  href: string;
  kind: string;
};

const PAGES: Command[] = [
  { label: "Home", href: "/", kind: "page" },
  { label: "Projects", href: "/?tab=projects", kind: "page" },
  { label: "About", href: "/?tab=about", kind: "page" },
  { label: "Blog", href: "/blog", kind: "page" },
  { label: "Phasethru", href: "https://phasethru.dev", kind: "external" },
  { label: "GitHub", href: "https://github.com/Sahas001", kind: "external" },
];

export default function CommandPalette({ posts = [] }: { posts?: { label: string; href: string }[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [query, setQuery] = useState("");
  // Where focus goes back to when the palette closes.
  const [returnFocusTo, setReturnFocusTo] = useState<HTMLElement | null>(null);

  const commands = useMemo(
    () => [...PAGES, ...posts.map((p) => ({ ...p, kind: "post" }))],
    [posts],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return commands;
    return commands.filter((c) => c.label.toLowerCase().includes(q));
  }, [commands, query]);

  const handleClose = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActive(0);
    returnFocusTo?.focus();
  }, [returnFocusTo]);

  const handleOpen = useCallback(() => {
    setReturnFocusTo(document.activeElement as HTMLElement | null);
    setOpen(true);
  }, []);

  const go = useCallback(
    (cmd: Command) => {
      handleClose();
      if (cmd.href.startsWith("http")) {
        window.open(cmd.href, "_blank", "noopener,noreferrer");
      } else {
        router.push(cmd.href);
      }
    },
    [handleClose, router],
  );

  useEffect(() => {
    window.addEventListener("open-command-palette", handleOpen);
    return () => window.removeEventListener("open-command-palette", handleOpen);
  }, [handleOpen]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (open) handleClose();
        else handleOpen();
        return;
      }
      if (!open) return;
      const n = Math.max(filtered.length, 1);
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        setActive((i) => (i + 1) % n);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setActive((i) => (i - 1 + n) % n);
      } else if (e.key === "Enter") {
        e.preventDefault();
        const target = filtered[active];
        if (target) go(target);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, filtered, go, handleClose, handleOpen, open]);

  if (!open) return null;

  return (
    <div
      className="cmdk-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Command palette"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div className="cmdk-panel">
        <div className="cmdk-header">
          <span className="cmdk-prompt">~$</span>
          <input
            className="cmdk-input"
            aria-label="Search pages and posts"
            placeholder="Jump to a page or post"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(0);
            }}
            autoFocus
          />
        </div>
        <div className="cmdk-list" role="listbox" aria-label="Results">
          {filtered.length === 0 ? (
            <div className="cmdk-empty">Nothing matches &ldquo;{query}&rdquo;. Try a page name or a post title.</div>
          ) : (
            filtered.map((cmd, idx) => (
              <button
                key={cmd.href}
                type="button"
                role="option"
                aria-selected={idx === active}
                className={`cmdk-item ${idx === active ? "cmdk-active" : ""}`}
                onMouseEnter={() => setActive(idx)}
                onClick={() => go(cmd)}
              >
                <span>{cmd.label}</span>
                <small>{cmd.kind}</small>
              </button>
            ))
          )}
        </div>
        <div className="cmdk-hint">↑↓ to move, Enter to open, Esc to close</div>
      </div>
    </div>
  );
}
