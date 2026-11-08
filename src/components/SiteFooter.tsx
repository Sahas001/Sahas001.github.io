import Link from "next/link";
import Wordmark from "./Wordmark";
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
          <Link href="/" className={styles.brand} aria-label="Sahas Timilsina, home">
            <Wordmark variant="light" />
          </Link>
          <p className={styles.tagline}>
            Building things and figuring out how they work. Longer writing lives on{" "}
            <a href="https://phasethru.dev" target="_blank" rel="noopener noreferrer">
              Phasethru
            </a>
            .
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
          <a href="mailto:sahastimilsina@gmail.com" className={styles.link}>
            sahastimilsina@gmail.com
          </a>
        </div>
      </div>

      <div className={styles.bottomBar}>
        <span>© {new Date().getFullYear()} Sahas Timilsina</span>
        <span>
          <span className={styles.prompt}>~$</span> exit 0
        </span>
      </div>
    </footer>
  );
}
