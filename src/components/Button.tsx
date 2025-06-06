import { iconMap } from "@/types/iconMap";

type ButtonProps = {
	name: string;
	href: string;
};

export default function Button({ name, href }: ButtonProps) {
	const icon = iconMap[name.toLowerCase()];
	return (
		<button className="no-underline border border-purple-400 p-2 mr-10">
			<a href={href} target="_blank" rel="noopener noreferrer" className="no-underline">
				{icon}
				{name}
			</a>
		</button>
	);
}
