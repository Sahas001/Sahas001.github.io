import { iconMap } from "@/types/iconMap";

type ButtonProps = {
	name: string;
	href: string;
};

export default function Button({ name, href }: ButtonProps) {
	const icon = iconMap[name.toLowerCase()];
	const label = name.toLowerCase();
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className="no-underline inline-flex items-center gap-2 border border-[color:var(--border)] px-3 py-2 text-sm hover:border-[color:var(--accent)] hover:shadow-[0_0_12px_var(--glow)] transition"
		>
			<span className="text-[color:var(--muted)]">{`~$ ./${label}`}</span>
			<span className="text-[color:var(--muted)]">{icon}</span>
		</a>
	);
}
