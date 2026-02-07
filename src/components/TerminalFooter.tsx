export default function TerminalFooter() {
  return (
    <div className="mt-12 text-sm text-[color:var(--muted)]">
      <span className="text-[color:var(--accent)]">~$</span> exit{" "}
      <span className="text-[color:var(--muted)]">|</span>{" "}
      <a
        href="mailto:sahastimilsina@gmail.com"
        className="text-[color:var(--accent)] hover:underline"
      >
        contact
      </a>
    </div>
  );
}
