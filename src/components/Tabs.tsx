type TabsProps = {
	name: string;
	onClick?: () => void;
	highlighted?: boolean;
};

export default function Tabs(props: TabsProps) {
	return (
		<button onClick={props.onClick} className={`mb-5 cursor-pointer hover:underline hover:text-white transition duration-200 ${props.highlighted ? "text-purple-400" : ""}`}>
			<p>~/{props.name}</p>
		</button>
	)
}
