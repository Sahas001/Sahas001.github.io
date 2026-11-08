import TerminalWindow from "@/components/TerminalWindow";
import styles from "./About.module.css";

const spec = [
  { key: "role", value: "Computer engineer" },
  { key: "builds with", value: "React, Next.js, Go" },
  { key: "curious about", value: "Distributed systems, how things work under the hood" },
  { key: "off hours", value: "Books, music, classic films, Formula 1" },
  { key: "writes at", value: "this blog and phasethru.dev" },
];

export default function About() {
  return (
    <div className="container-wide">
      <div className={styles.grid}>
        <article className={styles.prose}>
          <h1 className={styles.title}>About</h1>
          <p>
            I got into programming because I wanted to build things I could actually use, and it
            stuck. I like writing code that does what it&apos;s supposed to without being clever
            about it.
          </p>
          <p>
            Most of my work lives in the React and Next.js world, but I spend a decent amount of
            time with Go and lower-level stuff too. I care about how things work under the hood,
            which is usually what the blog ends up being about.
          </p>
          <p>Outside of code: books, music, classic films, and F1.</p>
          <p>
            The fastest way to reach me is{" "}
            <a href="mailto:sahastimilsina@gmail.com">sahastimilsina@gmail.com</a>.
          </p>
        </article>

        <aside className={styles.aside}>
          <TerminalWindow title="cat ~/.profile">
            <dl className={styles.spec}>
              {spec.map((row) => (
                <div key={row.key} className={styles.specRow}>
                  <dt>{row.key}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>
            <div className={styles.cursorLine}>
              <span>~$</span>
              <span className="terminal-cursor" aria-hidden="true" />
            </div>
          </TerminalWindow>
        </aside>
      </div>
    </div>
  );
}
