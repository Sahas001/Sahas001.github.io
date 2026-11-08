"use client";

import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import Wordmark from "./Wordmark";
import styles from "./SiteHeader.module.css";

export const navItems = [
  { name: "home", label: "Home", href: "/" },
  { name: "projects", label: "Projects", href: "/?tab=projects" },
  { name: "about", label: "About", href: "/?tab=about" },
  { name: "blog", label: "Blog", href: "/blog" },
];

export function openCommandPalette() {
  window.dispatchEvent(new Event("open-command-palette"));
}

export default function SiteHeader() {
  const pathname = usePathname();
  const params = useSearchParams();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [hint, setHint] = useState("Ctrl K");

  const tab = params.get("tab");
  const active = pathname.startsWith("/blog")
    ? "blog"
    : pathname === "/"
      ? navItems.some((i) => i.name === tab) ? tab : "home"
      : null;

  useEffect(() => {
    if (navigator.platform.toLowerCase().includes("mac")) setHint("⌘K");
  }, []);

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname, tab]);

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
        <Wordmark />
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
          onClick={() => setMenuOpen((o) => !o)}
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
