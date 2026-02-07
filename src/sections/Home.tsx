import Button from '@/components/Button'
import Card from '@/components/Card'

export default function Home() {
	return (
		<div className="flex flex-col">
			<h1 className="text-2xl sm:text-3xl text-[color:var(--accent-2)] font-bold mt-5 mb-2">
				Hello, I’m Sahas — Computer Engineer
			</h1>
			<p className="text-sm sm:text-base text-[color:var(--p)] mb-4">I build reliable web systems and enjoy low-level problem solving.</p>
			<div className="flex flex-wrap gap-3">
				<Button href="https://instagram.com/sahastimilsina" name="Instagram" />
				<Button href="https://linkedin.com/in/sahas001" name="LinkedIn" />
				<Button href="https://github.com/Sahas001" name="Github" />
			</div>
			<div className="mt-10">
				<Card title={<><span className="text-[color:var(--accent)]">~$</span>{" "}<span className="text-[color:var(--muted)]">whoami</span></>} >
					<p>
						Computer Engineering graduate focused on building dependable, maintainable software.
						I work across frontend and backend with React, TypeScript, Go, and PostgreSQL.
						I also enjoy systems programming with C/C++ and learning how software meets hardware.
					</p>
				</Card>
				<Card title={<><span className="text-[color:var(--accent)]">~$</span>{" "}<span className="text-[color:var(--muted)]">skills</span></>} description="A quick overview of tools I use regularly.">
					<ul className="list-disc pl-5">
						<li>Backend: Golang, PostgreSQL</li>
						<li>System Programming: C, C++</li>
						<li>Version Control: Git, GitHub</li>
						<li>Web Development: HTML, CSS, Typescript</li>
						<li>Frontend Frameworks: React, Next.js</li>
						<li>Other Tools: Docker, Kubernetes, Nginx</li>
					</ul>
				</Card>

			</div>

		</div>

	)
}
