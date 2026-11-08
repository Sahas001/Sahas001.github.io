import TerminalWindow from "@/components/TerminalWindow";
import PageHeader from "@/components/PageHeader";
import styles from "./About.module.css";

const spec = [
  { key: "role", value: "Computer engineer" },
  { key: "builds with", value: "React, Next.js, Go" },
  { key: "learning", value: "Deep learning, LLMs, agents" },
  { key: "curious about", value: "Distributed systems, how things work under the hood" },
  { key: "registered", value: "Nepal Engineering Council, no. 89492" },
  { key: "off hours", value: "Books, music, classic films, Formula 1" },
  { key: "writes at", value: "this blog and phasethru.dev" },
];

export default function About() {
  return (
    <div className="container-wide">
      <PageHeader title="About">Who I am, what I work on, and where I&apos;m heading.</PageHeader>
      <div className={styles.grid}>
        <article className={styles.prose}>
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
          <p>
            Lately I&apos;ve been steering toward AI and deep learning. I&apos;ve finished the Deep
            Learning Specialization along with courses on TensorFlow and on generative AI with large
            language models, and I&apos;m building on that next.
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
