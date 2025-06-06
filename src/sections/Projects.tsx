"use client";

import ProjectCard from "@/components/ProjectCard";

export default function Projects() {
	const projects = [
		{
			name: "AgroGuard",
			description: "AgroGuard is a deep-learning-based application that helps us identify different diseases in plants and provides treatments.",
			stack: ["Python", "Typescript"],
			githubLink: "https://github.com/Sahas001/AgroGuard",
		},
		{
			name: "Simple Container",
			description: "A simple container using go.",
			stack: ["Go"],
			githubLink: "https://github.com/Sahas001/simple-container",
		},
		{
			name: "Netflix Clone",
			description: "A Netflix clone built with React, Typescript, and Tailwind CSS.",
			stack: ["React", "Typescript"],
			githubLink: "https://github.com/Sahas001/netflix-clone",

		},
		{
			name: "Service Management System",
			description: "Allows service providers to manage services, including adding, updating, and deleting services. It also allows users to book services and view their bookings.",
			stack: ["React", "Typescript", "Go", "PostgreSQL"],
			githubLink: "https://github.com/Sahas001/service-management-system",
		}
	]

	return (
		<div className="flex flex-col">
			<h1 className="text-3xl text-blue-400 font-bold mt-5 mb-4">Some of My Projects!📂</h1>
			<div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
				{projects.map((project, index) => (
					<ProjectCard key={index} name={project.name} description={project.description} stack={project.stack} githubLink={project.githubLink} />
				))}
			</div>
		</div>
	)
}
