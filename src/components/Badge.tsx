export default function Badge({
	name,
	variant = "default",
}: {
	name: string;
	variant?: "default" | "flag";
}) {
	const isFlag = variant === "flag";
	return (
		<span
			className={`p-1 m-1 text-sm bg-[#0b1117] text-[color:var(--accent)] border border-[color:var(--border)] font-mono ${isFlag ? "terminal-flag" : ""}`}
		>
			{isFlag ? `--${name}` : name}
		</span>
	)
};
