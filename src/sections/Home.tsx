import Button from '@/components/Button'
import Card from '@/components/Card'

export default function Home() {
	return (
		<div className="flex flex-col">
			<h1 className="text-3xl text-blue-400 font-bold mt-5 mb-4">Welcome to My Portfolio!!🙏</h1>
			<div>
				<Button href="https://instagram.com/sahastimilsina" name="Instagram" />
				<Button href="https://linkedin.com/in/sahas001" name="LinkedIn" />
				<Button href="https://github.com/Sahas001" name="Github" />
			</div>
			<div className="mt-10">
				<Card title="Hello, World!👋" children={
					<p>
						I am a Computer Engineering graduate with a strong foundation in both frontend and backend development. My technical proficiency includes React, TypeScript, Golang, and PostgreSQL, enabling me to build full-stack web applications that are efficient, maintainable, and scalable.
						Beyond web development, I have a keen interest in system-level programming, particularly with C and C++, where I enjoy exploring how software interacts with hardware.
						This portfolio showcases my projects, skills, and ongoing work across various domains of software development. Thank you for visiting.
					</p>
				} />
				<Card title="Skills" description="Here are some of the skills I have acquired over the years." children={
					<ul className="list-disc pl-5">
						<li>Backend: Golang, PostgreSQL</li>
						<li>System Programming: C, C++</li>
						<li>Version Control: Git, GitHub</li>
						<li>Web Development: HTML, CSS, Typescript</li>
						<li>Frontend Frameworks: React, Next.js</li>
						<li>Other Tools: Docker, Kubernetes, Nginx</li>
					</ul>
				} />

			</div>

		</div>

	)
}
