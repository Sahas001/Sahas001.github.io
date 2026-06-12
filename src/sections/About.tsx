import Card from "@/components/Card"

export default function About() {
	return (
		<div className="mt-10">
			<Card title={<><span className="text-[color:var(--accent)]">~$</span>{" "}<span className="text-[color:var(--muted)]">cat about.md</span></>}>
				<p>
					I got into programming because I wanted to build things I could actually use — and it stuck.
					I like writing code that does what it&apos;s supposed to without being clever about it.
				</p>
				<p className="mt-3">
					Most of my work lives in the React/Next.js world, but I spend a decent amount of time
					with Go and lower-level stuff too. I care about how things work under the hood.
				</p>
				<p className="mt-3">
					Outside of code — books, music, classic films, and f1.
				</p>
			</Card>
		</div>
	)
};
