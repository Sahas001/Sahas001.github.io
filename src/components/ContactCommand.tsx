"use client";

import { useState, useRef, useEffect } from "react";

const RESPONSES: Record<string, string | string[]> = {
  contact: "Email: sahastimilsina@gmail.com",
  github: "https://github.com/Sahas001",
  linkedin: "https://linkedin.com/in/sahas001",
  instagram: "https://instagram.com/sahastimilsina",
  whoami: "sahas - computer engineer",
  date: new Date().toString(),
  ls: "about.md  projects/  blog/  contact.txt",
  help: [
    "Available commands:",
    "  contact   - Get contact info",
    "  github    - View GitHub profile",
    "  linkedin  - View LinkedIn profile",
    "  instagram - View Instagram profile",
    "  whoami    - Print current user",
    "  date      - Print current date and time",
    "  ls        - List directory contents",
    "  echo      - Print text (e.g. echo hello)",
    "  clear     - Clear terminal history"
  ]
};

export default function ContactCommand() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<{ cmd: string; output: string | string[] }[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (history.length > 0 && containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history]);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const cmdStr = value.trim();
    if (!cmdStr) return;
    
    const key = cmdStr.toLowerCase().split(" ")[0];
    
    if (key === "clear") {
      setHistory([]);
      setValue("");
      return;
    }
    
    let output: string | string[] = "command not found: " + key;
    
    if (key === "echo") {
      output = cmdStr.substring(5);
    } else if (RESPONSES[key]) {
      output = RESPONSES[key];
    }
    
    setHistory(prev => [...prev, { cmd: cmdStr, output }]);
    setValue("");
  }

  function renderOutput(text: string | string[]) {
    if (Array.isArray(text)) {
      return (
        <div className="flex flex-col gap-1">
          {text.map((line, i) => (
            <div key={i} className="whitespace-pre">{line}</div>
          ))}
        </div>
      );
    }
    
    if (text.startsWith("http")) {
      return (
        <a href={text} target="_blank" rel="noopener noreferrer" className="text-[color:var(--accent)] hover:underline">
          {text}
        </a>
      );
    }
    if (text.includes("Email:")) {
      const email = text.replace("Email: ", "");
      return (
        <>
          Email:{" "}
          <a href={`mailto:${email}`} className="text-[color:var(--accent)] hover:underline">
            {email}
          </a>
        </>
      );
    }
    return text;
  }

  return (
    <div ref={containerRef} className="terminal-command font-mono max-h-64 overflow-y-auto pr-2 scrollbar-custom">
      {history.map((item, idx) => (
        <div key={idx} className="mb-4">
          <div className="terminal-command-row mb-2">
            <span className="text-[color:var(--accent)]">~$</span>
            <span className="text-[color:var(--p)]">{item.cmd}</span>
          </div>
          <div className="terminal-command-output">{renderOutput(item.output)}</div>
        </div>
      ))}
      <form onSubmit={onSubmit} className="terminal-command-row">
        <span className="text-[color:var(--accent)]">~$</span>
        <input
          className="terminal-command-input"
          placeholder="help | contact | whoami | clear"
          style={{ caretColor: "var(--accent)" }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
    </div>
  );
}
