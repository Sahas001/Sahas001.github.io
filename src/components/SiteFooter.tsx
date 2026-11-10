import Link from "next/link";
import { Suspense } from "react";
import TerminalStatusBar from "./TerminalStatusBar";
import styles from "./SiteFooter.module.css";

export const socials = [
  { label: "GitHub", href: "https://github.com/Sahas001" },
  { label: "LinkedIn", href: "https://linkedin.com/in/sahas001" },
  { label: "Instagram", href: "https://instagram.com/sahastimilsina" },
];

export default function SiteFooter() {
  return (
    <footer className={styles.footer}>
      <div className={styles.grid}>
        <div>
          <h2 className={styles.contactTitle}>Say hello</h2>
          <a href="mailto:sahastimilsina@gmail.com" className={styles.email}>
            sahastimilsina@gmail.com
          </a>
          <p className={styles.tagline}>
            I&apos;m always glad to talk about systems, machine learning, or something you&apos;re
            building.
          </p>
        </div>

        <div>
          <h2 className={styles.columnTitle}>Pages</h2>
          <Link href="/" className={styles.link}>Home</Link>
          <Link href="/?tab=projects" className={styles.link}>Projects</Link>
          <Link href="/?tab=about" className={styles.link}>About</Link>
          <Link href="/blog" className={styles.link}>Blog</Link>
        </div>

        <div>
          <h2 className={styles.columnTitle}>Elsewhere</h2>
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {s.label} ↗
            </a>
          ))}
          <a href="https://phasethru.dev" target="_blank" rel="noopener noreferrer" className={styles.link}>
            Phasethru ↗
          </a>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} Sahas Timilsina</span>
        <Suspense fallback={null}>
          <TerminalStatusBar />
        </Suspense>
      </div>
    </footer>
  );
}
