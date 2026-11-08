import type { ReactNode } from "react";
import styles from "./TerminalWindow.module.css";

type TerminalWindowProps = {
  title: string;
  children: ReactNode;
  className?: string;
};

/** A dark terminal window set on the paper page, with a hard offset shadow. */
export default function TerminalWindow({ title, children, className = "" }: TerminalWindowProps) {
  return (
    <div className={`${styles.window} ${className}`}>
      <div className={styles.bar}>
        <span className={`${styles.dot} ${styles.red}`} />
        <span className={`${styles.dot} ${styles.yellow}`} />
        <span className={`${styles.dot} ${styles.green}`} />
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.body}>{children}</div>
    </div>
  );
}
