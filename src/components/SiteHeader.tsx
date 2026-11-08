"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import LogoMark from "./LogoMark";
import styles from "./SiteHeader.module.css";

export const navItems = [
  { name: "home", label: "Home", href: "/" },
  { name: "projects", label: "Projects", href: "/?tab=projects" },
  { name: "about", label: "About", href: "/?tab=about" },
  { name: "blog", label: "Blog", href: "/blog" },
];

const noopSubscribe = () => () => {};
const isMac = () => navigator.platform.toLowerCase().includes("mac");

export function openCommandPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export default function SiteHeader() {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  // Ctrl K on the server and non-Mac clients, ⌘K on Macs.
  const hint = useSyncExternalStore(noopSubscribe, () => (isMac() ? "⌘K" : "Ctrl K"), () => "Ctrl K");

  const tab = params.get("tab");

  // A terminal path for the current page: ~, ~/projects, ~/blog/some-post …
  const path =
    pathname === "/"
      ? tab && tab !== "home" && navItems.some((i) => i.name === tab)
        ? `~/${tab}`
        : "~"
      : `~${pathname}`;

  // The menu remembers which route it was opened on, so navigating closes it.
  const routeKey = `${pathname}?${tab ?? ""}`;
  const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null);
  const menuOpen = menuOpenOn === routeKey;
  const active = pathname.startsWith("/blog")
    ? "blog"
    : pathname === "/"
      ? navItems.some((i) => i.name === tab) ? tab : "home"
      : null;

  // h / l cycles through the sections, vim style.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.ctrlKey || e.metaKey || e.altKey) return;
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        (e.target instanceof HTMLElement && e.target.isContentEditable) ||
        document.querySelector('[role="dialog"]') !== null
      ) {
        return;
      }
      if (e.key !== "h" && e.key !== "l") return;
      e.preventDefault();
      const idx = Math.max(0, navItems.findIndex((i) => i.name === active));
      const next = (idx + (e.key === "l" ? 1 : -1) + navItems.length) % navItems.length;
      router.push(navItems[next].href);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, router]);

  return (
    <header className={styles.header}>
      <Link href="/" className={styles.logo} aria-label="Sahas Timilsina, home">
        <LogoMark />
        <span className={styles.path} aria-hidden="true">
          <span className={styles.pathText}>{path}</span>
          <span className={styles.pathPrompt}>$</span>
        </span>
      </Link>

      <nav aria-label="Primary" className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
        {navItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={styles.navLink}
            aria-current={active === item.name ? "page" : undefined}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div className={styles.actions}>
        <button
          type="button"
          className={styles.cmdBtn}
          onClick={openCommandPalette}
          aria-label="Open command palette"
        >
          <span className={styles.cmdPrompt}>~$</span>
          <kbd>{hint}</kbd>
        </button>
        <button
          type="button"
          className={styles.menuBtn}
          onClick={() => setMenuOpenOn(menuOpen ? null : routeKey)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
