 "use client";

import { useEffect, useState } from "react";

export default function TerminalHeader() {
  const [lastLogin, setLastLogin] = useState<string>("--");

  useEffect(() => {
    const now = new Date();
    const formatted = now.toLocaleString(undefined, {
      weekday: "short",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
    setLastLogin(formatted);
  }, []);
  return (
    <div className="text-xs sm:text-sm text-[color:var(--muted)] mb-4">
      <div>last login: {lastLogin}</div>
      <div>
        <span className="text-[color:var(--accent)]">~$</span>{" "}
        <span className="text-[color:var(--muted)]">./start</span>
      </div>
    </div>
  );
}
