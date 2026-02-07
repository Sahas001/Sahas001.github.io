"use client";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';

export default function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
	const router = useRouter();
	const [progress, setProgress] = useState(0);

	useEffect(() => {
		function onScroll() {
			const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
			const value = height > 0 ? (window.scrollY / height) * 100 : 0;
			setProgress(value);
		}
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);
	return (
		<>
			<div className="blog-progress blog-progress-fixed" style={{ width: `${progress}%` }} />
			<div className="card p-6 rounded-lg shadow-lg mt-2">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-bold mb-4">
					<span className="text-[color:var(--accent)]">~/blog$</span>{" "}
					<span className="text-[color:var(--muted)]">cat &quot;{title}&quot;</span>
				</h2>
				<button
					onClick={() => router.back()}
					className="text-[color:var(--muted)] mb-4 hover:underline hover:text-[color:var(--accent)] transition"
				>
					<span className="text-[color:var(--accent)]">~/blog$</span>{" "}
					<span className="text-[color:var(--muted)]">cd ..</span>
				</button>
			</div>
			<p className="text-[color:var(--muted)] mb-4">{description}</p>
			<div className="flex flex-col gap-4">
				{children}
			</div>
			</div >
		</>
	);
}
