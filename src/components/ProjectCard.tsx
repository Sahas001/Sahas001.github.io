import Link from "next/link";
import Badge from "./Badge";
import { FolderOpenDot, Github } from "lucide-react";
import { motion } from "framer-motion";

export default function ProjectCard({
	name,
	description,
	stack,
	githubLink,
}: {
	name: string;
	description: string;
	stack: string[];
	githubLink?: string;
}) {
	return (
		<motion.div className="bg-gray-800 p-4 rounded-lg shadow-lg mt-2" whileHover={{ scale: 1.01, boxShadow: "0px 0px 5px #72a2dc" }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.4 }}>
			<Link href={githubLink || "#"} rel="noopener noreferrer" target="_blank">
				<h2 className="text-xl font-bold text-blue-400 mb-4">{name}<FolderOpenDot className="inline-block ml-4" /></h2>
				<p className="text-blue-300 mb-4">{description}</p>
				<p className="text-blue-300 mb-4">{stack.map((tech) => {
					return (
						<Badge key={tech} name={tech} />
					);
				})}</p>
				<div className="flex gap-4">
					<p className="text-purple-400 hover:underline"><Github className="inline-block" /> Github</p>
				</div>
			</Link>
		</motion.div >

	);
}
