import type { Project } from "@/types/projects";
import ShotGallery from "./ShotGallery";
import styles from "./WorkShowcase.module.css";

function Pipeline({ steps }: { steps: string[] }) {
  return (
    <ol className={styles.pipeline} aria-label="How it works">
      {steps.map((step) => (
        <li key={step}>{step}</li>
      ))}
    </ol>
  );
}

function Case({ project, flip }: { project: Project; flip: boolean }) {
  const meta = [project.area, project.year, project.role].filter(Boolean).join(", ");
  return (
    <article className={`${styles.case} ${flip ? styles.flip : ""}`}>
      <div className={styles.visual}>
        {project.shots ? (
          <ShotGallery shots={project.shots} name={project.name} />
        ) : project.pipeline ? (
          <Pipeline steps={project.pipeline} />
        ) : null}
      </div>

      <div className={styles.text}>
        <p className={styles.meta}>{meta}</p>
        <h3 className={styles.name}>{project.name}</h3>
        <p className={styles.lede}>{project.description}</p>

        {project.highlights && (
          <ul className={styles.highlights}>
            {project.highlights.map((h) => (
              <li key={h}>{h}</li>
            ))}
          </ul>
        )}

        <p className={styles.stack}>{project.stack.join(" / ")}</p>

        <p className={styles.links}>
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
            Source on GitHub ↗
          </a>
          {project.writeup && (
            <a href={project.writeup.href} target="_blank" rel="noopener noreferrer">
              {project.writeup.label} ↗
            </a>
          )}
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer">
              Open it ↗
            </a>
          )}
        </p>
      </div>
    </article>
  );
}

/** The dark band: featured projects with their screenshots or diagrams. */
export default function WorkShowcase({
  projects,
  heading,
  compact = false,
  children,
}: {
  projects: Project[];
  heading?: string;
  /** On phones, show the summary only; the detail lives on the Projects page. */
  compact?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={`${styles.band} ${compact ? styles.compact : ""}`}
      aria-label={heading ?? "Featured projects"}
    >
      <div className="container-wide">
        {heading && (
          <header className={styles.header}>
            <h2 className={styles.heading}>{heading}</h2>
            {children}
          </header>
        )}
        <div className={styles.cases}>
          {projects.map((p, i) => (
            <Case key={p.name} project={p} flip={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}
