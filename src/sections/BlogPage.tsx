"use client";
import { useRouter } from 'next/navigation';

export default function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
	const router = useRouter();
	return (
		<div className="card p-6 rounded-lg shadow-lg mt-2">
			<div className="flex items-center justify-between mb-4">
				<h2 className="text-2xl font-bold text-purple-400 mb-4">{title}</h2>
				<button
					onClick={() => router.back()}
					className="text-blue-300 mb-4 hover:underline hover:text-red-500 transition"
				>
					←- Go Back
				</button>
			</div>
			<p className="text-blue-300 mb-4">{description}</p>
			<div className="flex flex-col gap-4">
				{children}
			</div>
		</div >
	);
}


