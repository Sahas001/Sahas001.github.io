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
		<motion.div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-2 max-w-5xl" whileHover={{ scale: 1.01, boxShadow: "0px 0px 5px #72a2dc" }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4 }}>
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

