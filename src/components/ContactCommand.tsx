"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styles from "./ContactCommand.module.css";

type Output = string | string[] | { href: string; text: string };

const RESPONSES: Record<string, Output> = {
  contact: { href: "mailto:sahastimilsina@gmail.com", text: "sahastimilsina@gmail.com" },
  email: { href: "mailto:sahastimilsina@gmail.com", text: "sahastimilsina@gmail.com" },
  github: { href: "https://github.com/Sahas001", text: "github.com/Sahas001" },
  linkedin: { href: "https://linkedin.com/in/sahas001", text: "linkedin.com/in/sahas001" },
  instagram: { href: "https://instagram.com/sahastimilsina", text: "instagram.com/sahastimilsina" },
  blog: { href: "/blog", text: "~/blog (opens the blog)" },
  projects: { href: "/?tab=projects", text: "~/projects (opens the project list)" },
  phasethru: { href: "https://phasethru.dev", text: "phasethru.dev" },
  whoami: "sahas — computer engineer",
  ls: "about.md  projects/  blog/  contact.txt",
  help: [
    "contact    email address",
    "github     GitHub profile",
    "linkedin   LinkedIn profile",
    "blog       read the blog",
    "projects   see what I've built",
    "phasethru  my other blog",
    "whoami     who is this",
    "date       current date and time",
    "echo       print text",
    "clear      clear the screen",
  ],
};

type Entry = { cmd: string; output: Output };

const INITIAL: Entry[] = [
  { cmd: "whoami", output: RESPONSES.whoami },
  { cmd: "ls", output: RESPONSES.ls },
  { cmd: "contact", output: RESPONSES.contact },
];

export default function ContactCommand() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Entry[]>(INITIAL);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [history]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmd = value.trim();
    if (!cmd) return;
    const key = cmd.toLowerCase().split(/\s+/)[0];
    setValue("");

    if (key === "clear") {
      setHistory([]);
      return;
    }

    let output: Output = `command not found: ${key}. Try "help".`;
    if (key === "echo") output = cmd.slice(5);
    else if (key === "date") output = new Date().toString();
    else if (RESPONSES[key]) output = RESPONSES[key];

    setHistory((prev) => [...prev, { cmd, output }]);
  }

  function renderOutput(out: Output) {
    if (Array.isArray(out)) {
      return out.map((line) => (
        <div key={line} className={styles.pre}>
          {line}
        </div>
      ));
    }
    if (typeof out === "object") {
      return out.href.startsWith("/") ? (
        <Link href={out.href} className={styles.link}>{out.text}</Link>
      ) : (
        <a
          href={out.href}
          className={styles.link}
          {...(out.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        >
          {out.text}
        </a>
      );
    }
    return out;
  }

  return (
    <div className={styles.terminal} onClick={() => inputRef.current?.focus({ preventScroll: true })}>
      <div ref={scrollRef} className={styles.scroll} aria-live="polite">
        {history.map((item, idx) => (
          <div key={idx} className={styles.entry}>
            <div>
              <span className={styles.prompt}>~$</span> {item.cmd}
            </div>
            <div className={styles.output}>{renderOutput(item.output)}</div>
          </div>
        ))}
      </div>
      <form onSubmit={onSubmit} className={styles.row}>
        <label htmlFor="term-input" className={styles.prompt}>
          ~$
        </label>
        <input
          id="term-input"
          ref={inputRef}
          className={styles.input}
          placeholder="type help"
          autoComplete="off"
          autoCapitalize="off"
          spellCheck={false}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}
