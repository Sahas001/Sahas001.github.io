import Card from "@/components/Card"

export default function About() {
	return (
		<div className="mt-10">
			<Card title={<><span className="text-[color:var(--accent)]">~$</span>{" "}<span className="text-[color:var(--muted)]">about</span></>}>
				<p>
					I care about clear code, predictable systems, and shipping work that lasts.
					My sweet spot is full-stack development with a systems mindset — practical architecture, strong typing, and clean interfaces.
					Outside of code, I enjoy music and classic cinema.
				</p>
			</Card>
		</div>
	)
};
