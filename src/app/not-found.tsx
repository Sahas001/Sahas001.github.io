import Link from "next/link";
import TerminalWindow from "@/components/TerminalWindow";

export default function NotFound() {
  return (
    <div className="container-wide" style={{ paddingTop: "clamp(48px, 8vw, 96px)" }}>
      <h1 style={{ fontSize: "clamp(3rem, 10vw, 6rem)", lineHeight: 1 }}>404</h1>
      <p style={{ marginTop: 12, fontSize: "1.2rem", fontStyle: "italic", color: "var(--text-secondary)" }}>
        This page doesn&apos;t exist. It may have moved, or the link has a typo.
      </p>
      <div style={{ marginTop: 32, maxWidth: 560 }}>
        <TerminalWindow title="zsh">
          <div>
            <span style={{ color: "var(--accent-mustard)" }}>~$</span> cd /this/page
          </div>
          <div style={{ color: "#f08a7a" }}>cd: no such file or directory</div>
        </TerminalWindow>
      </div>
      <div style={{ display: "flex", gap: 14, flexWrap: "wrap", marginTop: 36 }}>
        <Link href="/" className="btn-primary">
          Go home
        </Link>
        <Link href="/blog" className="btn-secondary">
          Browse the blog
        </Link>
      </div>
    </div>
  );
}
