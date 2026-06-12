"use client";
import Link from "next/link";
import Badge from "./Badge";
import { FolderOpenDot, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectCard({
	name,
	description,
	badge,
	githubLink,
}: {
	name: string;
	description: string;
	badge: string[];
	githubLink?: string;
}) {
	return (
		<motion.div className="card card-hover p-4 rounded-lg shadow-lg mt-2" initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.15, ease: "easeOut" }}>
			<Link href={githubLink || "#"} rel="noopener noreferrer" target="_blank">
				<h2 className="text-base sm:text-lg font-bold text-[color:var(--accent-2)] mb-4">{name}<FolderOpenDot className="inline-block ml-4" /></h2>
				<p className="text-[color:var(--p)] mb-2">{description}</p>
				<p className="text-[color:var(--p)] mb-2">{badge.map((tech) => {
					return (
						<Badge key={tech} name={tech} />
					);
				})}</p>
				<div className="flex gap-4">
					<p className="text-[color:var(--accent)] hover:underline"><Github className="inline-block" /> Github</p>
				</div>
			</Link>
		</motion.div >

	);
}
