"use client";
import Badge from "./Badge";
import { motion } from "framer-motion";
import { ExternalLink, BookOpenText } from "lucide-react";

export default function ProjectCard({
	name,
	description,
	badge,
}: {
	name: string;
	description: string;
	badge: string[];
}) {
	return (
		<motion.div className="card card-hover p-4 rounded-lg shadow-lg mt-2 max-w-5xl" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, ease: "easeOut" }}>
			<h2 className="text-xl font-bold text-blue-400 mb-4"><BookOpenText className="inline-block mr-4" />{name}</h2>
			<p className="text-blue-300 mb-4">{description}</p>
			<p className="text-blue-300 mb-4">{badge.map((tech) => {
				return (
					<Badge key={tech} name={tech} />
				);
			})}</p>
			<div className="flex gap-4">
				<p className="text-purple-400 hover:underline"><ExternalLink className="inline-block" /> Blog</p>
			</div>
		</motion.div >

	);
}

