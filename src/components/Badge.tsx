export default function Badge({ name }: { name: string }) {
	return (
		<span className="p-1 m-1 text-sm bg-gray-600 text-red-200 font-mono">
			{name}
		</span>
	)
};

