import type { Project } from "@/types/projects";
import styles from "./FeaturedProject.module.css";

export default function FeaturedProject({ project }: { project: Project }) {
  const meta = [project.area, project.year, project.role].filter(Boolean);
  return (
    <article className={styles.card}>
      <p className={styles.meta}>
        {meta.map((m, i) => (
          <span key={m}>
            {i > 0 && <span className={styles.sep}>/</span>}
            {m}
          </span>
        ))}
      </p>
      <h3 className={styles.name}>
        <a href={project.githubLink} target="_blank" rel="noopener noreferrer">
          {project.name}
        </a>
      </h3>
      <p className={styles.lede}>{project.description}</p>

      {project.pipeline && (
        <ol className={styles.pipeline} aria-label="How it works">
          {project.pipeline.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
      )}

      {project.highlights && (
        <ul className={styles.highlights}>
          {project.highlights.map((h) => (
            <li key={h}>{h}</li>
          ))}
        </ul>
      )}

      <div className={styles.foot}>
        <ul className={styles.stack} aria-label="Built with">
          {project.stack.map((t) => (
            <li key={t} className="tag-badge">
              {t}
            </li>
          ))}
        </ul>
        <div className={styles.links}>
          {project.liveLink && (
            <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="btn-primary">
              Live ↗
            </a>
          )}
          <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="btn-secondary">
            Source ↗
          </a>
        </div>
      </div>
    </article>
  );
}
