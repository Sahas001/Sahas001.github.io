import type { ReactNode } from "react";
import styles from "./PageHeader.module.css";

/** The same title block on every top-level page: big title, one-line intro, ink rule. */
export default function PageHeader({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>{title}</h1>
      {children && <p className={styles.intro}>{children}</p>}
    </header>
  );
}
