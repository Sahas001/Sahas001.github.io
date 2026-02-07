type TabsProps = {
	name: string;
	highlighted?: boolean;
};

export default function Tabs(props: TabsProps) {
	return (
		<span className={`mb-5 cursor-pointer hover:underline hover:text-white transition duration-200 ${props.highlighted ? "tab-active text-[color:var(--accent)]" : ""}`}>
			<span className="text-sm sm:text-base">
				<span className="text-[color:var(--accent)]">~$</span>{" "}
				<span className="text-[color:var(--muted)]">{props.name}</span>
				{props.highlighted ? <span className="terminal-cursor" aria-hidden="true" /> : null}
			</span>
		</span>
	)
}
