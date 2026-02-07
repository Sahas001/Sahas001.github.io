"use client";
import { useRouter } from 'next/navigation';

export default function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
	const router = useRouter();
	return (
		<div className="card p-6 rounded-lg shadow-lg mt-2">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-bold mb-4">
					<span className="text-[color:var(--accent)]">~$</span>{" "}
					<span className="text-[color:var(--muted)]">cat &quot;{title}&quot;</span>
					<span className="terminal-cursor" aria-hidden="true" />
				</h2>
				<button
					onClick={() => router.back()}
					className="text-[color:var(--muted)] mb-4 hover:underline hover:text-[color:var(--accent)] transition"
				>
					←- Go Back
				</button>
			</div>
			<p className="text-[color:var(--muted)] mb-4">{description}</p>
			<div className="terminal-output flex flex-col gap-4">
				{children}
			</div>
		</div >
	);
}
