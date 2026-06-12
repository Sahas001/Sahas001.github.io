import Badge from '@/components/Badge'
import Button from '@/components/Button'
import Card from '@/components/Card'
import ContactCommand from '@/components/ContactCommand'
import ScrambleText from '@/components/ScrambleText'

export default function Home() {
	return (
		<div className="flex flex-col">
			<h1 className="text-2xl sm:text-3xl text-[color:var(--accent-2)] font-bold mt-5 mb-2">
				<ScrambleText text="Hello, I'm Sahas" />
			</h1>
			<p className="text-sm sm:text-base text-[color:var(--p)] mb-4">Computer engineer who likes building things and figuring out how they work.</p>
			<div className="flex flex-wrap gap-3">
				<Button href="https://instagram.com/sahastimilsina" name="Instagram" />
				<Button href="https://linkedin.com/in/sahas001" name="LinkedIn" />
				<Button href="https://github.com/Sahas001" name="Github" />
			</div>
			<div className="mt-10">
				<Card title={<><span className="text-[color:var(--accent)]">~$</span>{" "}<span className="text-[color:var(--muted)]">whoami</span></>} >
					<p>
						I studied computer engineering and got into web dev somewhere along the way.
						Most of my time goes into React, TypeScript, and Go — but I also like poking
						at systems-level stuff with C/C++ when I get the chance.
					</p>
				</Card>
				<Card title={<><span className="text-[color:var(--accent)]">~$</span>{" "}<span className="text-[color:var(--muted)]">skills</span></>}>
					<div className="flex flex-col gap-2">
						<div className="flex flex-wrap items-center gap-1">
							<span className="text-[color:var(--accent-2)] text-sm mr-1">lang</span>
							<Badge name="TypeScript" /><Badge name="Go" /><Badge name="Python" /><Badge name="C/C++" />
						</div>
						<div className="flex flex-wrap items-center gap-1">
							<span className="text-[color:var(--accent-2)] text-sm mr-1">web</span>
							<Badge name="React" /><Badge name="Next.js" /><Badge name="Tailwind" />
						</div>
						<div className="flex flex-wrap items-center gap-1">
							<span className="text-[color:var(--accent-2)] text-sm mr-1">backend</span>
							<Badge name="Node.js" /><Badge name="PostgreSQL" /><Badge name="Docker" />
						</div>
						<div className="flex flex-wrap items-center gap-1">
							<span className="text-[color:var(--accent-2)] text-sm mr-1">tools</span>
							<Badge name="Git" /><Badge name="Linux" /><Badge name="Nginx" />
						</div>
					</div>
				</Card>
				<Card title={<><span className="text-[color:var(--accent)]">~$</span>{" "}<span className="text-[color:var(--muted)]">command</span></>} description="Try: contact, github, linkedin, instagram">
					<ContactCommand />
				</Card>

			</div>

		</div>

	)
}
