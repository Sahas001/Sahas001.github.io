"use client";

import { useState } from "react";

const RESPONSES: Record<string, string> = {
  contact: "Email: sahastimilsina@gmail.com",
  github: "https://github.com/Sahas001",
  linkedin: "https://linkedin.com/in/sahas001",
  instagram: "https://instagram.com/sahastimilsina",
};

export default function ContactCommand() {
  const [value, setValue] = useState("");
  const [output, setOutput] = useState<string | null>(null);

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const key = value.trim().toLowerCase();
    if (!key) return;
    setOutput(RESPONSES[key] || "command not found");
  }

  return (
    <div className="terminal-command">
      <form onSubmit={onSubmit} className="terminal-command-row">
        <span className="text-[color:var(--accent)]">~$</span>
        <input
          className="terminal-command-input"
          placeholder="type command and press enter"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      </form>
      {output ? <div className="terminal-command-output">{output}</div> : null}
    </div>
  );
}
