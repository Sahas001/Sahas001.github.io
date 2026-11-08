import styles from "./Wordmark.module.css";

type WordmarkProps = {
  size?: "sm" | "xl";
  variant?: "ink" | "light";
  className?: string;
};

/**
 * SAHAS (solid, chromatic split) / TIMILSINA (hollow outline).
 * A sibling of the PHASE/THRU wordmark on phasethru.dev.
 */
export default function Wordmark({ size = "sm", variant = "ink", className = "" }: WordmarkProps) {
  return (
    <span
      className={[styles.wrapper, styles[size], variant === "light" ? styles.light : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      <span className={styles.solid}>Sahas</span>
      <span className={styles.hollow}>Timilsina</span>
    </span>
  );
}
