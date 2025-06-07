"use client";
import { motion } from 'framer-motion';

export default function Card({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
	return (
		<motion.div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-2" initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4 }}>
			<h2 className="text-2xl font-bold text-purple-400 mb-4">{title}</h2>
			<p className="text-blue-300 mb-4">{description}</p>
			<div className="flex flex-col gap-4">
				{children}
			</div>
		</motion.div >
	);
}

